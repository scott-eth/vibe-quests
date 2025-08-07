import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Users, MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import OnboardingHeader from './OnboardingHeader'

interface StepInfo {
  step: number
  title: string
  canGoBack: boolean
  totalSteps: number
}

interface EventOverviewProps {
  onComplete: () => void
  stepInfo: StepInfo
  onBack: () => void
}

const EventOverview: React.FC<EventOverviewProps> = ({ onComplete, stepInfo, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const eventInfo = [
    { icon: Calendar, label: "Nov 17–22, 2025", subtitle: "6 Days" },
    { icon: MapPin, label: "Buenos Aires, Argentina", subtitle: "+ Virtual" },
    { icon: Users, label: "15,000+ Attendees", subtitle: "Worldwide" }
  ]

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
      title: "Welcome to Devconnect ARG",
      body: "Join thousands of developers, builders, and innovators from around the globe as we explore the world built on Ethereum."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", 
      title: "The first Ethereum World's Fair",
      body: "Discover interactive booths, hands-on workshops, and cutting-edge demos throughout the Ethereum World's Fair. Engage with the latest protocols, tools, and applications that are transforming how we build and interact in the Ethereum ecosystem."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
      title: "Complete quests & earn real rewards",
      body: "Take part in our quest system as you explore the World's Fair. Complete challenges, attend sessions, and engage with exhibitors to earn exclusive NFTs, and unlock special experiences throughout your Devconnect ARG journey."
    }
  ]

  const nextSlide = () => {
    setShowSwipeHint(false)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
    
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    setShowSwipeHint(false)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
    
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const isLastSlide = currentSlide === slides.length - 1

  // Auto-scroll is now handled by CSS animation

  // Swipe handlers
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide()
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <OnboardingHeader
        currentStep={stepInfo.step}
        totalSteps={stepInfo.totalSteps}
        stepTitle={stepInfo.title}
        onBack={stepInfo.canGoBack ? onBack : undefined}
        canGoBack={stepInfo.canGoBack}
      />
      
      {/* Event Info Header - Auto-scrolling */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 overflow-hidden relative">
        <div className="flex gap-8 animate-scroll whitespace-nowrap">
          {/* Triple the items for seamless infinite loop */}
          {[...eventInfo, ...eventInfo, ...eventInfo].map((info, index) => (
            <div key={index} className="flex items-center gap-3 flex-shrink-0 px-6">
              <div className="p-2 bg-white/20 rounded-lg">
                <info.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{info.label}</p>
                <p className="text-xs text-white/80">{info.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Takes remaining height */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full justify-center">
          {/* Progress Indicators & Swipe Hint */}
          <div className="flex flex-col items-center mb-8 space-y-3">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-500' 
                      : index < currentSlide 
                        ? 'bg-blue-200' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            {/* Swipe Hint */}
            {showSwipeHint && (
              <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
                <ArrowLeft className="h-4 w-4" />
                <span>Swipe to navigate</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>

          {/* Main Content Card */}
          <Card 
            ref={cardRef}
            className={`overflow-hidden flex-1 flex flex-col cursor-grab active:cursor-grabbing select-none ${
              isTransitioning ? 'opacity-95 scale-[0.99]' : 'opacity-100 scale-100'
            } transition-all duration-300 ease-out`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative flex-1 flex flex-col">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <CardContent className="p-6 flex-1 flex flex-col justify-center">
                <div className="text-center space-y-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
                    {slides[currentSlide].body}
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation - Fixed at bottom */}
      <div className="p-6 bg-white border-t">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
            size="lg"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={nextSlide}
            className="flex items-center justify-center gap-2 flex-1"
            size="lg"
          >
            {isLastSlide ? 'Continue' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventOverview