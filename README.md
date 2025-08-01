# React + Tailwind + Shadcn/UI + Node.js Project

A full-stack application with React frontend and Node.js backend, featuring a modern Quests system.

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

### 🎯 Quests System
- **Modern Quest UI** - Clean, gamified interface inspired by best practices
- **Multiple Quest Types** - Daily, Weekly, Story, and Achievement quests
- **Progress Tracking** - Visual progress bars and completion indicators
- **Reward System** - XP and coin rewards with clear visualization
- **Status Management** - Active, Completed, and Locked quest states
- **Difficulty Levels** - Easy, Medium, and Hard quest categorization
- **Time-based Quests** - Countdown timers for daily/weekly quests
- **Filtering & Tabs** - Easy navigation between quest categories
- **Statistics Dashboard** - Overview of quest completion progress

### 🎨 Design Features
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark/Light Theme Support** - Built-in theme switching capability
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - ARIA compliance through Radix UI
- **Modern Icons** - Beautiful Lucide React icons throughout
- **Card-based Layout** - Clean, organized component structure

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

## Pages

### 🏠 Home Page
- Welcome screen with React + Vite branding
- Interactive counter demo
- Navigation to Quests page
- Technology showcase

### ⚔️ Quests Page
- Comprehensive quest management system
- Interactive quest cards with progress tracking
- Category filtering (All, Daily, Weekly, Story, Achievements)
- Statistics overview with completion metrics
- Reward visualization and claim functionality

## Project Structure
```
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn/UI components
│   │   │   └── Quests.tsx    # Main Quests page component
│   │   ├── lib/              # Utility functions
│   │   └── App.tsx           # Main app with navigation
│   └── ...
├── backend/           # Node.js backend
│   ├── src/
│   │   └── server.ts
│   └── ...
└── README.md
```

## Quest System Architecture

The quest system follows modern gamification best practices:

- **Progressive Disclosure** - Information revealed as needed
- **Clear Visual Hierarchy** - Important information stands out
- **Immediate Feedback** - Visual responses to user actions
- **Goal Clarity** - Clear objectives and progress indicators
- **Reward Visibility** - Transparent reward system
- **Status Communication** - Obvious quest states and requirements

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
- TypeScript for type safety
- ESLint for code quality
- PostCSS for CSS processing
- Nodemon for backend development