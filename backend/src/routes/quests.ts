import { Router } from 'express'
import { dataStore } from '../data/store'
import { authenticateToken } from '../middleware/auth'
import { validateBody } from '../utils/validation'
import { questProgressSchema } from '../utils/validation'
import { ApiResponse, AuthRequest } from '../types'

const router = Router()

// GET /api/quests - Get all available quests
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const allQuests = dataStore.getAllQuests()
    const userQuests = dataStore.getUserQuests(userId)
    
    // Combine quest data with user progress
    const questsWithProgress = allQuests.map(quest => {
      const userQuest = userQuests.find(uq => uq.questId === quest.id)
      
      return {
        ...quest,
        status: userQuest?.status || 'available',
        progress: userQuest?.progress || 0,
        maxProgress: userQuest?.maxProgress || quest.requirements.reduce((sum, req) => sum + (req.count || 1), 0),
        startedAt: userQuest?.startedAt || null,
        completedAt: userQuest?.completedAt || null,
        claimedAt: userQuest?.claimedAt || null,
        canStart: !userQuest || userQuest.status === 'available',
        canClaim: userQuest?.status === 'completed' && !userQuest.claimedAt
      }
    })

    // Sort by type and status
    questsWithProgress.sort((a, b) => {
      const typeOrder = { 'story': 0, 'daily': 1, 'weekly': 2, 'achievement': 3 }
      const statusOrder = { 'active': 0, 'available': 1, 'completed': 2, 'locked': 3 }
      
      if (a.type !== b.type) {
        return (typeOrder[a.type as keyof typeof typeOrder] || 4) - (typeOrder[b.type as keyof typeof typeOrder] || 4)
      }
      
      return (statusOrder[a.status as keyof typeof statusOrder] || 4) - (statusOrder[b.status as keyof typeof statusOrder] || 4)
    })

    res.json({
      success: true,
      data: questsWithProgress
    } as ApiResponse)

  } catch (error) {
    console.error('Quests fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/quests/:id - Get specific quest details
router.get('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const questId = req.params.id
    const userId = req.userId!
    
    const quest = dataStore.getQuestById(questId)
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found'
      } as ApiResponse)
    }

    const userQuests = dataStore.getUserQuests(userId)
    const userQuest = userQuests.find(uq => uq.questId === questId)

    const questWithProgress = {
      ...quest,
      status: userQuest?.status || 'available',
      progress: userQuest?.progress || 0,
      maxProgress: userQuest?.maxProgress || quest.requirements.reduce((sum, req) => sum + (req.count || 1), 0),
      startedAt: userQuest?.startedAt || null,
      completedAt: userQuest?.completedAt || null,
      claimedAt: userQuest?.claimedAt || null,
      canStart: !userQuest || userQuest.status === 'available',
      canClaim: userQuest?.status === 'completed' && !userQuest.claimedAt
    }

    res.json({
      success: true,
      data: questWithProgress
    } as ApiResponse)

  } catch (error) {
    console.error('Quest fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/quests/:id/start - Start a quest
router.post('/:id/start', authenticateToken, (req: AuthRequest, res) => {
  try {
    const questId = req.params.id
    const userId = req.userId!
    
    const quest = dataStore.getQuestById(questId)
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found'
      } as ApiResponse)
    }

    // Check if quest is already started
    const userQuests = dataStore.getUserQuests(userId)
    const existingUserQuest = userQuests.find(uq => uq.questId === questId)
    
    if (existingUserQuest && existingUserQuest.status !== 'available') {
      return res.status(409).json({
        success: false,
        error: 'Quest already started or completed'
      } as ApiResponse)
    }

    const userQuest = dataStore.startQuest(userId, questId)

    res.status(201).json({
      success: true,
      data: {
        ...quest,
        ...userQuest,
        canStart: false,
        canClaim: false
      },
      message: `Quest "${quest.title}" started successfully`
    } as ApiResponse)

  } catch (error) {
    console.error('Quest start error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// PUT /api/quests/:id/progress - Update quest progress
router.put('/:id/progress', authenticateToken, validateBody(questProgressSchema), (req: AuthRequest, res) => {
  try {
    const questId = req.params.id
    const userId = req.userId!
    const { progress, completed } = req.validatedBody
    
    const quest = dataStore.getQuestById(questId)
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found'
      } as ApiResponse)
    }

    const userQuests = dataStore.getUserQuests(userId)
    const userQuest = userQuests.find(uq => uq.questId === questId)
    
    if (!userQuest || userQuest.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: 'Quest not active'
      } as ApiResponse)
    }

    const updates: any = { progress }
    
    if (completed || progress >= userQuest.maxProgress) {
      updates.status = 'completed'
      updates.completedAt = new Date()
      updates.progress = userQuest.maxProgress
    }

    const updatedUserQuest = dataStore.updateUserQuest(userId, questId, updates)
    
    if (!updatedUserQuest) {
      return res.status(404).json({
        success: false,
        error: 'Failed to update quest progress'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        ...quest,
        ...updatedUserQuest,
        canClaim: updatedUserQuest.status === 'completed' && !updatedUserQuest.claimedAt
      },
      message: updatedUserQuest.status === 'completed' ? 
        `Quest "${quest.title}" completed!` : 
        'Quest progress updated'
    } as ApiResponse)

  } catch (error) {
    console.error('Quest progress update error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/quests/:id/claim - Claim quest rewards
router.post('/:id/claim', authenticateToken, (req: AuthRequest, res) => {
  try {
    const questId = req.params.id
    const userId = req.userId!
    
    const quest = dataStore.getQuestById(questId)
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found'
      } as ApiResponse)
    }

    const userQuests = dataStore.getUserQuests(userId)
    const userQuest = userQuests.find(uq => uq.questId === questId)
    
    if (!userQuest || userQuest.status !== 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Quest not completed'
      } as ApiResponse)
    }

    if (userQuest.claimedAt) {
      return res.status(409).json({
        success: false,
        error: 'Rewards already claimed'
      } as ApiResponse)
    }

    // Update quest as claimed
    const updatedUserQuest = dataStore.updateUserQuest(userId, questId, {
      claimedAt: new Date()
    })

    // In a real app, you would add rewards to user's wallet here
    const rewards = {
      xp: quest.xpReward,
      coins: quest.coinReward,
      claimedAt: new Date()
    }

    res.json({
      success: true,
      data: {
        quest: {
          ...quest,
          ...updatedUserQuest
        },
        rewards
      },
      message: `Rewards claimed! +${quest.xpReward} XP, +${quest.coinReward} coins`
    } as ApiResponse)

  } catch (error) {
    console.error('Quest claim error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/quests/:id/verify - Verify quest completion
router.post('/:id/verify', authenticateToken, (req: AuthRequest, res) => {
  try {
    const questId = req.params.id
    const userId = req.userId!
    const { verificationData } = req.body
    
    const quest = dataStore.getQuestById(questId)
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found'
      } as ApiResponse)
    }

    const userQuests = dataStore.getUserQuests(userId)
    const userQuest = userQuests.find(uq => uq.questId === questId)
    
    if (!userQuest || userQuest.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: 'Quest not active'
      } as ApiResponse)
    }

    // In a real app, this would verify quest completion based on the quest requirements
    // For demo purposes, we'll mark it as completed
    const updatedUserQuest = dataStore.updateUserQuest(userId, questId, {
      status: 'completed',
      progress: userQuest.maxProgress,
      completedAt: new Date()
    })

    if (!updatedUserQuest) {
      return res.status(404).json({
        success: false,
        error: 'Failed to verify quest'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        ...quest,
        ...updatedUserQuest,
        canClaim: true
      },
      message: `Quest "${quest.title}" verified and completed!`
    } as ApiResponse)

  } catch (error) {
    console.error('Quest verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/quests/user/stats - Get user's quest statistics
router.get('/user/stats', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const userQuests = dataStore.getUserQuests(userId)
    
    const stats = {
      total: userQuests.length,
      active: userQuests.filter(uq => uq.status === 'active').length,
      completed: userQuests.filter(uq => uq.status === 'completed').length,
      claimed: userQuests.filter(uq => uq.claimedAt).length,
      totalXPEarned: userQuests
        .filter(uq => uq.claimedAt)
        .reduce((sum, uq) => {
          const quest = dataStore.getQuestById(uq.questId)
          return sum + (quest?.xpReward || 0)
        }, 0),
      totalCoinsEarned: userQuests
        .filter(uq => uq.claimedAt)
        .reduce((sum, uq) => {
          const quest = dataStore.getQuestById(uq.questId)
          return sum + (quest?.coinReward || 0)
        }, 0),
      byType: {
        daily: userQuests.filter(uq => {
          const quest = dataStore.getQuestById(uq.questId)
          return quest?.type === 'daily'
        }).length,
        weekly: userQuests.filter(uq => {
          const quest = dataStore.getQuestById(uq.questId)
          return quest?.type === 'weekly'
        }).length,
        story: userQuests.filter(uq => {
          const quest = dataStore.getQuestById(uq.questId)
          return quest?.type === 'story'
        }).length,
        achievement: userQuests.filter(uq => {
          const quest = dataStore.getQuestById(uq.questId)
          return quest?.type === 'achievement'
        }).length
      }
    }

    res.json({
      success: true,
      data: stats
    } as ApiResponse)

  } catch (error) {
    console.error('Quest stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router