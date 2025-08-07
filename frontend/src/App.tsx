import { useState, useEffect } from 'react'
import { 
  Home, 
  Sword, 
  Calendar, 
  Wallet, 
  Trophy, 
  MapPin,
  Users,
  ArrowRight
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Quests from '@/components/Quests'
import Fair from '@/components/Fair'
import WalletComponent from '@/components/Wallet'
import Schedule from '@/components/Schedule'
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
  const [currentPage, setCurrentPage] = useState<'home' | 'quests' | 'fair' | 'wallet' | 'schedule' | 'favorites'>('home')
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('auth')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [favoriteEvents, setFavoriteEvents] = useState<Set<number>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastAction, setToastAction] = useState<(() => void) | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

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

  const userSignedUpEvents = [
    { time: "10:00 AM", title: "Welcome Keynote", location: "Main Stage", status: "attending", type: "keynote" },
    { time: "2:00 PM", title: "DeFi Deep Dive Workshop", location: "DeFi Pavilion", status: "attending", type: "workshop" },
    { time: "4:30 PM", title: "Networking Break", location: "Community Lounge", status: "attending", type: "social" },
    { time: "6:00 PM", title: "Closing Ceremony", location: "Main Stage", status: "attending", type: "ceremony" }
  ]

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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Your schedule</CardTitle>
                <CardDescription>Monday 17 November</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="space-y-6">
                {userSignedUpEvents.map((event, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white flex-shrink-0">
                      <div className="text-xs font-bold leading-none text-center">
                        {event.time.split(' ')[0]}<br />
                        <span className="text-[10px] opacity-80">{event.time.split(' ')[1]}</span>
                      </div>
                    </div>
                    
                    {/* Event content */}
                    <div className="flex-1 min-w-0 pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-base text-gray-900">{event.title}</h4>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setCurrentPage('fair')}>
                View All Events <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quest Progress Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Quest Progress</CardTitle>
                <CardDescription>Your progress across available missions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Onboarding Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Onboarding</span>
                  <span className="text-muted-foreground">{userData.onboardingProgress.completed}/{userData.onboardingProgress.total}</span>
                </div>
                <Progress 
                  value={(userData.onboardingProgress.completed / userData.onboardingProgress.total) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">Learn the basics</p>
              </div>
              
              {/* App Showcase Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">App Showcase</span>
                  <span className="text-muted-foreground">{userData.showcaseProgress.completed}/{userData.showcaseProgress.total}</span>
                </div>
                <Progress 
                  value={(userData.showcaseProgress.completed / userData.showcaseProgress.total) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">Explore future applications</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setCurrentPage('quests')}>
                View All <ArrowRight className="h-4 w-4 ml-1" />
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
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 w-max">
              {featuredItems.map((item, index) => (
                <div key={index} className="relative w-80 h-48 rounded-xl overflow-hidden flex-shrink-0">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Navigation Component
  const MobileNavigation = () => {
    const navItems = [
      { key: 'home', label: 'Home', icon: Home },
      { key: 'quests', label: 'Quests', icon: Sword },
      { key: 'fair', label: 'Fair', icon: Calendar },
      { key: 'wallet', label: 'Wallet', icon: Wallet },
    ] as const

    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
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
        return <WalletComponent />
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
    </div>
  )
}

export default App
