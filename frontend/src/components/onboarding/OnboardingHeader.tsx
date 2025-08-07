import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OnboardingHeaderProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
  onBack?: () => void
  canGoBack?: boolean
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  onBack,
  canGoBack = false
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Top Row: Back button, Title, and Step counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            {canGoBack ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div className="w-16 flex-shrink-0" />
            )}
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-base font-medium text-gray-900">{stepTitle}</h1>
          </div>
          
          <div className="flex-1 flex justify-end">
          </div>
        </div>

        {/* Stepped Progress Bar */}
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-sm transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-blue-500' 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OnboardingHeader