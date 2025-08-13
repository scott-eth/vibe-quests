import React, { useState } from 'react'
import { Wallet, Plus, Link, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface WalletChoiceScreenProps {
  onComplete: (choice: 'create' | 'connect', data?: { address?: string }) => void
}

const WalletChoiceScreen: React.FC<WalletChoiceScreenProps> = ({ onComplete }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleCreateWallet = async () => {
    setIsCreating(true)
    // Simulate wallet creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsCreating(false)
    
    onComplete('create')
  }

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnecting(false)
    
    // Simulate connected wallet address
    const mockAddress = '0x742d35Cc2C1E8d8b7E6e7EAE4C30Bd0BA4b5f8f2'
    onComplete('connect', { address: mockAddress })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Set up your wallet</h1>
          <p className="text-white/80">Select an option below to get started</p>
        </div>

        {/* Wallet Options */}
        <div className="space-y-4">
          {/* Create New Wallet */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Plus className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Create a wallet for me</CardTitle>
                  <CardDescription>Wallets are an address that you own and are used to interact onchain. We'll create one for you.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-800">Recommended for beginners</p>
                    <p className="text-xs text-green-700">You can use your wallet to buy discounted food and drinks, receive rewards for completing quests, and more!</p>
                  </div>
                </div>
                <Button 
                  onClick={handleCreateWallet}
                  disabled={isCreating || isConnecting}
                  className="w-full"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating wallet...
                    </>
                  ) : (
                    'Create my wallet'
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
              <span className="px-2 text-white/80 bg-transparent">
                OR
              </span>
            </div>
          </div>

          {/* Connect Existing Wallet */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Link className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Connect an existing wallet</CardTitle>
                  <CardDescription>Link a wallet via WalletConnect</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting || isCreating}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Connecting wallet...
                    </>
                  ) : (
                    'Connect existing wallet'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  )
}

export default WalletChoiceScreen
