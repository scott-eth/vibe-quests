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
    VERIFY_TICKET: '/api/auth/verify-ticket'
  },
  QUESTS: {
    BASE: '/api/quests'
  },
  FAVORITES: {
    BASE: '/api/favorites'
  },
  WALLET: {
    BASE: '/api/wallet'
  }
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
