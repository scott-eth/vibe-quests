import { Router } from 'express'
import { dataStore } from '../data/store'
import { generateToken, AuthRequest, authenticateToken } from '../middleware/auth'
import { validateBody } from '../utils/validation'
import { authRequestSchema, updateProfileSchema } from '../utils/validation'
import { ApiResponse, LoginResponse } from '../types'

const router = Router()

// POST /api/auth/login - Email or wallet authentication
router.post('/login', validateBody(authRequestSchema), async (req: AuthRequest, res) => {
  try {
    const { method } = req.validatedBody

    let user = null

    if (method === 'email') {
      const { email } = req.validatedBody
      user = dataStore.getUserByEmail(email)
      
      if (!user) {
        // Create new user with email
        user = dataStore.createUser({
          email,
          authMethod: 'email',
          experienceLevel: 'beginner',
          ticketVerified: false,
          profileCompleteness: 25
        })
      }
    } else if (method === 'wallet') {
      const { walletAddress } = req.validatedBody
      user = dataStore.getUserByWallet(walletAddress)
      
      if (!user) {
        // Create new user with wallet
        user = dataStore.createUser({
          walletAddress,
          authMethod: 'wallet',
          experienceLevel: 'beginner',
          ticketVerified: false,
          profileCompleteness: 25
        })

        // Create wallet entry
        dataStore.createUserWallet(user.id, walletAddress)
      }
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Failed to authenticate user'
      } as ApiResponse)
    }

    const token = generateToken(user.id)
    
    const response: LoginResponse = {
      user: {
        id: user.id,
        email: user.email,
        walletAddress: user.walletAddress,
        name: user.name,
        displayName: user.displayName,
        authMethod: user.authMethod,
        experienceLevel: user.experienceLevel,
        ticketVerified: user.ticketVerified,
        ticketVerificationMethod: user.ticketVerificationMethod,
        profileCompleteness: user.profileCompleteness,
        createdAt: user.createdAt
      },
      token
    }

    res.json({
      success: true,
      data: response,
      message: 'Authentication successful'
    } as ApiResponse<LoginResponse>)

  } catch (error) {
    console.error('Auth error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/auth/me - Get current user profile
router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  const user = req.user
  
  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      walletAddress: user.walletAddress,
      name: user.name,
      displayName: user.displayName,
      authMethod: user.authMethod,
      experienceLevel: user.experienceLevel,
      ticketVerified: user.ticketVerified,
      ticketVerificationMethod: user.ticketVerificationMethod,
      profileCompleteness: user.profileCompleteness,
      createdAt: user.createdAt
    }
  } as ApiResponse)
})

// PUT /api/auth/profile - Update user profile
router.put('/profile', authenticateToken, validateBody(updateProfileSchema), (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const updates = req.validatedBody

    // Calculate profile completeness
    const user = req.user
    let completeness = 25 // Base for having an account
    
    if (user.email || user.walletAddress) completeness += 25
    if (updates.name || user.name) completeness += 20
    if (updates.experienceLevel || user.experienceLevel) completeness += 15
    if (updates.ticketVerified || user.ticketVerified) completeness += 15

    const updatedUser = dataStore.updateUser(userId, {
      ...updates,
      profileCompleteness: Math.min(completeness, 100)
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        walletAddress: updatedUser.walletAddress,
        name: updatedUser.name,
        displayName: updatedUser.displayName,
        authMethod: updatedUser.authMethod,
        experienceLevel: updatedUser.experienceLevel,
        ticketVerified: updatedUser.ticketVerified,
        ticketVerificationMethod: updatedUser.ticketVerificationMethod,
        profileCompleteness: updatedUser.profileCompleteness,
        createdAt: updatedUser.createdAt
      },
      message: 'Profile updated successfully'
    } as ApiResponse)

  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/auth/verify-ticket - Verify user ticket
router.post('/verify-ticket', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const { method } = req.body // 'zupass' or 'email'

    if (!method || !['zupass', 'email'].includes(method)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification method'
      } as ApiResponse)
    }

    // In a real app, this would verify with Zupass or send email verification
    // For now, we'll simulate successful verification
    const updatedUser = dataStore.updateUser(userId, {
      ticketVerified: true,
      ticketVerificationMethod: method,
      profileCompleteness: Math.min((req.user.profileCompleteness || 0) + 15, 100)
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        verified: true,
        method
      },
      message: 'Ticket verified successfully'
    } as ApiResponse)

  } catch (error) {
    console.error('Ticket verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router