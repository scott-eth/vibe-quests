import React, { useState } from 'react'
import { GraduationCap, Zap, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import OnboardingHeader from './OnboardingHeader'

interface StepInfo {
  step: number
  title: string
  canGoBack: boolean
  totalSteps: number
}

interface ExperienceLevelProps {
  onComplete: (level: 'beginner' | 'experienced') => void
  stepInfo: StepInfo
  onBack: () => void
}

const ExperienceLevel: React.FC<ExperienceLevelProps> = ({ onComplete, stepInfo, onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'experienced' | null>(null)

  const handleSelection = (level: 'beginner' | 'experienced') => {
    setSelectedLevel(level)
  }

  const handleContinue = () => {
    if (selectedLevel) {
      onComplete(selectedLevel)
    }
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
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-24">
          <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Let's get your app set up!
              </h1>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Select your experience level below to personalize your World's Fair app:
              </p>
            </div>

            {/* Experience Level Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Beginner Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedLevel === 'beginner' 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelection('beginner')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 relative">
                <div className={`p-3 rounded-full transition-colors ${
                  selectedLevel === 'beginner' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <GraduationCap className="h-6 w-6" />
                </div>
                {selectedLevel === 'beginner' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">I'm a Beginner</CardTitle>
              <CardDescription className="text-sm">
                New to Ethereum and Web3
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      <strong>Beginner Mode:</strong> You'll see additional explanations, tooltips, and guidance in-app.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experienced Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedLevel === 'experienced' 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelection('experienced')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 relative">
                <div className={`p-3 rounded-full transition-colors ${
                  selectedLevel === 'experienced' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  <Zap className="h-6 w-6" />
                </div>
                {selectedLevel === 'experienced' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">I'm Experienced</CardTitle>
              <CardDescription className="text-sm">
                Familiar with Ethereum, Web3, and DeFi
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-purple-800">
                      <strong>Streamlined experience:</strong> You'll see the core features of the app only.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>



            {/* Help Text */}
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                You can change Experience level settings at any time in your Profile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Continue Button - Only shows when selection is made */}
      {selectedLevel && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="w-full max-w-3xl mx-auto">
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full py-3 text-lg"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExperienceLevel