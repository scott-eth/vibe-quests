import { useState, useEffect } from 'react'
import { 
  Home, 
  Sword, 
  Calendar, 
  Wallet, 
  Trophy, 
  MapPin,
  Users,
  QrCode,
  X,
  Ticket
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { API_CONFIG, buildApiUrl, API_ENDPOINTS } from './config'
import Quests from '@/components/Quests'
import Fair from '@/components/Fair'
import WalletComponent from '@/components/Wallet'
import Schedule from '@/components/Schedule'
import EventMap from '@/components/EventMap'
import Favorites from '@/components/Favorites'
import Toast from '@/components/ui/toast'
import EventModal from '@/components/EventModal'

// Onboarding Components
import AuthScreen from '@/components/onboarding/AuthScreen'
import EventOverview from '@/components/onboarding/EventOverview'
import ExperienceLevel from '@/components/onboarding/ExperienceLevel'
import TicketVerification from '@/components/onboarding/TicketVerification'

// Types for onboarding flow
type OnboardingStep = 'auth' | 'event-overview' | 'experience-level' | 'ticket-verification' | 'complete'
type ExperienceLevel = 'beginner' | 'experienced'
type AuthMethod = 'email' | 'wallet'

interface UserProfile {
  authMethod: AuthMethod
  email?: string
  walletAddress?: string
  experienceLevel: ExperienceLevel
  ticketVerified: boolean
  ticketVerificationMethod?: 'zupass' | 'email'
  name?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'quests' | 'fair' | 'wallet' | 'schedule' | 'favorites' | 'map'>('home')
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('auth')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [favoriteEvents, setFavoriteEvents] = useState<Set<number>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastAction, setToastAction] = useState<(() => void) | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isMapFocusedMode, setIsMapFocusedMode] = useState(false)
  const [mapFocusDistrict, setMapFocusDistrict] = useState<string | null>(null)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [selectedQrEvent, setSelectedQrEvent] = useState<any | null>(null)
  const [walletActiveSection, setWalletActiveSection] = useState<'profile' | 'wallet' | 'tickets' | 'collections' | 'settings'>('wallet')

  // Scroll to top on initial page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Scroll to top when onboarding step changes or when transitioning to main app
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [onboardingStep, isOnboardingComplete])

  // Scroll to top when navigating between main app pages
  useEffect(() => {
    if (isOnboardingComplete) {
      window.scrollTo(0, 0)
    }
    // Reset focused mode when leaving map page
    if (currentPage !== 'map') {
      setIsMapFocusedMode(false)
    }
    // Reset wallet section when leaving wallet page
    if (currentPage !== 'wallet') {
      setWalletActiveSection('wallet')
    }
  }, [currentPage, isOnboardingComplete])

  // Featured carousel data
  const featuredItems = [
    {
      title: "Quests",
      description: "Complete challenges and earn rewards while exploring the world of Ethereum",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=500&auto=format&fit=crop",
      icon: <Trophy className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "World's Fair",
      description: "Visit the app showcase and experience the latest Ethereum applications",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500&auto=format&fit=crop",
      icon: <MapPin className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Wallet",
      description: "Make purchases, collect rewards, and track your quests securely on Ethereum",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format&fit=crop",
      icon: <Wallet className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Tickets",
      description: "Access your event tickets and QR codes for seamless venue entry",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop",
      icon: <Ticket className="h-6 w-6" />,
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "Schedule", 
      description: "Learn and engage with the best thinkers and builders on Ethereum today",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=500&auto=format&fit=crop",
      icon: <Users className="h-6 w-6" />,
      color: "from-orange-500 to-red-600"
    }
  ]

  // Get current time for greeting
  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  // Favorites management
  const toggleFavorite = (eventId: number, eventTitle: string) => {
    const newFavorites = new Set(favoriteEvents)
    if (newFavorites.has(eventId)) {
      newFavorites.delete(eventId)
      showToast(`${eventTitle} removed from favorites`, () => {
        setFavoriteEvents(prev => new Set([...prev, eventId]))
      })
    } else {
      newFavorites.add(eventId)
      showToast(`${eventTitle} added to favorites`, () => {
        setFavoriteEvents(prev => {
          const updated = new Set(prev)
          updated.delete(eventId)
          return updated
        })
      })
    }
    setFavoriteEvents(newFavorites)
  }

  const showToast = (message: string, undoAction: () => void) => {
    setToastMessage(message)
    setToastAction(() => undoAction)
    // Auto-hide toast after 3.5 seconds (3s visible + 0.5s for slide out animation)
    setTimeout(() => {
      setToastMessage(null)
      setToastAction(null)
    }, 3500)
  }

  const handleUndoToast = () => {
    if (toastAction) {
      toastAction()
      setToastMessage(null)
      setToastAction(null)
    }
  }

  // Event modal management
  const openEventModal = (event: any) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
    setIsEventModalOpen(false)
  }

  // QR modal management
  const openQrModal = (event: any) => {
    setSelectedQrEvent(event)
    setQrModalOpen(true)
  }

  const closeQrModal = () => {
    setSelectedQrEvent(null)
    setQrModalOpen(false)
  }

  // Onboarding handlers
  const handleAuthComplete = (method: AuthMethod, data: { email?: string; address?: string }) => {
    setUserProfile({
      authMethod: method,
      email: data.email,
      walletAddress: data.address,
      experienceLevel: 'beginner', // default, will be updated
      ticketVerified: false
    })
    setOnboardingStep('event-overview')
  }

  const handleEventOverviewComplete = () => {
    setOnboardingStep('experience-level')
  }

  const handleExperienceLevelComplete = (level: ExperienceLevel) => {
    setUserProfile(prev => prev ? { ...prev, experienceLevel: level } : prev)
    setOnboardingStep('ticket-verification')
  }

  const handleTicketVerificationComplete = (method: 'zupass' | 'email', verified: boolean) => {
    setUserProfile(prev => prev ? { 
      ...prev, 
      ticketVerified: verified,
      ticketVerificationMethod: method,
      name: prev.email ? prev.email.split('@')[0] : 'User' // Extract name from email or default
    } : prev)
    setIsOnboardingComplete(true)
  }

  const handleSkipToApp = () => {
    setIsOnboardingComplete(true)
  }

  const handleNavigateToMapWithDistrict = (district: string) => {
    setMapFocusDistrict(district)
    setCurrentPage('map')
  }

  const handleBackStep = () => {
    switch (onboardingStep) {
      case 'event-overview':
        setOnboardingStep('auth')
        break
      case 'experience-level':
        setOnboardingStep('event-overview')
        break
      case 'ticket-verification':
        setOnboardingStep('experience-level')
        break
      default:
        break
    }
  }

  // Mock data - in a real app, this would come from APIs/state management
  const userData = {
    name: userProfile?.name || "User",
    onboardingProgress: {
      completed: 4,
      total: 6
    },
    showcaseProgress: {
      completed: 12,
      total: 46
    }
  }

  // User's today events - fetched from backend
  const [userSignedUpEvents, setUserSignedUpEvents] = useState([
    { 
      id: 1,
      time: "6:00 PM", 
      title: "Opening Ceremony Reception", 
      location: "Main Pavilion", 
      status: "attending", 
      type: "reception",
      description: "Welcome reception with networking and keynote speakers",
      qrCode: "QR-OPENING-RECEPTION-001",
      organizer: "EF TEAM"
    },
    { 
      id: 2,
      time: "8:30 PM", 
      title: "DeFi Mixer", 
      location: "Pavilion Verde", 
      status: "attending", 
      type: "networking",
      description: "Evening networking event for DeFi enthusiasts",
      qrCode: "QR-DEFI-MIXER-002",
      organizer: "DEFI ALLIANCE"
    }
  ])

  // Fetch user's today events on component mount
  useEffect(() => {
    const fetchTodayEvents = async () => {
      try {
        // For demo purposes, we'll use a demo user token
        // In a real app, this would come from your auth system
        const demoToken = API_CONFIG.DEMO_TOKEN
        
        const response = await fetch(buildApiUrl(API_ENDPOINTS.EVENTS.USER_TODAY), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${demoToken}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            // Sort events by time for better timeline display
            const sortedEvents = result.data.sort((a: any, b: any) => {
              // Extract hour from time string (e.g., "09:00–10:00" -> 9)
              const getHour = (timeStr: string) => {
                const hour = parseInt(timeStr.split(':')[0])
                return hour
              }
              
              return getHour(a.time) - getHour(b.time)
            })
            
            setUserSignedUpEvents(sortedEvents)
            return
          }
        }
        
        // Fallback to mock data if API call fails
        console.log('API call failed, using fallback data')
        const mockTodayEvents = [
          {
            id: 2,
            time: "10:00–18:00",
            title: "Ethereum Day",
            location: "LA RURAL",
            status: "registered",
            type: "core",
            description: "The main Ethereum Foundation presentation day with core protocol updates",
            qrCode: "QR-ETHEREUM-DAY-002",
            organizer: "ETHEREUM FOUNDATION"
          },
          {
            id: 3,
            time: "09:00–10:00",
            title: "Opening Ceremony",
            location: "MAIN STAGE",
            status: "registered",
            type: "core",
            description: "Opening ceremony presentation for all attendees",
            qrCode: "QR-OPENING-CEREMONY-001",
            organizer: "EF TEAM"
          },
          {
            id: 4,
            time: "14:00–17:00",
            title: "DeFi Workshop Series",
            location: "WORKSHOP HALL",
            status: "registered",
            type: "partner",
            description: "Hands-on workshop series covering DeFi protocols",
            qrCode: "QR-DEFI-WORKSHOP-003",
            organizer: "AAVE TEAM"
          }
        ]
        
        setUserSignedUpEvents(mockTodayEvents)
      } catch (error) {
        console.error('Failed to fetch today events:', error)
        // Keep default events on error
      }
    }

    if (isOnboardingComplete) {
      fetchTodayEvents()
    }
  }, [isOnboardingComplete])

  const HomePage = () => (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section with Welcome */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        </div>
        
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{getCurrentTimeGreeting()}, {userData.name}! ✨</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">Let's explore the world of Ethereum</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* User's Today Schedule */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Devconnect schedule</CardTitle>
                <CardDescription>Monday 17 November @ La Rural</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="space-y-6">
                {userSignedUpEvents.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white flex-shrink-0">
                      <div className="text-xs font-bold leading-none text-center">
                        {event.time.split(' ')[0]}<br />
                        <span className="text-[10px] opacity-80">{event.time.split(' ')[1]}</span>
                      </div>
                    </div>
                    
                    {/* Event content */}
                    <div className="flex-1 min-w-0 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base text-gray-900">{event.title}</h4>
                        </div>
                        <button
                          onClick={() => openQrModal(event)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 flex items-center justify-center transition-all duration-200 group touch-manipulation"
                          title="Tap to view QR Code"
                        >
                          <QrCode className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t mt-4 space-y-3">
              <Button variant="outline" size="default" className="w-full" onClick={() => setCurrentPage('schedule')}>
                View Schedule
              </Button>
              <Button variant="outline" size="default" className="w-full" onClick={() => setCurrentPage('favorites')}>
                View favorite events
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quest Progress Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Trophy className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Quest Progress</CardTitle>
                <CardDescription>Your progress across available missions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Onboarding Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">Onboarding</span>
                  <span className="text-muted-foreground font-medium">{userData.onboardingProgress.completed}/{userData.onboardingProgress.total}</span>
                </div>
                <Progress 
                  value={(userData.onboardingProgress.completed / userData.onboardingProgress.total) * 100} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">Learn the basics</p>
              </div>
              
              {/* App Showcase Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">App Showcase</span>
                  <span className="text-muted-foreground font-medium">{userData.showcaseProgress.completed}/{userData.showcaseProgress.total}</span>
                </div>
                <Progress 
                  value={(userData.showcaseProgress.completed / userData.showcaseProgress.total) * 100} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">Explore future applications</p>
              </div>
            </div>
            
            {/* Overall Progress Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Overall Quest Progress</span>
                <span className="text-sm font-bold text-gray-900">
                  {userData.onboardingProgress.completed + userData.showcaseProgress.completed}/
                  {userData.onboardingProgress.total + userData.showcaseProgress.total}
                </span>
              </div>
              <Progress 
                value={((userData.onboardingProgress.completed + userData.showcaseProgress.completed) / 
                       (userData.onboardingProgress.total + userData.showcaseProgress.total)) * 100} 
                className="h-2 mb-2"
              />
              <p className="text-xs text-gray-600">
                Complete quests to unlock exclusive rewards and prizes!
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" size="default" className="w-full" onClick={() => setCurrentPage('quests')}>
                View Quests
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Section */}
        <div className="space-y-4">
          <div className="px-0">
            <h2 className="text-xl font-bold mb-1">Featured</h2>
            <p className="text-muted-foreground text-sm">Discover app features and event highlights</p>
          </div>
        </div>
        
        {/* Featured Carousel - Full Width */}
        <div className="-mx-6 px-6 overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
              {featuredItems.map((item, index) => {
                const handleFeatureNavigation = (title: string) => {
                  switch (title) {
                    case 'Quests':
                      setCurrentPage('quests')
                      break
                    case 'World\'s Fair':
                      setCurrentPage('fair')
                      break
                    case 'Wallet':
                      setWalletActiveSection('wallet')
                      setCurrentPage('wallet')
                      break
                    case 'Tickets':
                      setWalletActiveSection('tickets')
                      setCurrentPage('wallet')
                      break
                    case 'Schedule':
                      setCurrentPage('schedule')
                      break
                    default:
                      setCurrentPage('home')
                  }
                }
                
                return (
                  <div 
                    key={index} 
                    className="relative w-80 h-48 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => handleFeatureNavigation(item.title)}
                  >
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-90`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    </div>
  )

  // QR Modal Component
  const QRModal = () => {
    if (!qrModalOpen || !selectedQrEvent) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-sm w-full p-6 relative">
          <button
            onClick={closeQrModal}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{selectedQrEvent.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedQrEvent.time}</p>
            
            {/* QR Code placeholder - in a real app this would be a generated QR code */}
            <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-mono">{selectedQrEvent.qrCode}</p>
              </div>
            </div>
            
            <div className="text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{selectedQrEvent.location}</span>
              </div>
              {selectedQrEvent.organizer && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Organizer:</span>
                  <span className="font-medium">{selectedQrEvent.organizer}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedQrEvent.type}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Show this QR code at the event entrance
            </p>
          </div>
        </div>
      </div>
    )
  }

  const MobileNavigation = () => {
    const navItems = [
      { key: 'home', label: 'Home', icon: Home },
      { key: 'quests', label: 'Quests', icon: Sword },
      { key: 'fair', label: 'Fair', icon: Calendar },
      { key: 'wallet', label: 'Wallet', icon: Wallet },
    ] as const

    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ease-in-out ${
        isMapFocusedMode ? 'translate-y-full' : 'translate-y-0'
      }`}>
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = currentPage === key
            return (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg min-w-[64px] transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-white' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-white' : ''}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Get step info for progress tracking
  const getStepInfo = () => {
    const stepMap: Record<OnboardingStep, { step: number; title: string; canGoBack: boolean }> = {
      'auth': { step: 1, title: 'Welcome', canGoBack: false },
      'event-overview': { step: 1, title: 'Event Overview', canGoBack: true },
      'experience-level': { step: 2, title: 'Experience Level', canGoBack: true },
      'ticket-verification': { step: 3, title: 'Verify Ticket', canGoBack: true },
      'complete': { step: 4, title: 'Complete', canGoBack: false }
    }
    return stepMap[onboardingStep] || stepMap['auth']
  }

  // Render onboarding step
  const renderOnboardingStep = () => {
    const stepInfo = getStepInfo()
    
    switch (onboardingStep) {
      case 'auth':
        return <AuthScreen 
          onComplete={handleAuthComplete} 
          onSkip={handleSkipToApp}
        />
      case 'event-overview':
        return <EventOverview 
          onComplete={handleEventOverviewComplete}
          stepInfo={{ ...stepInfo, totalSteps: 3 }}
          onBack={handleBackStep}
        />
      case 'experience-level':
        return <ExperienceLevel 
          onComplete={handleExperienceLevelComplete}
          stepInfo={{ ...stepInfo, totalSteps: 3 }}
          onBack={handleBackStep}
        />
      case 'ticket-verification':
        return <TicketVerification 
          onComplete={handleTicketVerificationComplete}
          onSkip={() => setIsOnboardingComplete(true)}
          stepInfo={{ ...stepInfo, totalSteps: 3 }}
          onBack={handleBackStep}
        />
      default:
        return <AuthScreen 
          onComplete={handleAuthComplete} 
          onSkip={handleSkipToApp}
        />
    }
  }

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'quests':
        return <Quests />
      case 'schedule':
        return <Schedule 
          onNavigateBack={() => setCurrentPage('fair')} 
          favoriteEvents={favoriteEvents}
          toggleFavorite={toggleFavorite}
          onEventClick={openEventModal}
        />
      case 'fair':
        return <Fair 
          onNavigateToSchedule={() => setCurrentPage('schedule')}
          onNavigateToFavorites={() => setCurrentPage('favorites')}
          onNavigateToMap={() => setCurrentPage('map')}
          onNavigateToMapWithDistrict={handleNavigateToMapWithDistrict}
          onEventClick={openEventModal}
        />
      case 'favorites':
        return <Favorites 
          onNavigateBack={() => setCurrentPage('fair')} 
          favoriteEvents={favoriteEvents}
          toggleFavorite={toggleFavorite}
          onEventClick={openEventModal}
          onNavigateToSchedule={() => setCurrentPage('schedule')}
        />
      case 'wallet':
        return <WalletComponent 
          onNavigateToSchedule={() => setCurrentPage('schedule')} 
          initialActiveSection={walletActiveSection}
        />
      case 'map':
        return <EventMap 
          onNavigateBack={() => {
            setCurrentPage('fair')
            setMapFocusDistrict(null)
          }}
          onFocusedModeChange={setIsMapFocusedMode}
          focusDistrict={mapFocusDistrict}
        />
      default:
        return <HomePage />
    }
  }

  // If onboarding is not complete, show onboarding flow
  if (!isOnboardingComplete) {
    return renderOnboardingStep()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Content */}
      {renderCurrentPage()}
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onUndo={toastAction ? handleUndoToast : undefined}
        />
      )}
      
      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        favoriteEvents={favoriteEvents}
        toggleFavorite={toggleFavorite}
      />
      
      {/* QR Modal */}
      <QRModal />
    </div>
  )
}

export default App
