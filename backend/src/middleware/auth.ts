import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { dataStore } from '../data/store'
import { AuthRequest } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'devconnect-arg-secret-key-2025'

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded
  } catch (error) {
    return null
  }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(403).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    })
  }

  // Verify user still exists
  const user = dataStore.getUserById(decoded.userId)
  if (!user) {
    return res.status(403).json({ 
      success: false, 
      error: 'User not found' 
    })
  }

  req.userId = decoded.userId
  req.user = user
  next()
}

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token) {
    const decoded = verifyToken(token)
    if (decoded) {
      const user = dataStore.getUserById(decoded.userId)
      if (user) {
        req.userId = decoded.userId
        req.user = user
      }
    }
  }

  next()
}