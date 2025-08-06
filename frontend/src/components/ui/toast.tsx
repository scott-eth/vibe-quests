import React, { useState, useEffect } from 'react'
import { Button } from './button'

interface ToastProps {
  message: string
  onUndo?: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onUndo }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Slide in immediately
    setIsVisible(true)
    
    // Start slide out after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 flex justify-center pointer-events-none">
      <div 
        className={`bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm w-full flex items-center justify-between transition-all duration-300 ease-out pointer-events-auto ${
          isVisible 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform translate-y-full opacity-0'
        }`}
      >
        <span className="text-sm font-medium">{message}</span>
        {onUndo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            className="text-blue-400 hover:text-blue-300 hover:bg-gray-800 ml-2 h-auto py-1 px-2"
          >
            UNDO
          </Button>
        )}
      </div>
    </div>
  )
}

export default Toast