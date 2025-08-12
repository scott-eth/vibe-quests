import { Router } from 'express'
import { dataStore } from '../data/store'
import { authenticateToken, optionalAuth } from '../middleware/auth'
import { validateQuery } from '../utils/validation'
import { eventFilterSchema } from '../utils/validation'
import { ApiResponse, PaginatedResponse, AuthRequest } from '../types'

const router = Router()

// GET /api/events - Get all events with optional filtering
router.get('/', optionalAuth, validateQuery(eventFilterSchema), (req: AuthRequest, res) => {
  try {
    const { type, day, search, showCommunity, page, limit } = req.validatedQuery

    const filteredEvents = dataStore.getFilteredEvents({
      type,
      day,
      search,
      showCommunity
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

    // Add user-specific data if authenticated
    const eventsWithUserData = paginatedEvents.map(event => {
      let userRegistered = false
      let userFavorited = false

      if (req.userId) {
        const userRegistrations = dataStore.getUserRegistrations(req.userId)
        const userFavorites = dataStore.getUserFavorites(req.userId)
        
        userRegistered = userRegistrations.some(reg => reg.eventId === event.id)
        userFavorited = userFavorites.some(fav => fav.eventId === event.id)
      }

      return {
        ...event,
        userRegistered,
        userFavorited
      }
    })

    const response: PaginatedResponse<typeof eventsWithUserData[0]> = {
      success: true,
      data: eventsWithUserData,
      pagination: {
        page,
        limit,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limit)
      }
    }

    res.json(response)

  } catch (error) {
    console.error('Events fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/events/:id - Get specific event details
router.get('/:id', optionalAuth, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.id)
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    const event = dataStore.getEventById(eventId)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      } as ApiResponse)
    }

    // Add user-specific data if authenticated
    let userRegistered = false
    let userFavorited = false

    if (req.userId) {
      const userRegistrations = dataStore.getUserRegistrations(req.userId)
      const userFavorites = dataStore.getUserFavorites(req.userId)
      
      userRegistered = userRegistrations.some(reg => reg.eventId === event.id)
      userFavorited = userFavorites.some(fav => fav.eventId === event.id)
    }

    const eventWithUserData = {
      ...event,
      userRegistered,
      userFavorited
    }

    res.json({
      success: true,
      data: eventWithUserData
    } as ApiResponse)

  } catch (error) {
    console.error('Event fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/events/:id/register - Register for an event
router.post('/:id/register', authenticateToken, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.id)
    const userId = req.userId!
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    const event = dataStore.getEventById(eventId)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      } as ApiResponse)
    }

    // Check if event is at capacity
    if (event.capacity && event.registeredCount >= event.capacity) {
      return res.status(409).json({
        success: false,
        error: 'Event is at full capacity'
      } as ApiResponse)
    }

    // Check if user is already registered
    const existingRegistrations = dataStore.getUserRegistrations(userId)
    const alreadyRegistered = existingRegistrations.some(reg => reg.eventId === eventId)
    
    if (alreadyRegistered) {
      return res.status(409).json({
        success: false,
        error: 'Already registered for this event'
      } as ApiResponse)
    }

    const registration = dataStore.registerForEvent(userId, eventId)

    res.status(201).json({
      success: true,
      data: registration,
      message: 'Successfully registered for event'
    } as ApiResponse)

  } catch (error) {
    console.error('Event registration error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/events/user/schedule - Get user's registered events
router.get('/user/schedule', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const registrations = dataStore.getUserRegistrations(userId)
    
    const userEvents = registrations.map(reg => {
      const event = dataStore.getEventById(reg.eventId)
      if (!event) return null
      return {
        ...event,
        registrationStatus: reg.status,
        registeredAt: reg.registeredAt
      }
    }).filter(event => event !== null) // Filter out any null events

    res.json({
      success: true,
      data: userEvents
    } as ApiResponse)

  } catch (error) {
    console.error('User schedule fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/events/user/today - Get user's events for today
router.get('/user/today', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const registrations = dataStore.getUserRegistrations(userId)
    
    // Get today's date
    const today = new Date()
    const todayString = today.toISOString().split('T')[0] // YYYY-MM-DD format
    
    const userEvents = registrations.map(reg => {
      const event = dataStore.getEventById(reg.eventId)
      if (!event) return null
      
      // For this demo, we'll consider events that are on day 0 (Monday Nov 17) as "today"
      // In a real app, you'd check the actual event date
      const isToday = event.startDay === 0 // Assuming Monday Nov 17 is "today"
      
      if (!isToday) return null
      
      return {
        id: event.id,
        time: event.time,
        title: event.title,
        location: event.location,
        status: reg.status,
        type: event.type.toLowerCase(),
        description: event.description || `${event.type} event at ${event.location}`,
        registrationStatus: reg.status,
        registeredAt: reg.registeredAt,
        qrCode: event.qrCode,
        organizer: event.organizer
      }
    }).filter(event => event !== null)

    res.json({
      success: true,
      data: userEvents
    } as ApiResponse)

  } catch (error) {
    console.error('User today events fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// DELETE /api/events/:id/register - Unregister from an event
router.delete('/:id/register', authenticateToken, (req: AuthRequest, res) => {
  try {
    const eventId = parseInt(req.params.id)
    const userId = req.userId!
    
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID'
      } as ApiResponse)
    }

    const registrations = dataStore.getUserRegistrations(userId)
    const registrationIndex = registrations.findIndex(reg => reg.eventId === eventId)
    
    if (registrationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found'
      } as ApiResponse)
    }

    // Remove registration (simplified - in real app would update status)
    registrations.splice(registrationIndex, 1)

    // Update event registered count
    const event = dataStore.getEventById(eventId)
    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1
    }

    res.json({
      success: true,
      message: 'Successfully unregistered from event'
    } as ApiResponse)

  } catch (error) {
    console.error('Event unregistration error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router