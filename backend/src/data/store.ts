import { v4 as uuidv4 } from 'uuid'
import { User, Event, Quest, UserQuest, UserFavorite, EventRegistration, UserWallet } from '../types'

// In-memory data store (in production, this would be a database)
class DataStore {
  private users: Map<string, User> = new Map()
  private events: Map<number, Event> = new Map()
  private quests: Map<string, Quest> = new Map()
  private userQuests: Map<string, UserQuest[]> = new Map()
  private userFavorites: Map<string, UserFavorite[]> = new Map()
  private eventRegistrations: Map<string, EventRegistration[]> = new Map()
  private userWallets: Map<string, UserWallet> = new Map()

  constructor() {
    this.initializeData()
  }

  // User methods
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const user: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.users.set(user.id, user)
    return user
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id)
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.email === email)
  }

  getUserByWallet(walletAddress: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.walletAddress === walletAddress)
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id)
    if (!user) return undefined
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() }
    this.users.set(id, updatedUser)
    return updatedUser
  }

  // Event methods
  getAllEvents(): Event[] {
    return Array.from(this.events.values())
  }

  getEventById(id: number): Event | undefined {
    return this.events.get(id)
  }

  getFilteredEvents(filters: { type?: string; day?: number; search?: string; showCommunity?: boolean }): Event[] {
    let events = this.getAllEvents()

    if (filters.type && filters.type !== 'all') {
      events = events.filter(event => event.type.toLowerCase() === filters.type?.toLowerCase())
    }

    if (filters.day !== undefined) {
      events = events.filter(event => event.startDay === filters.day)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.organizer?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.showCommunity === false) {
      events = events.filter(event => !event.isCommunityEvent)
    }

    return events
  }

  // Quest methods
  getAllQuests(): Quest[] {
    return Array.from(this.quests.values()).filter(quest => quest.isActive)
  }

  getQuestById(id: string): Quest | undefined {
    return this.quests.get(id)
  }

  getUserQuests(userId: string): UserQuest[] {
    return this.userQuests.get(userId) || []
  }

  updateUserQuest(userId: string, questId: string, updates: Partial<UserQuest>): UserQuest | undefined {
    const userQuests = this.userQuests.get(userId) || []
    const questIndex = userQuests.findIndex(uq => uq.questId === questId)
    
    if (questIndex === -1) return undefined

    userQuests[questIndex] = { ...userQuests[questIndex], ...updates }
    this.userQuests.set(userId, userQuests)
    return userQuests[questIndex]
  }

  startQuest(userId: string, questId: string): UserQuest {
    const userQuests = this.userQuests.get(userId) || []
    const quest = this.quests.get(questId)
    
    if (!quest) throw new Error('Quest not found')

    const userQuest: UserQuest = {
      userId,
      questId,
      status: 'active',
      progress: 0,
      maxProgress: quest.requirements.reduce((sum, req) => sum + (req.count || 1), 0),
      startedAt: new Date()
    }

    userQuests.push(userQuest)
    this.userQuests.set(userId, userQuests)
    return userQuest
  }

  // Favorites methods
  getUserFavorites(userId: string): UserFavorite[] {
    return this.userFavorites.get(userId) || []
  }

  addFavorite(userId: string, eventId: number): UserFavorite {
    const favorites = this.userFavorites.get(userId) || []
    const existing = favorites.find(fav => fav.eventId === eventId)
    
    if (existing) return existing

    const favorite: UserFavorite = {
      userId,
      eventId,
      addedAt: new Date()
    }

    favorites.push(favorite)
    this.userFavorites.set(userId, favorites)
    return favorite
  }

  removeFavorite(userId: string, eventId: number): boolean {
    const favorites = this.userFavorites.get(userId) || []
    const filteredFavorites = favorites.filter(fav => fav.eventId !== eventId)
    
    if (filteredFavorites.length === favorites.length) return false
    
    this.userFavorites.set(userId, filteredFavorites)
    return true
  }

  // Event registration methods
  registerForEvent(userId: string, eventId: number): EventRegistration {
    const registrations = this.eventRegistrations.get(userId) || []
    const existing = registrations.find(reg => reg.eventId === eventId)
    
    if (existing) return existing

    const registration: EventRegistration = {
      userId,
      eventId,
      registeredAt: new Date(),
      status: 'registered'
    }

    registrations.push(registration)
    this.eventRegistrations.set(userId, registrations)

    // Update event registered count
    const event = this.events.get(eventId)
    if (event) {
      event.registeredCount += 1
      this.events.set(eventId, event)
    }

    return registration
  }

  getUserRegistrations(userId: string): EventRegistration[] {
    return this.eventRegistrations.get(userId) || []
  }

  // Wallet methods
  getUserWallet(userId: string): UserWallet | undefined {
    return this.userWallets.get(userId)
  }

  createUserWallet(userId: string, address: string): UserWallet {
    const wallet: UserWallet = {
      userId,
      address,
      balance: {
        eth: Math.random() * 10, // Mock balance
        tokens: [
          { symbol: 'USDC', name: 'USD Coin', balance: Math.random() * 1000, decimals: 6, contractAddress: '0x...' },
          { symbol: 'DAI', name: 'Dai Stablecoin', balance: Math.random() * 500, decimals: 18, contractAddress: '0x...' }
        ]
      },
      nfts: [],
      transactions: []
    }

    this.userWallets.set(userId, wallet)
    return wallet
  }

  private initializeData() {
    // Initialize with sample events data (matching your frontend)
    const sampleEvents: Event[] = [
      {
        id: 1,
        title: "Ethereum World's Fair & Coworking",
        time: "09:00–18:00 EVERY DAY",
        location: "LA RURAL",
        type: "COWORK",
        color: "bg-pink-100 border-pink-200",
        textColor: "text-pink-700",
        badges: ["TICKETS AVAILABLE", "ALL WELCOME"],
        span: 7,
        startDay: 0,
        description: "Join us for a week-long coworking experience at the heart of the Ethereum ecosystem",
        capacity: 500,
        registeredCount: 247,
        isCommunityEvent: false,
        isActive: true
      },
      {
        id: 2,
        title: "Ethereum Day",
        time: "10:00–18:00",
        organizer: "ETHEREUM FOUNDATION",
        location: "LA RURAL",
        attendees: "2000",
        type: "Core",
        color: "bg-blue-100 border-blue-200",
        textColor: "text-blue-700",
        badges: ["TALKS", "PRESENTATION"],
        span: 1,
        startDay: 1,
        description: "The main Ethereum Foundation presentation day with core protocol updates",
        capacity: 2000,
        registeredCount: 1847,
        isCommunityEvent: false,
        isActive: true
      },
      // Add more events...
    ]

    sampleEvents.forEach(event => {
      this.events.set(event.id, event)
    })

    // Initialize sample quests
    const sampleQuests: Quest[] = [
      {
        id: uuidv4(),
        title: "Welcome to Devconnect",
        description: "Complete your onboarding and get familiar with the app",
        type: "story",
        difficulty: "easy",
        xpReward: 100,
        coinReward: 50,
        requirements: [
          { type: "complete_onboarding", count: 1 },
          { type: "connect_wallet", count: 1 }
        ],
        isActive: true,
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: "Event Explorer",
        description: "Register for your first event",
        type: "daily",
        difficulty: "easy",
        xpReward: 75,
        coinReward: 25,
        requirements: [
          { type: "attend_event", count: 1 }
        ],
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      }
    ]

    sampleQuests.forEach(quest => {
      this.quests.set(quest.id, quest)
    })
  }
}

export const dataStore = new DataStore()