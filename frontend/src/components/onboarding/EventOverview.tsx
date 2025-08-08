import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)



  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
      title: "Welcome to Devconnect ARG: the first Ethereum World's Fair",
      body: "You're joining thousands of builders, developers, enthusiasts, and innovators from around the globe as we explore the city of the future, built on Ethereum."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", 
      title: "The World's Fair",
      body: "From Nov 17 — Nov 22, the iconic venue of La Rural will be transformed to showcase the city of the future, built on Ethereum. Discover cutting-edge Ethereum applications across venue districts like Onboarding (Wallets), Decentralized Finance (DeFi), Gaming, AI, Social and more!"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
      title: "Complete Quests to earn real rewards!",
      body: "Take part in our dedicated quest system to help you discover the World's Fair. Interact with the expansive App Showcase and engage with the Ethereum community to earn exclusive NFTs, SWAG, Merch and more!"
    }
  ]

  const nextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
    
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
    
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingHeader
        currentStep={stepInfo.step}
        totalSteps={stepInfo.totalSteps}
        stepTitle={stepInfo.title}
        onBack={stepInfo.canGoBack ? onBack : undefined}
        canGoBack={stepInfo.canGoBack}
      />
      


      {/* Main Content - Takes remaining height with bottom padding for mobile sticky buttons */}
      <div className="flex-1 flex flex-col px-4 py-8 pb-24 md:pb-8">
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
          {/* Main Content - No Card */}
          <div 
            ref={cardRef}
            className={`overflow-hidden flex-1 flex flex-col ${
              isTransitioning ? 'opacity-95 scale-[0.99]' : 'opacity-100 scale-100'
            } transition-all duration-300 ease-out`}
          >
            <div className="relative flex-1 flex flex-col">
              {/* Image */}
              <div className="px-6 mb-6">
                <div className="relative h-64 overflow-hidden rounded-xl">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Content - Left aligned and underneath image */}
              <div className="px-6 flex-1">
                <div className="text-left space-y-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {slides[currentSlide].body}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Progress Indicators & Swipe Hint - Fixed above navigation */}
      <div className="flex flex-col items-center py-4 bg-white space-y-3">
        <div className="flex gap-2 items-center justify-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'h-3 w-3 bg-slate-800' 
                  : index < currentSlide 
                    ? 'h-2 w-2 bg-slate-300' 
                    : 'h-2 w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation - Sticky at bottom on mobile, normal on desktop */}
      <div className="fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto p-6 bg-white border-t">
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