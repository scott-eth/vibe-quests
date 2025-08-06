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
  Bell,
  Shield,
  Palette,
  Globe,
  LogOut,
  ChevronRight,
  Star,
  Target,
  Zap,
  QrCode,
  Ticket,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const WalletComponent: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true)
  const [activeSection, setActiveSection] = useState<'profile' | 'wallet' | 'tickets' | 'collections' | 'settings'>('wallet')

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
            <Button variant="outline" size="sm">
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

  // Wallet Section Component
  const WalletSection = () => (
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
              <div className="flex items-center gap-1 text-green-300 text-sm mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +12.5% this week
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
            <Button variant="secondary" className="flex flex-col gap-1 h-auto py-3 bg-white/20 hover:bg-white/30 text-white border-0">
              <Send className="h-4 w-4" />
              <span className="text-xs">Send</span>
            </Button>
            <Button variant="secondary" className="flex flex-col gap-1 h-auto py-3 bg-white/20 hover:bg-white/30 text-white border-0">
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

    // Mock event data organized by days
    const eventsByDay = {
      'Monday 17 Nov': [
        {
          id: 1,
          name: 'Opening Ceremony Reception',
          time: '6:00 PM - 8:00 PM',
          location: 'Main Pavilion',
          description: 'Welcome reception with networking and keynote speakers'
        },
        {
          id: 2,
          name: 'DeFi Mixer',
          time: '8:30 PM - 11:00 PM',
          location: 'Pavilion Verde',
          description: 'Evening networking event for DeFi enthusiasts'
        }
      ],
      'Tuesday 18 Nov': [
        {
          id: 3,
          name: 'Builders Breakfast',
          time: '8:00 AM - 9:30 AM',
          location: 'Centro Sur',
          description: 'Morning networking for developers and builders'
        }
      ],
      'Wednesday 19 Nov': [],
      'Thursday 20 Nov': [
        {
          id: 4,
          name: 'NFT Art Gallery Opening',
          time: '7:00 PM - 10:00 PM',
          location: 'Galería Norte',
          description: 'Exclusive preview of digital art exhibitions'
        }
      ],
      'Friday 21 Nov': [],
      'Saturday 22 Nov': [
        {
          id: 5,
          name: 'Closing Party',
          time: '9:00 PM - 2:00 AM',
          location: 'Plaza Central',
          description: 'Final celebration with live music and entertainment'
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
                        {events.map((event) => (
                          <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">{event.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {event.time}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              📍 {event.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {event.description}
                            </p>
                          </div>
                        ))}
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

  // Settings Section Component
  const SettingsSection = () => (
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
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Edit Profile</p>
              <p className="text-xs text-muted-foreground">Update your name, email, and bio</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your account security</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Not Enabled
            </Badge>
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
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Connected Wallets</p>
              <p className="text-xs text-muted-foreground">Manage your connected wallets</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Transaction History</p>
              <p className="text-xs text-muted-foreground">Export your transaction data</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Recovery Phrase</p>
              <p className="text-xs text-muted-foreground">Backup your wallet securely</p>
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
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-muted-foreground">Manage email and push notifications</p>
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Theme</p>
              <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
            </div>
            <Button variant="ghost" size="sm">
              <Palette className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Language</p>
              <p className="text-xs text-muted-foreground">Select your language</p>
            </div>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
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
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm text-red-600">Disconnect Wallet</p>
              <p className="text-xs text-muted-foreground">Disconnect all connected wallets</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm text-red-600">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Main render function with navigation
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
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
    </div>
  )
}

export default WalletComponent