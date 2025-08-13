import React, { useState, useEffect } from 'react'
import { Mail, Check, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import OnboardingHeader from './OnboardingHeader'

interface StepInfo {
  step: number
  title: string
  canGoBack: boolean
  totalSteps: number
}

interface TicketVerificationProps {
  onComplete: (method: 'zupass' | 'email', verified: boolean) => void
  onSkip?: () => void
  stepInfo: StepInfo
  onBack: () => void
  userEmail: string // Email from onboarding flow
}

const TicketVerification: React.FC<TicketVerificationProps> = ({ onComplete, onSkip, stepInfo, onBack, userEmail }) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  // Pre-populate email from onboarding flow
  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail)
      setIsValidEmail(validateEmail(userEmail))
    }
  }, [userEmail])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValidEmail(validateEmail(value))
  }

  const handleClearEmail = () => {
    setEmail('')
    setIsValidEmail(false)
  }

  const handleVerification = async (method: 'zupass' | 'email') => {
    if (method === 'email' && !isValidEmail) return
    
    setIsVerifying(true)
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setIsVerifying(false)
    onComplete(method, true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingHeader
        currentStep={stepInfo.step}
        totalSteps={stepInfo.totalSteps}
        stepTitle={stepInfo.title}
        onBack={stepInfo.canGoBack ? onBack : undefined}
        canGoBack={stepInfo.canGoBack}
      />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
                    {/* Header */}
          <div className="text-left mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verify your ticket
            </h1>
            <p className="text-base text-gray-600">
             Enter the email used to order your Devconnect ticket
            </p>
          </div>

          {/* Email Verification Form */}
          <div className="space-y-6 mb-8">
            {/* Main body copy */}
            

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 text-left">
                Devconnect registration email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your registration email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {email && (
                    <button
                      onClick={handleClearEmail}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      type="button"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                  {isValidEmail && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Email verification</p>
                  <p className="text-sm text-blue-600">
                    We'll use this to check our registration records and add all associated ticket data into your app.
                  </p>
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <Button 
              onClick={() => handleVerification('email')}
              disabled={!isValidEmail || isVerifying}
              className="w-full"
              size="lg"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying Email...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Verify Email
                </>
              )}
            </Button>
          </div>

          {/* Skip Option */}
          {onSkip && (
            <div className="text-center mb-6">
              <Button 
                variant="ghost" 
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip verification for now
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm font-semibold text-yellow-800">Need help?</p>
              </div>
              <p className="text-sm text-yellow-700">
                Contact our support team if you're having trouble verifying your ticket.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketVerification