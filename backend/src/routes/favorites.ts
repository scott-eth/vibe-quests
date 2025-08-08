import { Router } from 'express'
import { dataStore } from '../data/store'
import { authenticateToken } from '../middleware/auth'
import { ApiResponse, AuthRequest } from '../types'

const router = Router()

// GET /api/favorites - Get user's favorite events
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const favorites = dataStore.getUserFavorites(userId)
    
    // Get full event details for each favorite
    const favoriteEvents = favorites.map(fav => {
      const event = dataStore.getEventById(fav.eventId)
      return {
        ...event,
        favoritedAt: fav.addedAt,
        userFavorited: true
      }
    }).filter(event => event.id) // Filter out any null events

    // Sort by favorite date (most recent first)
    favoriteEvents.sort((a, b) => 
      new Date(b.favoritedAt).getTime() - new Date(a.favoritedAt).getTime()
    )

    res.json({
      success: true,
      data: favoriteEvents,
      message: `Found ${favoriteEvents.length} favorite events`
    } as ApiResponse)

  } catch (error) {
    console.error('Favorites fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/favorites/:eventId - Add event to favorites
router.post('/:eventId', authenticateToken, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.eventId)
    const userId = req.userId!
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    // Verify event exists
    const event = dataStore.getEventById(eventId)
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      } as ApiResponse)
    }

    // Check if already favorited
    const existingFavorites = dataStore.getUserFavorites(userId)
    const alreadyFavorited = existingFavorites.some(fav => fav.eventId === eventId)
    
    if (alreadyFavorited) {
      return res.status(409).json({
        success: false,
        error: 'Event is already in favorites'
      } as ApiResponse)
    }

    const favorite = dataStore.addFavorite(userId, eventId)

    res.status(201).json({
      success: true,
      data: {
        eventId: favorite.eventId,
        addedAt: favorite.addedAt,
        eventTitle: event.title
      },
      message: `${event.title} added to favorites`
    } as ApiResponse)

  } catch (error) {
    console.error('Add favorite error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// DELETE /api/favorites/:eventId - Remove event from favorites
router.delete('/:eventId', authenticateToken, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.eventId)
    const userId = req.userId!
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    // Get event title for response message
    const event = dataStore.getEventById(eventId)
    const eventTitle = event ? event.title : 'Event'

    const removed = dataStore.removeFavorite(userId, eventId)
    
    if (!removed) {
      return res.status(404).json({
        success: false,
        error: 'Event not found in favorites'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        eventId,
        removedAt: new Date()
      },
      message: `${eventTitle} removed from favorites`
    } as ApiResponse)

  } catch (error) {
    console.error('Remove favorite error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/favorites/events/:eventId/status - Check if event is favorited
router.get('/events/:eventId/status', authenticateToken, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.eventId)
    const userId = req.userId!
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    const favorites = dataStore.getUserFavorites(userId)
    const isFavorited = favorites.some(fav => fav.eventId === eventId)
    const favorite = favorites.find(fav => fav.eventId === eventId)

    res.json({
      success: true,
      data: {
        eventId,
        isFavorited,
        addedAt: favorite?.addedAt || null
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Favorite status check error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/favorites/stats - Get user's favorites statistics
router.get('/stats', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const favorites = dataStore.getUserFavorites(userId)
    
    // Group favorites by event type
    const statsByType: { [key: string]: number } = {}
    const statsByDay: { [key: number]: number } = {}
    
    favorites.forEach(fav => {
      const event = dataStore.getEventById(fav.eventId)
      if (event) {
        statsByType[event.type] = (statsByType[event.type] || 0) + 1
        statsByDay[event.startDay] = (statsByDay[event.startDay] || 0) + 1
      }
    })

    res.json({
      success: true,
      data: {
        totalFavorites: favorites.length,
        byType: statsByType,
        byDay: statsByDay,
        mostRecentlyAdded: favorites.length > 0 ? 
          Math.max(...favorites.map(f => new Date(f.addedAt).getTime())) : null
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Favorites stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router