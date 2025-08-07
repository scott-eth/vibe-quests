# Devconnect ARG Backend

Backend API server for the Devconnect ARG (Ethereum World's Fair) application, providing comprehensive endpoints for user management, event handling, quest systems, favorites, and wallet integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Development server:**
   ```bash
   npm run dev
   ```
   Server starts at `http://localhost:3001`

4. **Production build:**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Overview

The backend provides these main API groups:

- **🔐 Authentication** (`/api/auth`) - User login, profiles, ticket verification
- **🎪 Events** (`/api/events`) - Event discovery, registration, scheduling  
- **⚔️ Quests** (`/api/quests`) - Quest system with progress tracking
- **❤️ Favorites** (`/api/favorites`) - Event bookmarking and management
- **💼 Wallet** (`/api/wallet`) - Wallet integration and transactions

## 🛠️ Technology Stack

- **Runtime:** Node.js with Express.js
- **Language:** TypeScript for type safety
- **Authentication:** JWT tokens
- **Validation:** Zod schemas
- **Data Storage:** In-memory (easily replaceable with database)
- **CORS:** Configured for frontend integration

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint documentation.

### Key Endpoints

```bash
# Health check
GET /api/health

# User authentication
POST /api/auth/login
GET /api/auth/me
PUT /api/auth/profile

# Events
GET /api/events
POST /api/events/:id/register
GET /api/events/user/schedule

# Quests  
GET /api/quests
POST /api/quests/:id/start
PUT /api/quests/:id/progress
POST /api/quests/:id/claim

# Favorites
GET /api/favorites
POST /api/favorites/:eventId
DELETE /api/favorites/:eventId

# Wallet
GET /api/wallet
GET /api/wallet/transactions
POST /api/wallet/connect
```

## 🏗️ Architecture

### Project Structure
```
backend/
├── src/
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Data store and models
│   ├── middleware/      # Auth and validation middleware
│   ├── routes/          # API route handlers
│   ├── utils/           # Validation and helper functions
│   └── server.ts        # Main server setup
├── dist/                # Compiled JavaScript (after build)
├── API_DOCUMENTATION.md # Complete API docs
└── README.md           # This file
```

### Data Models

The backend uses TypeScript interfaces for strong typing:

- **User** - Authentication and profile data
- **Event** - Event information and scheduling
- **Quest** - Quest definitions and requirements
- **UserQuest** - User progress on quests
- **Transaction** - Wallet transaction history
- **UserWallet** - Wallet and balance information

### Authentication Flow

1. User authenticates via email or wallet address
2. Server generates JWT token (7-day expiry)
3. Client includes token in Authorization header
4. Middleware validates token and attaches user to request

### Data Storage

Currently uses in-memory storage for simplicity, but structured to easily integrate with:
- PostgreSQL
- MongoDB  
- Redis for caching
- External APIs (Zupass, blockchain data)

## 🔧 Configuration

### Environment Variables

```bash
# Server
PORT=3001
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key

# CORS
FRONTEND_URL=http://localhost:5173

# Future integrations
DATABASE_URL=postgresql://...
ZUPASS_API_URL=https://api.zupass.org
```

### CORS Configuration

Configured to accept requests from the frontend URL with credentials support for secure cookie handling.

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run test     # Run tests (to be implemented)
```

### Development Features

- **Hot Reload** - Nodemon watches for file changes
- **TypeScript** - Full type checking and IntelliSense
- **Request Logging** - Console logs for all API requests
- **Error Handling** - Comprehensive error responses
- **Validation** - Zod schemas for request validation

## 🔒 Security

### Current Security Measures

- JWT token authentication with expiration
- Input validation using Zod schemas
- CORS protection
- Error message sanitization in production
- Request size limits

### Production Recommendations

- [ ] Add rate limiting middleware
- [ ] Implement API versioning
- [ ] Add comprehensive logging (Winston)
- [ ] Set up monitoring and metrics
- [ ] Database connection pooling
- [ ] HTTPS enforcement
- [ ] Input sanitization for XSS protection

## 🚀 Deployment

### Docker Support (Future)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

### Deployment Platforms

- **Vercel** - Serverless functions
- **Railway** - Container deployment  
- **Heroku** - Platform as a Service
- **AWS/GCP** - Cloud infrastructure

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the React frontend:

- **CORS configured** for `http://localhost:5173`
- **Response format** matches frontend expectations
- **Error handling** provides user-friendly messages
- **Authentication flow** supports both email and wallet login

### Frontend Integration Example

```typescript
// Frontend API client example
const api = {
  baseURL: 'http://localhost:3001/api',
  
  async login(email: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'email', email })
    })
    return response.json()
  },
  
  async getEvents(filters = {}) {
    const params = new URLSearchParams(filters)
    const response = await fetch(`${this.baseURL}/events?${params}`)
    return response.json()
  }
}
```

## 📈 Future Enhancements

### Planned Features

- [ ] **Database Integration** - PostgreSQL with Prisma ORM
- [ ] **Real-time Updates** - WebSocket support for live data
- [ ] **Zupass Integration** - Real ticket verification
- [ ] **Email Service** - User notifications and verification
- [ ] **Blockchain Integration** - Real wallet transactions
- [ ] **Caching Layer** - Redis for performance
- [ ] **Admin Dashboard** - Event and user management
- [ ] **Analytics** - User behavior tracking
- [ ] **File Upload** - Profile pictures and event images
- [ ] **Push Notifications** - Event reminders

### Scalability Considerations

- **Database** - Move from in-memory to persistent storage
- **Caching** - Implement Redis for frequently accessed data
- **Load Balancing** - Multiple server instances
- **CDN** - Static asset delivery
- **Microservices** - Split into domain-specific services

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is part of the Devconnect ARG application for the Ethereum World's Fair in Buenos Aires, November 2025.

## 🆘 Support

- **Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions

---

**Built with ❤️ for the Ethereum community**