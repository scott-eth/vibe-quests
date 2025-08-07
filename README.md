# Devconnect ARG - Ethereum World's Fair App

A comprehensive full-stack application for the Ethereum World's Fair in Buenos Aires, featuring a complete onboarding flow, event management, quest system, wallet integration, and user experience designed for the Ethereum developer community.

## Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/UI** for pre-built components
- **Lucide React** for modern icons
- **Radix UI** for accessible components

## Backend Stack  
- **Node.js** with Express
- **TypeScript** for type safety
- **CORS** enabled for cross-origin requests

## Features

### 🚀 Onboarding Experience
### 🎪 World's Fair & Events
### 🗓️ Schedule Management
### ❤️ Favorites
### 💼 Wallet Integration
### 🎯 Quests System
### 📱 Mobile-First Design
### 🔔 Notifications & Feedback

## Getting Started

### Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Development
```bash
# Start frontend dev server (runs on http://localhost:5173)
cd frontend
npm run dev

# Start backend dev server (runs on http://localhost:3001)
cd backend
npm run dev
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
npm start
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/data` - Get sample data
- `POST /api/data` - Create new item

## App Sections

### 🏠 Home Dashboard
- **Personalized Welcome** - Time-based greetings in Spanish
- **Today's Schedule** - Quick view of user's registered events
- **Quest Progress** - Visual progress tracking for onboarding and showcases
- **Featured Carousel** - Highlighted app features and event content
- **Quick Navigation** - Direct access to all major sections

### 🎪 World's Fair
- **Event Discovery Hub** - Browse all available events
- **Interactive Calendar** - 7-day visual schedule layout
- **Event Categories** - Filter by talks, workshops, social events
- **Venue Information** - Detailed location and capacity data
- **Registration System** - Direct event signup and management

### 🗓️ Schedule View
- **Personal Timeline** - Your registered events by day
- **Conflict Detection** - Visual warnings for overlapping events
- **Quick Actions** - Add/remove events with one tap
- **Event Search** - Find specific sessions quickly
- **Community Toggle** - Show/hide community-organized events

### ❤️ Favorites
- **Saved Events** - All favorited events organized by date
- **Smart Recommendations** - Suggested events based on preferences
- **Quick Access** - Jump to schedule or event details
- **Bulk Actions** - Manage multiple favorites at once

### 💼 Wallet & Profile
- **Wallet Overview** - Balance, transactions, and NFTs
- **Profile Management** - Personal information and preferences
- **Quest Rewards** - Earned tokens and achievements
- **Settings** - App configuration and preferences
- **Security** - Wallet connection and privacy settings

### ⚔️ Quests System
- **Interactive Challenges** - Complete tasks to earn rewards
- **Progress Tracking** - Visual indicators and statistics
- **Multiple Categories** - Daily, weekly, story, and achievement quests
- **Reward Collection** - Claim XP, tokens, and special items
- **Leaderboards** - Community competition and recognition

## Project Structure
```
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── onboarding/     # Onboarding flow components
│   │   │   │   ├── AuthScreen.tsx
│   │   │   │   ├── EventOverview.tsx
│   │   │   │   ├── ExperienceLevel.tsx
│   │   │   │   ├── OnboardingHeader.tsx
│   │   │   │   └── TicketVerification.tsx
│   │   │   ├── ui/             # Shadcn/UI base components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   └── toast.tsx
│   │   │   ├── EventModal.tsx  # Event details modal
│   │   │   ├── Fair.tsx        # World's Fair main view
│   │   │   ├── Schedule.tsx    # Event schedule management
│   │   │   ├── Favorites.tsx   # Saved events view
│   │   │   ├── Wallet.tsx      # Wallet & profile management
│   │   │   └── Quests.tsx      # Quest system
│   │   ├── lib/                # Utility functions
│   │   └── App.tsx             # Main app with routing & state
│   ├── public/                 # Static assets
│   └── ...
├── backend/                    # Node.js backend
│   ├── src/
│   │   └── server.ts          # Express server
│   └── ...
└── README.md
```

## Application Architecture

### Design Philosophy
The application follows modern UX best practices and Web3 design patterns:

- **Progressive Disclosure** - Information revealed as needed
- **Clear Visual Hierarchy** - Important information stands out  
- **Immediate Feedback** - Visual responses to user actions
- **Goal Clarity** - Clear objectives and progress indicators
- **Reward Visibility** - Transparent reward system
- **Status Communication** - Obvious states and requirements
- **Mobile-First** - Optimized for mobile usage patterns
- **Web3 Integration** - Seamless wallet connection and blockchain interaction

### State Management
- **Local State** - React hooks for component-level state
- **Shared State** - Props drilling for cross-component communication
- **Persistent Data** - Local storage for user preferences and favorites
- **Real-time Updates** - Live data synchronization across components

### Event Data Structure
Events are structured with the following key properties:
- **Scheduling** - Start time, duration, and day mapping
- **Metadata** - Title, description, organizer, and type
- **Logistics** - Venue, capacity, and registration requirements
- **User State** - Favorite status, registration status, and personal notes

### Onboarding Flow
The multi-step onboarding process includes:
1. **Authentication** - Email or wallet-based signup
2. **Event Overview** - Interactive introduction to Devconnect
3. **Experience Level** - Personalization based on user background  
4. **Ticket Verification** - Zupass or email-based event access

## Technologies Used

### Core Framework
- React 18 with TypeScript
- Vite for build tooling
- Node.js with Express

### UI & Styling
- Tailwind CSS for utility-first styling
- Shadcn/UI for consistent component design
- Radix UI for accessibility primitives
- Lucide React for modern iconography

### Development Tools
- TypeScript for type safety across frontend and backend
- ESLint for code quality and consistency
- PostCSS for CSS processing and optimization
- Nodemon for backend hot reloading
- Vite for fast frontend development and building
- Tailwind CSS for utility-first styling

## Event Information

**Devconnect ARG - Ethereum World's Fair**
- **Dates:** November 17-23, 2025 (7 days)
- **Location:** Buenos Aires, Argentina (+ Virtual attendance)
- **Expected Attendees:** 15,000+ developers, builders, and innovators
- **Venues:** Multiple locations including LA RURAL and various pavilions
- **Event Types:** Core talks, workshops, coworking spaces, social events, and networking

## Technical Highlights

### Performance Optimizations
- **Code Splitting** - Lazy loading for optimal bundle size
- **Image Optimization** - Responsive images with proper sizing
- **Caching Strategies** - Efficient data caching and state management
- **Mobile Performance** - Touch-optimized interactions and smooth scrolling

### Accessibility Features
- **WCAG Compliance** - Meets accessibility guidelines
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Readable color schemes and proper contrast ratios

### Browser Support
- **Modern Browsers** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers** - iOS Safari, Android Chrome
- **Progressive Enhancement** - Graceful degradation for older browsers