import { Request } from 'express'

// User and Authentication Types
export interface User {
  id: string
  email?: string
  walletAddress?: string
  name?: string
  displayName?: string
  authMethod: 'email' | 'wallet'
  experienceLevel: 'beginner' | 'experienced'
  ticketVerified: boolean
  ticketVerificationMethod?: 'zupass' | 'email'
  profileCompleteness: number
  createdAt: Date
  updatedAt: Date
}

export interface AuthRequestBody {
  email?: string
  walletAddress?: string
  method: 'email' | 'wallet'
}

export interface AuthRequest extends Request {
  userId?: string
  user?: User
  validatedBody?: any
  validatedQuery?: any
}

// Event Types
export interface Event {
  id: number
  title: string
  time: string
  organizer?: string
  location: string
  attendees?: string
  type: string
  color: string
  textColor: string
  badges: string[]
  span: number
  startDay: number
  description?: string
  capacity?: number
  registeredCount: number
  requirements?: string[]
  isCommunityEvent: boolean
  isActive: boolean
}

export interface EventRegistration {
  userId: string
  eventId: number
  registeredAt: Date
  status: 'registered' | 'attended' | 'cancelled'
}

// Quest Types
export interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'story' | 'achievement'
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  coinReward: number
  requirements: QuestRequirement[]
  isActive: boolean
  expiresAt?: Date
  createdAt: Date
}

export interface QuestRequirement {
  type: 'attend_event' | 'complete_onboarding' | 'visit_booth' | 'connect_wallet' | 'verify_ticket'
  target?: string
  count?: number
}

export interface UserQuest {
  userId: string
  questId: string
  status: 'available' | 'active' | 'completed' | 'locked'
  progress: number
  maxProgress: number
  startedAt?: Date
  completedAt?: Date
  claimedAt?: Date
}

// Wallet and Transaction Types
export interface UserWallet {
  userId: string
  address: string
  balance: {
    eth: number
    tokens: TokenBalance[]
  }
  nfts: NFTCollection[]
  transactions: Transaction[]
}

export interface TokenBalance {
  symbol: string
  name: string
  balance: number
  decimals: number
  contractAddress: string
}

export interface NFTCollection {
  contractAddress: string
  name: string
  symbol: string
  tokens: NFTToken[]
}

export interface NFTToken {
  tokenId: string
  name: string
  description?: string
  image?: string
  attributes: NFTAttribute[]
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface Transaction {
  id: string
  hash: string
  type: 'quest_reward' | 'event_payment' | 'nft_mint' | 'transfer'
  amount: number
  token: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: Date
  description: string
}

// Favorites
export interface UserFavorite {
  userId: string
  eventId: number
  addedAt: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Request/Response specific types
export interface LoginResponse {
  user: Omit<User, 'updatedAt'>
  token: string
}

export interface QuestProgressUpdate {
  questId: string
  progress: number
  completed?: boolean
}

export interface EventFilter {
  type?: string
  day?: number
  search?: string
  showCommunity?: boolean
}