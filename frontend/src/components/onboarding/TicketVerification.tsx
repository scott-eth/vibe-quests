import React, { useState } from 'react'
import { Ticket, Mail, Check, Loader2 } from 'lucide-react'
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
}

const TicketVerification: React.FC<TicketVerificationProps> = ({ onComplete, onSkip, stepInfo, onBack }) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValidEmail(validateEmail(value))
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
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Ticket className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verify your ticket
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Confirm your Devconnect ticket ownership to unlock in-app experiences and exclusive content.
            </p>
          </div>

          {/* Email Verification Form */}
          <div className="space-y-6 mb-8">
            {/* Main body copy */}
            <p className="text-base text-gray-600 text-center">
              Enter the email address used for your Devconnect ARG registration
            </p>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Devconnect ARG Registration Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your registration email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                {isValidEmail && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Email Verification</p>
                  <p className="text-sm text-blue-600">
                    We'll check this email against our Devconnect ARG registration records
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
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Need help?</strong> Contact our support team if you're having trouble verifying your ticket.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketVerification