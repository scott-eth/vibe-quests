import React, { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthScreenProps {
  onComplete: (email: string) => void
  onSkip: () => void
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete, onSkip }) => {
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValidEmail(validateEmail(value))
  }

  const handleEmailSubmit = async () => {
    if (!isValidEmail) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    
    onComplete(email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Devconnect ARG</h1>
            <p className="text-white/80">The first Ethererum World's Fair</p>
          </div>

          {/* Email Entry */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Enter your email to get started</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
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
                <Button 
                  onClick={handleEmailSubmit}
                  disabled={!isValidEmail || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending verification code...
                    </>
                  ) : (
                    'Get started'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 space-y-4">
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Skip to Dashboard
            </Button>
            <p className="text-white/60 text-sm">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen