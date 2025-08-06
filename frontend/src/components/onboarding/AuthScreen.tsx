import React, { useState } from 'react'
import { Mail, Wallet, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthScreenProps {
  onComplete: (method: 'email' | 'wallet', data: { email?: string; address?: string }) => void
  onSkip: () => void
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete, onSkip }) => {
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
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
    
    onComplete('email', { email })
  }

  const handleWalletConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnecting(false)
    
    // Simulate connected wallet address
    const mockAddress = '0x742d35Cc2C1E8d8b7E6e7EAE4C30Bd0BA4b5f8f2'
    onComplete('wallet', { address: mockAddress })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Devconnect ARG</h1>
            <p className="text-white/80">Sign in to continue to your event experience</p>
          </div>

          {/* Auth Options */}
          <div className="space-y-4">
          {/* Email Option */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Continue with Email</CardTitle>
                  <CardDescription>Enter your email address to get started</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
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
                      Signing in...
                    </>
                  ) : (
                    'Continue with Email'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-white/80 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                or
              </span>
            </div>
          </div>

          {/* Wallet Option */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Connect Wallet</CardTitle>
                  <CardDescription>Connect your Web3 wallet to continue</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleWalletConnect}
                disabled={isConnecting}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Connecting Wallet...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

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