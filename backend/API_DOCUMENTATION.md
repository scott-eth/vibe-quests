# Devconnect ARG Backend API Documentation

## Overview

The Devconnect ARG Backend provides a comprehensive REST API for managing users, events, quests, favorites, and wallet functionality for the Ethereum World's Fair application.

**Base URL:** `http://localhost:3001`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
```

## API Endpoints

### Health Check

#### GET /api/health
Check server health and status.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-17T...",
  "uptime": 3600,
  "version": "1.0.0",
  "service": "Devconnect ARG Backend"
}
```

---

## Authentication Endpoints

### POST /api/auth/login
Authenticate user with email or wallet address.

**Request Body:**
```json
{
  "method": "email" | "wallet",
  "email": "user@example.com", // if method is email
  "walletAddress": "0x742d35Cc..." // if method is wallet
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "walletAddress": "0x742d35Cc...",
      "name": "User Name",
      "authMethod": "email",
      "experienceLevel": "beginner",
      "ticketVerified": false,
      "profileCompleteness": 25
    },
    "token": "jwt-token"
  }
}
```

### GET /api/auth/me
Get current user profile (requires authentication).

### PUT /api/auth/profile
Update user profile (requires authentication).

**Request Body:**
```json
{
  "name": "New Name",
  "displayName": "newname.eth",
  "experienceLevel": "experienced",
  "ticketVerified": true
}
```

### POST /api/auth/verify-ticket
Verify user's event ticket (requires authentication).

**Request Body:**
```json
{
  "method": "zupass" | "email"
}
```

---

## Event Endpoints

### GET /api/events
Get all events with optional filtering.

**Query Parameters:**
- `type` (optional): Filter by event type
- `day` (optional): Filter by day (0-6)
- `search` (optional): Search in title, description, organizer
- `showCommunity` (optional): Include community events (default: true)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Ethereum Day",
      "time": "10:00–18:00",
      "location": "LA RURAL",
      "type": "Core",
      "badges": ["TALKS", "PRESENTATION"],
      "capacity": 2000,
      "registeredCount": 1847,
      "userRegistered": false,
      "userFavorited": false,
      "qrCode": "QR-ETHEREUM-DAY-002",
      "organizer": "ETHEREUM FOUNDATION"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### GET /api/events/:id
Get specific event details.

### POST /api/events/:id/register
Register for an event (requires authentication).

### DELETE /api/events/:id/register
Unregister from an event (requires authentication).

### GET /api/events/user/schedule
Get user's registered events (requires authentication).

---

## Quest Endpoints

### GET /api/quests
Get all available quests with user progress (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "quest-uuid",
      "title": "Welcome to Devconnect",
      "description": "Complete your onboarding...",
      "type": "story",
      "difficulty": "easy",
      "xpReward": 100,
      "coinReward": 50,
      "status": "active",
      "progress": 1,
      "maxProgress": 2,
      "canClaim": false
    }
  ]
}
```

### GET /api/quests/:id
Get specific quest details with user progress.

### POST /api/quests/:id/start
Start a quest (requires authentication).

### PUT /api/quests/:id/progress
Update quest progress (requires authentication).

**Request Body:**
```json
{
  "questId": "quest-uuid",
  "progress": 2,
  "completed": true
}
```

### POST /api/quests/:id/claim
Claim quest rewards (requires authentication).

### GET /api/quests/user/stats
Get user's quest statistics (requires authentication).

---

## Favorites Endpoints

### GET /api/favorites
Get user's favorite events (requires authentication).

### POST /api/favorites/:eventId
Add event to favorites (requires authentication).

### DELETE /api/favorites/:eventId
Remove event from favorites (requires authentication).

### GET /api/favorites/events/:eventId/status
Check if event is favorited (requires authentication).

### GET /api/favorites/stats
Get user's favorites statistics (requires authentication).

---

## Wallet Endpoints

### GET /api/wallet
Get user's wallet information (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user-uuid",
    "address": "0x742d35Cc...",
    "balance": {
      "eth": 2.5,
      "tokens": [
        {
          "symbol": "USDC",
          "name": "USD Coin",
          "balance": 1000,
          "decimals": 6
        }
      ]
    },
    "nfts": [],
    "transactions": []
  }
}
```

### GET /api/wallet/balance
Get wallet balance (requires authentication).

### GET /api/wallet/transactions
Get transaction history (requires authentication).

### GET /api/wallet/nfts
Get user's NFT collections (requires authentication).

### POST /api/wallet/rewards
Distribute quest rewards (requires authentication).

**Request Body:**
```json
{
  "amount": 0.1,
  "type": "quest_reward",
  "description": "Quest completion reward",
  "token": "ETH"
}
```

### POST /api/wallet/connect
Connect a new wallet address (requires authentication).

**Request Body:**
```json
{
  "address": "0x742d35Cc..."
}
```

### GET /api/wallet/stats
Get wallet statistics (requires authentication).

---

## Error Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (missing or invalid token)
- **403** - Forbidden (valid token but insufficient permissions)
- **404** - Not Found
- **409** - Conflict (duplicate resource)
- **500** - Internal Server Error

## Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

## Data Models

### User
```typescript
interface User {
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
}
```

### Event
```typescript
interface Event {
  id: number
  title: string
  time: string
  organizer?: string
  location: string
  type: string
  badges: string[]
  capacity?: number
  registeredCount: number
  isCommunityEvent: boolean
  description?: string
  qrCode?: string
}
```

### Quest
```typescript
interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'story' | 'achievement'
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  coinReward: number
  requirements: QuestRequirement[]
  expiresAt?: Date
}
```

## Development Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001` with hot reloading enabled.

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

## Security Considerations

- JWT tokens expire after 7 days
- All user input is validated using Zod schemas
- CORS is configured to only allow requests from the frontend URL
- Error messages don't leak sensitive information in production
- Rate limiting should be implemented for production use

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real Zupass integration for ticket verification
- Email service integration
- Rate limiting middleware
- API versioning
- Comprehensive logging
- Metrics and monitoring
- WebSocket support for real-time updates