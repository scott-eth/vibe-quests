import { z } from 'zod'

// Auth validation schemas
export const emailAuthSchema = z.object({
  email: z.string().email('Invalid email format'),
  method: z.literal('email')
})

export const walletAuthSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address format'),
  method: z.literal('wallet')
})

export const authRequestSchema = z.union([emailAuthSchema, walletAuthSchema])

// User profile validation
export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  displayName: z.string().min(1).max(50).optional(),
  experienceLevel: z.enum(['beginner', 'experienced']).optional(),
  ticketVerified: z.boolean().optional(),
  ticketVerificationMethod: z.enum(['zupass', 'email']).optional()
})

// Event validation
export const eventFilterSchema = z.object({
  type: z.string().optional(),
  day: z.number().min(0).max(6).optional(),
  search: z.string().optional(),
  showCommunity: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
})

// Quest validation
export const questProgressSchema = z.object({
  questId: z.string().uuid('Invalid quest ID'),
  progress: z.number().min(0),
  completed: z.boolean().optional()
})

// Utility function to validate request body
export const validateBody = <T>(schema: z.ZodSchema<T>) => {
  return (req: any, res: any, next: any) => {
    try {
      req.validatedBody = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors
        })
      }
      next(error)
    }
  }
}

// Utility function to validate query parameters
export const validateQuery = <T>(schema: z.ZodSchema<T>) => {
  return (req: any, res: any, next: any) => {
    try {
      req.validatedQuery = schema.parse(req.query)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: error.errors
        })
      }
      next(error)
    }
  }
}