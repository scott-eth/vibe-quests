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
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Devconnect!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let's customize your World's Fair app experience. Select your experience level:
            </p>
          </div>

        {/* Experience Level Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Beginner Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedLevel === 'beginner' 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelection('beginner')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className={`p-4 rounded-full transition-colors ${
                  selectedLevel === 'beginner' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <GraduationCap className="h-8 w-8" />
                </div>
                {selectedLevel === 'beginner' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl">I'm a Beginner</CardTitle>
              <CardDescription className="text-base">
                I'm new to Ethereum and Web3
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-base text-gray-700">
                    <strong>Beginner Mode:</strong> You'll see additional explanations, tooltips, and guidance in-app.
                  </p>
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
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className={`p-4 rounded-full transition-colors ${
                  selectedLevel === 'experienced' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  <Zap className="h-8 w-8" />
                </div>
                {selectedLevel === 'experienced' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl">I'm Experienced</CardTitle>
              <CardDescription className="text-base">
                I'm familiar with Ethereum, Web3, and DeFi
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-base text-gray-700">
                    <strong>Streamlined experience:</strong> You'll see the core features of the app only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedLevel}
            size="lg"
            className="px-12 py-3 text-lg"
          >
            Continue
          </Button>
          
          {selectedLevel && (
            <p className="text-lg text-gray-600 mt-4">
              You selected: <span className="font-semibold capitalize text-gray-900">{selectedLevel}</span>
              {selectedLevel === 'beginner' && (
                <span className="text-blue-600 font-medium"></span>
              )}
            </p>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-10 p-6 bg-gray-50 rounded-xl">
          <p className="text-base text-gray-600">
            You can change Experience level settings at any time in your Profile.
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceLevel