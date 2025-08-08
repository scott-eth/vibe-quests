import React, { useState } from 'react'
import { 
  Wallet, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  EyeOff, 
  Copy, 
  User,
  Settings,
  Trophy,
  Shield,
  ChevronRight,
  Star,
  Target,
  Zap,
  QrCode,
  Ticket,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  MapPin,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const WalletComponent: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true)
  const [activeSection, setActiveSection] = useState<'profile' | 'wallet' | 'tickets' | 'collections' | 'settings'>('wallet')
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [settingsSubPage, setSettingsSubPage] = useState<string | null>(null)
  const [previousSection, setPreviousSection] = useState<'profile' | 'wallet' | 'tickets' | 'collections' | 'settings' | null>(null)
  const [walletSubPage, setWalletSubPage] = useState<'send' | 'receive' | null>(null)

  // Mock user data
  const userData = {
    name: "Alex Thompson",
    displayName: "alextee.eth",
    email: "alex@example.com",
    walletAddress: "0x742d35Cc6b1D4A7d8C8e5A9c",
    totalRewards: 1247.83,
    questsCompleted: 12,
    collectionsOwned: 3,
    profileCompleteness: 85
  }

  const mockTransactions = [
    {
      id: '1',
      type: 'received',
      amount: '+0.05',
      currency: 'ETH',
      from: '0x8ba1...f25a',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'sent',
      amount: '-12.50',
      currency: 'USDC',
      to: 'Coffee Shop',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'sent',
      amount: '-8.75',
      currency: 'USDT',
      to: 'Food Truck',
      timestamp: '2 days ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'received',
      amount: '+0.02',
      currency: 'ETH',
      from: '0x3c2d...9b8e',
      timestamp: '3 days ago',
      status: 'completed'
    }
  ]



  const collectionsData = {
    poaps: [
      {
        id: 1,
        name: "DevConnect Opening Ceremony",
        description: "Attended the opening ceremony",
        image: "https://images.unsplash.com/photo-1558618047-fd930336c4c0?w=80&h=80&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Workshop: DeFi Deep Dive",  
        description: "Completed DeFi workshop",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=80&auto=format&fit=crop"
      }
    ],
    nfts: [
      {
        id: 3,
        name: "Ethereum Genesis",
        description: "Limited edition NFT artwork",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=80&h=80&auto=format&fit=crop"
      },
      {
        id: 4,
        name: "Web3 Builder",
        description: "Community builder recognition",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&auto=format&fit=crop"
      }
    ],
    swag: [
      {
        id: 5,
        name: "DevConnect T-Shirt",
        description: "Official event merchandise",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&auto=format&fit=crop"
      },
      {
        id: 6,
        name: "Ethereum Sticker Pack",
        description: "Collection of branded stickers",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=80&h=80&auto=format&fit=crop"
      }
    ],
    vouchers: [
      {
        id: 7,
        name: "Coffee Shop Voucher",
        description: "$10 credit at event cafe",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&h=80&auto=format&fit=crop"
      },
      {
        id: 8,
        name: "Food Truck Discount",
        description: "20% off next purchase",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&auto=format&fit=crop"
      }
    ]
  }

  // Profile Section Component
  const ProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {userData.displayName.split('.')[0].slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{userData.displayName}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setPreviousSection('profile')
                setActiveSection('settings')
                setSettingsSubPage('edit-profile')
              }}
            >
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Completeness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Profile Completeness
          </CardTitle>
          <CardDescription>
            Complete your profile to unlock more features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{userData.profileCompleteness}%</span>
            </div>
            <Progress value={userData.profileCompleteness} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Add a profile picture and bio to reach 100%
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  )

  // Receive Screen Component
  const ReceiveScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setWalletSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Receive Crypto</h2>
      </div>

      {/* QR Code Section */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">Your Wallet Address</CardTitle>
          <CardDescription>
            Share this QR code or address to receive payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Large QR Code */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <QrCode className="h-32 w-32 text-gray-400 mx-auto mb-4" />
                <p className="text-xs text-gray-500 font-mono break-all px-4">
                  {userData.walletAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Address Display */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm font-medium mb-2">Wallet Address</p>
            <div className="flex items-center justify-between bg-white p-3 rounded border">
              <p className="text-sm font-mono text-gray-700 flex-1 break-all mr-3">
                {userData.walletAddress}
              </p>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* Network Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-sm font-medium text-blue-800">Ethereum Network</p>
            </div>
            <p className="text-xs text-blue-600 text-center">
              Only send ETH and ERC-20 tokens to this address
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy Address
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Share QR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">Security Notice</p>
              <p className="text-xs text-yellow-700">
                Never share your private key or recovery phrase. Only share this address to receive payments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Send Screen Component
  const SendScreen = () => {
    const [sendAmount, setSendAmount] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [selectedAsset, setSelectedAsset] = useState('ETH')
    const [gasPrice, setGasPrice] = useState('standard')
    const [showConfirmation, setShowConfirmation] = useState(false)

    const gasPrices = {
      slow: { price: '15', time: '5-10 min', cost: '$2.50' },
      standard: { price: '20', time: '2-5 min', cost: '$3.20' },
      fast: { price: '30', time: '< 2 min', cost: '$4.80' }
    }

    const handleSendTransaction = () => {
      setShowConfirmation(true)
    }

    const confirmTransaction = () => {
      // Transaction logic would go here
      setShowConfirmation(false)
      setWalletSubPage(null)
      // Show success toast or modal
    }

    if (showConfirmation) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowConfirmation(false)}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <h2 className="text-xl font-semibold">Confirm Transaction</h2>
          </div>

          {/* Transaction Preview */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
              <CardDescription>Review your transaction before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sending</span>
                  <span className="text-sm font-medium">{sendAmount} {selectedAsset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">To</span>
                  <span className="text-sm font-mono">{recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Network Fee</span>
                  <span className="text-sm font-medium">{gasPrices[gasPrice as keyof typeof gasPrices].cost}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{sendAmount} {selectedAsset} + {gasPrices[gasPrice as keyof typeof gasPrices].cost}</span>
                </div>
              </div>

              {/* Security Warning */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">⚠️ Transaction Warning</p>
                    <p className="text-xs text-red-700">
                      This transaction cannot be reversed. Please verify the recipient address carefully.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={confirmTransaction} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Confirm & Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setWalletSubPage(null)}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <h2 className="text-xl font-semibold">Send Crypto</h2>
        </div>

        {/* Asset Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAsset === 'ETH' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                   onClick={() => setSelectedAsset('ETH')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">ETH</p>
                    <p className="text-sm text-gray-500">$1,247.83</p>
                  </div>
                </div>
              </div>
              <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAsset === 'USDC' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                   onClick={() => setSelectedAsset('USDC')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    UC
                  </div>
                  <div>
                    <p className="font-medium">USDC</p>
                    <p className="text-sm text-gray-500">$500.00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipient Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recipient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Wallet Address or ENS Name</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x... or name.eth"
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
                <Button variant="outline" size="sm" className="px-3">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Amount to Send</label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 text-sm">
                  Max
                </Button>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-3 pr-16 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  {selectedAsset}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                ≈ ${(parseFloat(sendAmount) * (selectedAsset === 'ETH' ? 2500 : 1) || 0).toFixed(2)} USD
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gas Fee Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Network Fee</CardTitle>
            <CardDescription>Higher fees result in faster transaction confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(gasPrices).map(([speed, details]) => (
                <div 
                  key={speed}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${gasPrice === speed ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setGasPrice(speed)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium capitalize">{speed}</p>
                      <p className="text-sm text-gray-500">{details.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{details.cost}</p>
                      <p className="text-sm text-gray-500">{details.price} gwei</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Send Button */}
        <Button 
          onClick={handleSendTransaction}
          disabled={!sendAmount || !recipientAddress}
          className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          Review Transaction
        </Button>
      </div>
    )
  }

  // Wallet Section Component
  const WalletSection = () => {
    // Show sub-screens if selected
    if (walletSubPage === 'send') return <SendScreen />
    if (walletSubPage === 'receive') return <ReceiveScreen />

    // Show main wallet page
    return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Total Balance</p>
              <div className="text-3xl font-bold">
                {showBalance ? `$${userData.totalRewards.toFixed(2)}` : '••••••'}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20"
            >
              {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Button 
              variant="secondary" 
              className="flex flex-col gap-1 h-auto py-3 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => setWalletSubPage('send')}
            >
              <Send className="h-4 w-4" />
              <span className="text-xs">Send</span>
            </Button>
            <Button 
              variant="secondary" 
              className="flex flex-col gap-1 h-auto py-3 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => setWalletSubPage('receive')}
            >
              <ArrowDownLeft className="h-4 w-4" />
              <span className="text-xs">Receive</span>
            </Button>
            <Button className="flex flex-col gap-1 h-auto py-3 bg-white hover:bg-white/90 text-blue-600 border-0 font-medium">
              <QrCode className="h-4 w-4" />
              <span className="text-xs">Scan QR</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Onramp Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Exchange ARS/USD for Crypto</CardTitle>
          <CardDescription>
            Fund your Ethereum wallet to buy discounted food and drinks at the World's Fair! There are two ways to add money to your wallet:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="flex flex-col gap-2 h-auto py-4 bg-blue-600 hover:bg-blue-700">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">Exchange digitally</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Exchange in-person</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Address */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Wallet Address</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {userData.walletAddress}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets and Activity Tabs */}
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ETH
                  </div>
                  <div>
                    <p className="font-medium">Ethereum</p>
                    <p className="text-sm text-muted-foreground">ETH</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">0.425 ETH</p>
                  <p className="text-sm text-muted-foreground">$892.50</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    USDC
                  </div>
                  <div>
                    <p className="font-medium">USD Coin</p>
                    <p className="text-sm text-muted-foreground">USDC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">355.33 USDC</p>
                  <p className="text-sm text-muted-foreground">$355.33</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    USDT
                  </div>
                  <div>
                    <p className="font-medium">Tether USD</p>
                    <p className="text-sm text-muted-foreground">USDT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">89.47 USDT</p>
                  <p className="text-sm text-muted-foreground">$89.47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tx.type === 'received' ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm ${
                      tx.type === 'received' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.amount} {tx.currency}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
  }

  // Collections Section Component
  const CollectionsSection = () => {
    const renderCollectionSection = (title: string, items: any[], icon: React.ReactNode, description: string) => (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )

    return (
      <div className="space-y-6">
        {renderCollectionSection(
          "POAPs", 
          collectionsData.poaps, 
          <Star className="h-5 w-5 text-purple-600" />,
          "Proof of Attendance Protocol tokens"
        )}
        
        {renderCollectionSection(
          "NFTs", 
          collectionsData.nfts, 
          <Zap className="h-5 w-5 text-purple-600" />,
          "Digital art and collectibles"
        )}
        
        {renderCollectionSection(
          "Swag", 
          collectionsData.swag, 
          <Trophy className="h-5 w-5 text-purple-600" />,
          "Physical merchandise and items"
        )}
        
        {renderCollectionSection(
          "Vouchers", 
          collectionsData.vouchers, 
          <Target className="h-5 w-5 text-purple-600" />,
          "Redeemable credits and discounts"
        )}
      </div>
    )
  }

  // Tickets Section Component  
  const TicketsSection = () => {
    const [expandedDays, setExpandedDays] = useState<string[]>([])

    const toggleDay = (day: string) => {
      setExpandedDays(prev => 
        prev.includes(day) 
          ? prev.filter(d => d !== day)
          : [...prev, day]
      )
    }

    // Helper function to parse time and convert to minutes for sorting
    const parseTimeToMinutes = (timeString: string) => {
      const timeMatch = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!timeMatch) return 0
      
      let [, hours, minutes, period] = timeMatch
      let totalMinutes = parseInt(hours) * 60 + parseInt(minutes)
      
      if (period.toUpperCase() === 'PM' && hours !== '12') {
        totalMinutes += 12 * 60
      } else if (period.toUpperCase() === 'AM' && hours === '12') {
        totalMinutes -= 12 * 60
      }
      
      return totalMinutes
    }

    // Helper function to sort events by start time
    const sortEventsByTime = (events: any[]) => {
      return [...events].sort((a, b) => {
        const timeA = parseTimeToMinutes(a.time)
        const timeB = parseTimeToMinutes(b.time)
        return timeA - timeB
      })
    }

    // Event data organized by days - matching actual calendar events
    const eventsByDay = {
      'Monday 17 Nov': [
        {
          id: 3,
          name: 'Opening Ceremony',
          time: '9:00 AM - 10:00 AM',
          location: 'Main Stage',
          description: 'Kick-off presentation with keynote speakers',
          organizer: 'EF TEAM',
          type: 'Core',
          qrCode: 'QR-OPENING-CEREMONY-001'
        },
        {
          id: 2,
          name: 'Ethereum Day',
          time: '10:00 AM - 6:00 PM',
          location: 'La Rural',
          description: 'The main Ethereum Foundation presentation day with core protocol updates',
          organizer: 'ETHEREUM FOUNDATION',
          type: 'Core',
          qrCode: 'QR-ETHEREUM-DAY-002'
        },
        {
          id: 4,
          name: 'DeFi Workshop Series',
          time: '2:00 PM - 5:00 PM',
          location: 'Workshop Hall',
          description: 'Deep dive into DeFi protocols and development',
          organizer: 'AAVE TEAM',
          type: 'Partner',
          qrCode: 'QR-DEFI-WORKSHOP-003'
        }
      ],
      'Tuesday 18 Nov': [
        {
          id: 8,
          name: 'Layer 2 Summit',
          time: '1:00 PM - 6:00 PM',
          location: 'Summit Hall',
          description: 'Comprehensive coverage of Layer 2 scaling solutions',
          organizer: 'POLYGON TEAM',
          type: 'Partner',
          qrCode: 'QR-LAYER2-SUMMIT-004'
        },
        {
          id: 7,
          name: 'NFT Art Gallery',
          time: '11:00 AM - 7:00 PM',
          location: 'Gallery Space',
          description: 'Digital art exhibitions and NFT showcases',
          organizer: 'ART COLLECTIVE',
          type: 'Partner',
          qrCode: 'QR-NFT-GALLERY-005'
        }
      ],
      'Wednesday 19 Nov': [
        {
          id: 5,
          name: 'ETHCon Day Argentina',
          time: '10:00 AM - 6:00 PM',
          location: 'La Rural',
          description: 'Local Ethereum community presentations and networking',
          organizer: 'DEVCONNECT TEAM',
          type: 'Core',
          qrCode: 'QR-ETHCON-ARG-006'
        },
        {
          id: 6,
          name: 'zkTLS Deep Dive',
          time: '9:30 AM - 3:00 PM',
          location: 'Tech Pavilion',
          description: 'Technical workshop on zero-knowledge Transport Layer Security',
          organizer: 'EF TEAM',
          type: 'Core',
          qrCode: 'QR-ZKTLS-DIVE-007'
        }
      ],
      'Thursday 20 Nov': [],
      'Friday 21 Nov': [],
      'Saturday 22 Nov': [
        {
          id: 14,
          name: 'Closing Ceremony',
          time: '4:00 PM - 6:00 PM',
          location: 'Main Stage',
          description: 'Final presentations and wrap-up celebration',
          organizer: 'EF TEAM',
          type: 'Core',
          qrCode: 'QR-CLOSING-CEREMONY-013'
        }
      ]
    }

    return (
      <div className="space-y-6">
        {/* Devconnect Main Ticket */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Devconnect ticket
            </CardTitle>
            <CardDescription>
              Your main Devconnect pass for Nov 17-21, 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Devconnect ARG 2025</h3>
                    <p className="text-white/80 text-sm">Buenos Aires, Argentina</p>
                    <p className="text-white/80 text-sm">Nov 17-22, 2025</p>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">
                    VERIFIED
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Attendee</p>
                    <p className="font-semibold">{userData.displayName}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <QrCode className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Events by Day */}
        <div>
          <h3 className="text-lg font-semibold mb-4">In-venue events</h3>
          <div className="space-y-3">
            {Object.entries(eventsByDay).map(([day, events]) => (
              <Card key={day} className="overflow-hidden">
                <CardHeader 
                  className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleDay(day)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <CardTitle className="text-base">{day}</CardTitle>
                        <CardDescription>
                          {events.length === 0 ? 'No events scheduled' : `${events.length} event${events.length > 1 ? 's' : ''}`}
                        </CardDescription>
                      </div>
                    </div>
                    {expandedDays.includes(day) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                
                {expandedDays.includes(day) && (
                  <CardContent className="pt-0">
                    {events.length === 0 ? (
                      <div className="text-center py-6">
                        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-3">No events scheduled for this day</p>
                        <Button variant="outline" size="sm">
                          View schedule
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {sortEventsByTime(events).map((event) => {
                          // Determine card styling based on event type
                          const getCardStyling = (type: string) => {
                            switch (type) {
                              case 'Core':
                                return {
                                  cardClass: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
                                  qrButtonClass: 'bg-white/80 hover:bg-white border-blue-300 hover:border-blue-400 text-gray-600 hover:text-gray-800'
                                }
                              case 'Partner':
                                return {
                                  cardClass: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
                                  qrButtonClass: 'bg-white/80 hover:bg-white border-yellow-300 hover:border-yellow-400 text-gray-600 hover:text-gray-800'
                                }
                              default:
                                return {
                                  cardClass: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
                                  qrButtonClass: 'bg-white/80 hover:bg-white border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800'
                                }
                            }
                          }
                          
                          const styling = getCardStyling(event.type)
                          
                          return (
                            <div key={event.id} className={`border rounded-lg p-4 transition-colors relative ${styling.cardClass}`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 pr-4">
                                  <h4 className="font-semibold text-base mb-1 text-gray-900">{event.name}</h4>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs bg-white/60 border-white/80 text-gray-700">
                                      {event.time}
                                    </Badge>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedEvent(event)
                                    setQrModalOpen(true)
                                  }}
                                  className={`flex-shrink-0 min-w-[44px] h-11 rounded-lg flex items-center justify-center transition-all duration-200 group hover:shadow-sm touch-manipulation ${styling.qrButtonClass}`}
                                  title="Tap to view QR Code"
                                >
                                  <div className="flex items-center gap-1">
                                    <QrCode className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium hidden sm:inline">QR</span>
                                  </div>
                                </button>
                              </div>
                              <p className="text-xs mb-1 text-gray-600">
                                📍 {event.location}
                              </p>
                              {event.organizer && (
                                <p className="text-xs mb-1 font-medium text-gray-600">
                                  By {event.organizer}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                {event.description}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Edit Profile Sub-page Component
  const EditProfileSubPage = () => {
    const handleBackNavigation = () => {
      if (previousSection === 'profile') {
        setActiveSection('profile')
        setPreviousSection(null)
      } else {
        setSettingsSubPage(null)
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackNavigation}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Display Name</label>
            <input 
              type="text" 
              defaultValue={userData.displayName}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue={userData.name}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              defaultValue={userData.email}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea 
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" onClick={handleBackNavigation}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
  }

  // Connected Wallets Sub-page Component
  const ConnectedWalletsSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Connected Wallets</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Wallets</CardTitle>
          <CardDescription>Manage your connected cryptocurrency wallets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">MetaMask</p>
                <p className="text-sm text-gray-500">{userData.walletAddress}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Connected
            </Badge>
          </div>
          <Button variant="outline" className="w-full">
            Connect Another Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  )



  // Recovery Phrase Sub-page Component
  const RecoveryPhraseSubPage = () => {
    const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false)
    const [isLongPressing, setIsLongPressing] = useState(false)
    const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

    const handleLongPressStart = () => {
      setIsLongPressing(true)
      const timer = setTimeout(() => {
        setShowRecoveryPhrase(true)
        setIsLongPressing(false)
      }, 2000) // 2 second long press
      setLongPressTimer(timer)
    }

    const handleLongPressEnd = () => {
      setIsLongPressing(false)
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        setLongPressTimer(null)
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSettingsSubPage(null)}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <h2 className="text-xl font-semibold">Recovery Phrase</h2>
        </div>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-lg text-yellow-800">⚠️ Important Security Information</CardTitle>
            <CardDescription className="text-yellow-700">
              Your recovery phrase is the master key to your wallet. Never share it with anyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm font-medium mb-3">Your Recovery Phrase:</p>
              {!showRecoveryPhrase ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Shield className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-4">
                      Your recovery phrase is hidden for security
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className={`transition-all duration-200 ${
                      isLongPressing 
                        ? 'bg-blue-100 border-blue-400 scale-105' 
                        : 'hover:bg-gray-50'
                    }`}
                    onMouseDown={handleLongPressStart}
                    onMouseUp={handleLongPressEnd}
                    onMouseLeave={handleLongPressEnd}
                    onTouchStart={handleLongPressStart}
                    onTouchEnd={handleLongPressEnd}
                  >
                    {isLongPressing ? 'Keep holding...' : 'Hold to reveal phrase'}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Hold for 2 seconds to show your recovery phrase
                  </p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                    {['apple', 'banana', 'cherry', 'date', 'berry', 'fig', 'grape', 'honey', 'ice', 'jam', 'kiwi', 'lemon'].map((word, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded border text-center">
                        {index + 1}. {word}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowRecoveryPhrase(false)}
                    className="w-full mb-2"
                  >
                    Hide Recovery Phrase
                  </Button>
                </div>
              )}
            </div>
            {showRecoveryPhrase && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Phrase
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Backup
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Notifications Sub-page Component
  const NotificationsSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Push Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Event Reminders', description: 'Get notified before events start', enabled: true },
            { title: 'Quest Updates', description: 'Notifications about new quests and completions', enabled: true },
            { title: 'Wallet Activity', description: 'Transaction confirmations and security alerts', enabled: true },
            { title: 'Social Updates', description: 'Friend activities and community updates', enabled: false },
            { title: 'Marketing', description: 'Special offers and announcements', enabled: false }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-xs text-gray-500">{notification.description}</p>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notification.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notification.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  // Theme Sub-page Component
  const ThemeSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Theme</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Light', description: 'Clean and bright interface', active: true },
            { name: 'Dark', description: 'Easy on the eyes in low light', active: false },
            { name: 'Auto', description: 'Matches your system setting', active: false }
          ].map((theme, index) => (
            <div key={index} className={`p-4 border rounded-lg cursor-pointer transition-colors ${theme.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{theme.name}</p>
                  <p className="text-sm text-gray-500">{theme.description}</p>
                </div>
                {theme.active && <div className="w-4 h-4 bg-blue-500 rounded-full" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  // Language Sub-page Component
  const LanguageSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Language</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Language</CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { code: 'en', name: 'English', active: true },
            { code: 'es', name: 'Español', active: false }
          ].map((language, index) => (
            <div key={index} className={`p-3 border rounded-lg cursor-pointer transition-colors ${language.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{language.name}</span>
                {language.active && <div className="w-4 h-4 bg-blue-500 rounded-full" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  // Disconnect Wallet Sub-page Component
  const DisconnectWalletSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Disconnect Wallet</h2>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-lg text-red-600">⚠️ Disconnect Wallet</CardTitle>
          <CardDescription className="text-red-600">
            This will disconnect all your connected wallets from this device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-800 font-medium mb-2">What happens when you disconnect:</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• You'll need to reconnect your wallet to access funds</li>
              <li>• Your transaction history will remain safe</li>
              <li>• You can reconnect anytime with your wallet</li>
            </ul>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setSettingsSubPage(null)} className="flex-1">
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1">
              Disconnect All Wallets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Delete Account Sub-page Component
  const DeleteAccountSubPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSettingsSubPage(null)}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold">Delete Account</h2>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-lg text-red-600">⚠️ Delete Account</CardTitle>
          <CardDescription className="text-red-600">
            This action cannot be undone. This will permanently delete your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-800 font-medium mb-2">What will be deleted:</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Your profile and account information</li>
              <li>• All quest progress and achievements</li>
              <li>• Event tickets and favorites</li>
              <li>• Transaction history and wallet connections</li>
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-red-600">
              Type "DELETE" to confirm:
            </label>
            <input 
              type="text" 
              className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Type DELETE here"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setSettingsSubPage(null)} className="flex-1">
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Settings Section Component
  const SettingsSection = () => {
    // Show sub-page if one is selected
    if (settingsSubPage === 'edit-profile') return <EditProfileSubPage />
    if (settingsSubPage === 'connected-wallets') return <ConnectedWalletsSubPage />
    if (settingsSubPage === 'recovery-phrase') return <RecoveryPhraseSubPage />
    if (settingsSubPage === 'notifications') return <NotificationsSubPage />
    if (settingsSubPage === 'theme') return <ThemeSubPage />
    if (settingsSubPage === 'language') return <LanguageSubPage />
    if (settingsSubPage === 'disconnect-wallet') return <DisconnectWalletSubPage />
    if (settingsSubPage === 'delete-account') return <DeleteAccountSubPage />

    // Show main settings page
    return (
    <div className="space-y-6">
      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => {
            setPreviousSection(null)
            setSettingsSubPage('edit-profile')
          }}>
            <div>
              <p className="font-medium text-sm">Edit Profile</p>
              <p className="text-xs text-muted-foreground">Update your name, email, and bio</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => setSettingsSubPage('connected-wallets')}>
            <div>
              <p className="font-medium text-sm">Connected Wallets</p>
              <p className="text-xs text-muted-foreground">Manage your connected wallets</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => setSettingsSubPage('recovery-phrase')}>
            <div>
              <p className="font-medium text-sm">Recovery Phrase</p>
              <p className="text-xs text-muted-foreground">Backup or Export your wallet keys securely</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => setSettingsSubPage('notifications')}>
            <div>
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-muted-foreground">Manage push notifications</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => setSettingsSubPage('theme')}>
            <div>
              <p className="font-medium text-sm">Theme</p>
              <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2" onClick={() => setSettingsSubPage('language')}>
            <div>
              <p className="font-medium text-sm">Language</p>
              <p className="text-xs text-muted-foreground">Select your language</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-lg text-red-600 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-red-50 rounded-lg px-2" onClick={() => setSettingsSubPage('disconnect-wallet')}>
            <div>
              <p className="font-medium text-sm text-red-600">Disconnect Wallet</p>
              <p className="text-xs text-muted-foreground">Disconnect all connected wallets</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-red-50 rounded-lg px-2" onClick={() => setSettingsSubPage('delete-account')}>
            <div>
              <p className="font-medium text-sm text-red-600">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
  }

  // QR Modal Component
  const QRModal = () => {
    if (!qrModalOpen || !selectedEvent) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-sm w-full p-6 relative">
          <button
            onClick={() => setQrModalOpen(false)}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{selectedEvent.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedEvent.time}</p>
            
            {/* QR Code placeholder - in a real app this would be a generated QR code */}
            <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-mono">{selectedEvent.qrCode}</p>
              </div>
            </div>
            
            <div className="text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{selectedEvent.location}</span>
              </div>
              {selectedEvent.organizer && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Organizer:</span>
                  <span className="font-medium">{selectedEvent.organizer}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedEvent.type}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Show this QR code at the event entrance
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Main render function with navigation
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        {/* User Info Section */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{userData.displayName}</h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Full Width Breakout */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-4 px-6">
            {[
              { key: 'wallet', label: 'Wallet', icon: Wallet },
              { key: 'tickets', label: 'Tickets', icon: Ticket },
              { key: 'profile', label: 'Profile', icon: User },
              { key: 'collections', label: 'Collections', icon: Star },
              { key: 'settings', label: 'Settings', icon: Settings }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeSection === key
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'wallet' && <WalletSection />}
        {activeSection === 'tickets' && <TicketsSection />}
        {activeSection === 'collections' && <CollectionsSection />}
        {activeSection === 'settings' && <SettingsSection />}
      </div>
      
      {/* QR Modal */}
      <QRModal />
    </div>
  )
}

export default WalletComponent