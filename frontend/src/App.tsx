import { useState } from 'react'
import { Home, Sword } from 'lucide-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import Quests from '@/components/Quests'

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState<'home' | 'quests'>('home')

  const HomePage = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="h-24 w-24 animate-spin" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-foreground mb-8">
        Vite + React + Tailwind + Shadcn/UI
      </h1>
      
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border mb-8">
        <div className="flex gap-4 mb-6">
          <Button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
          <Button variant="outline" onClick={() => setCount(0)}>
            Reset
          </Button>
          <Button variant="secondary" onClick={() => setCount(count + 10)}>
            +10
          </Button>
        </div>
        
        <p className="text-muted-foreground text-center">
          Edit <code className="bg-muted px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Button onClick={() => setCurrentPage('quests')} size="lg" className="flex items-center gap-2">
          <Sword className="h-5 w-5" />
          View Quests Page
        </Button>
      </div>
      
      <p className="text-muted-foreground text-center max-w-md">
        This project is set up with React, Vite, Tailwind CSS, and Shadcn/UI components.
        Click the buttons above to test the functionality or explore the Quests page!
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                <img src={reactLogo} className="h-6 w-6" alt="Logo" />
              </div>
              <h2 className="text-xl font-bold">Quest App</h2>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button
                variant={currentPage === 'quests' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('quests')}
                className="flex items-center gap-2"
              >
                <Sword className="h-4 w-4" />
                Quests
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === 'home' ? <HomePage /> : <Quests />}
    </div>
  )
}

export default App
