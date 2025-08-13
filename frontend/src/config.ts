// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  DEMO_TOKEN: import.meta.env.VITE_DEMO_TOKEN || 'demo-user-token-123'
}

// API Endpoints
export const API_ENDPOINTS = {
  EVENTS: {
    BASE: '/api/events',
    USER_TODAY: '/api/events/user/today',
    USER_SCHEDULE: '/api/events/user/schedule'
  },
  AUTH: {
    BASE: '/api/auth',
    LOGIN: '/api/auth/login',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
    CREATE_WALLET: '/api/auth/create-wallet',
    VERIFY_TICKET: '/api/auth/verify-ticket',
    PROFILE: '/api/auth/profile'
  },
  QUESTS: {
    BASE: '/api/quests',
    VERIFY: '/api/quests/:id/verify',
    STATS: '/api/quests/user/stats'
  },
  FAVORITES: {
    BASE: '/api/favorites'
  },
  WALLET: {
    BASE: '/api/wallet',
    BALANCE: '/api/wallet/balance',
    TRANSACTIONS: '/api/wallet/transactions',
    SEND: '/api/wallet/send',
    RECEIVE_ADDRESS: '/api/wallet/receive-address',
    CONNECT: '/api/wallet/connect',
    STATS: '/api/wallet/stats'
  },
  COLLECTIONS: {
    BASE: '/api/collections',
    STATS: '/api/collections/user/stats'
  }
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
