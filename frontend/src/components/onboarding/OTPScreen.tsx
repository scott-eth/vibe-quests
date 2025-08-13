import React, { useState, useRef, useEffect } from 'react'
import { Mail, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface OTPScreenProps {
  email: string
  onComplete: () => void
  onBack: () => void
}

const OTPScreen: React.FC<OTPScreenProps> = ({ email, onComplete, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Countdown for resend cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take the last digit
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits are entered
    if (newOtp.every(digit => digit !== '') && value) {
      handleVerifyOtp(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async (otpCode?: string) => {
    const codeToVerify = otpCode || otp.join('')
    if (codeToVerify.length !== 6) return

    setIsVerifying(true)
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsVerifying(false)
    
    onComplete()
  }

  const handleResendCode = async () => {
    setIsResending(true)
    // Simulate resending code
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsResending(false)
    setResendCooldown(60) // 60 second cooldown
    
    // Clear current OTP
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  const isOtpComplete = otp.every(digit => digit !== '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-white/80 mb-1">We sent a verification code to</p>
          <p className="text-white font-medium">{email}</p>
        </div>

        {/* OTP Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center">Enter verification code</CardTitle>
            <CardDescription className="text-center">Enter the 6-digit code from your email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* OTP Input Grid */}
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el
                      }
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={isVerifying}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button 
                onClick={() => handleVerifyOtp()}
                disabled={!isOtpComplete || isVerifying}
                className="w-full"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Didn't receive the code?</p>
                <Button 
                  variant="ghost" 
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isResending}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    `Resend code in ${resendCooldown}s`
                  ) : (
                    'Resend code'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to email entry
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OTPScreen
