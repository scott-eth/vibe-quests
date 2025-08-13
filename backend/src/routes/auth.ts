import { Router } from 'express'
import { dataStore } from '../data/store'
import { generateToken, authenticateToken } from '../middleware/auth'
import { validateBody } from '../utils/validation'
import { authRequestSchema, updateProfileSchema } from '../utils/validation'
import { ApiResponse, LoginResponse, AuthRequest } from '../types'

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
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    } as ApiResponse)
  }
  
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
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse)
    }
    
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

// POST /api/auth/send-otp - Send OTP to email
router.post('/send-otp', (req, res) => {
  try {
    const { email } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      } as ApiResponse)
    }

    // In a real app, this would send an actual OTP via email service
    // For demo, we'll simulate sending OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(`OTP for ${email}: ${otpCode}`) // In production, this would be sent via email

    res.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        email,
        // In production, don't send the actual OTP in response
        otp: otpCode // Only for demo purposes
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Send OTP error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/auth/verify-otp - Verify OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      } as ApiResponse)
    }

    // In a real app, this would verify against stored OTP
    // For demo, we'll accept any 6-digit code
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP format'
      } as ApiResponse)
    }

    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        email,
        verified: true
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/auth/create-wallet - Create new wallet for user
router.post('/create-wallet', (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      } as ApiResponse)
    }

    // Generate a mock wallet address
    const walletAddress = `0x${Math.random().toString(16).substr(2, 40)}`
    
    // In a real app, this would create an actual wallet
    res.json({
      success: true,
      message: 'Wallet created successfully',
      data: {
        walletAddress,
        created: true
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Create wallet error:', error)
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
    const { method, email } = req.body // 'zupass' or 'email', email for verification

    if (!method || !['zupass', 'email'].includes(method)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification method'
      } as ApiResponse)
    }

    // In a real app, this would verify with Zupass or check email against registration records
    // For now, we'll simulate successful verification
    if (!req.user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse)
    }
    
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
        method,
        email: method === 'email' ? email : undefined
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