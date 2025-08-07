import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import route handlers
import authRoutes from './routes/auth'
import eventRoutes from './routes/events'
import questRoutes from './routes/quests'
import favoriteRoutes from './routes/favorites'
import walletRoutes from './routes/wallet'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    service: 'Devconnect ARG Backend'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/quests', questRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/wallet', walletRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Devconnect ARG Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      events: '/api/events',
      quests: '/api/quests',
      favorites: '/api/favorites',
      wallet: '/api/wallet'
    },
    documentation: 'See README.md for API documentation'
  })
})

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  })
})

// Global error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err.stack)
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(isDevelopment && { details: err.message, stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log('🚀 Devconnect ARG Backend Server Started')
  console.log('=' .repeat(50))
  console.log(`📍 Server URL: http://localhost:${PORT}`)
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`)
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`)
  console.log(`🎪 Events API: http://localhost:${PORT}/api/events`)
  console.log(`⚔️  Quests API: http://localhost:${PORT}/api/quests`)
  console.log(`❤️  Favorites API: http://localhost:${PORT}/api/favorites`)
  console.log(`💼 Wallet API: http://localhost:${PORT}/api/wallet`)
  console.log('=' .repeat(50))
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 CORS Origin: ${FRONTEND_URL}`)
  console.log('✅ Server ready to accept connections')
})