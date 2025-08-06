import React from 'react'
import { MapPin, Calendar, Users, Heart, Map, Building2, Palette, Gamepad2, Cpu, GraduationCap, Brain, Microscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface FairProps {
  onNavigateToSchedule?: () => void;
  onNavigateToFavorites?: () => void;
  onEventClick?: (event: any) => void;
}

const Fair: React.FC<FairProps> = ({ onNavigateToSchedule, onNavigateToFavorites, onEventClick }) => {
  const eventInfo = [
    { icon: Calendar, label: "Nov 17–22, 2025", subtitle: "6 Days" },
    { icon: MapPin, label: "Buenos Aires, Argentina", subtitle: "+ Virtual" },
    { icon: Users, label: "15,000+ Attendees", subtitle: "Worldwide" }
  ]

  // Event data from Schedule component
  const events = [
    {
      id: 1,
      title: "Ethereum World's Fair & Coworking",
      time: "09:00–18:00",
      location: "LA RURAL",
      type: "COWORK",
      color: "bg-pink-50",
      textColor: "text-pink-700",
      badges: ["TICKETS AVAILABLE", "ALL WELCOME"],
      startDay: 0,
      span: 7
    },
    {
      id: 2,
      title: "Ethereum Day",
      time: "10:00–18:00",
      organizer: "ETHEREUM FOUNDATION",
      location: "LA RURAL",
      attendees: "2000",
      type: "Core",
      color: "bg-blue-50",
      textColor: "text-blue-700",
      badges: ["TALKS", "PRESENTATION"],
      startDay: 1,
      span: 1
    },
    {
      id: 3,
      title: "Opening Ceremony",
      time: "09:00–10:00",
      organizer: "EF TEAM",
      location: "MAIN STAGE",
      attendees: "5000",
      type: "Core",
      color: "bg-blue-50",
      textColor: "text-blue-700",
      badges: ["PRESENTATION", "ALL WELCOME"],
      startDay: 0,
      span: 1
    },
    {
      id: 4,
      title: "DeFi Workshop Series",
      time: "14:00–17:00",
      organizer: "AAVE TEAM",
      location: "WORKSHOP HALL",
      attendees: "300",
      type: "Partner",
      color: "bg-yellow-50",
      textColor: "text-yellow-700",
      badges: ["WORKSHOP", "INTERMEDIATE"],
      startDay: 0,
      span: 2
    },
    {
      id: 5,
      title: "ETHCon Day Argentina",
      time: "10:00–18:00",
      organizer: "DEVCONNECT TEAM",
      location: "LA RURAL",
      attendees: "2000",
      type: "Core",
      color: "bg-blue-50",
      textColor: "text-blue-700",
      badges: ["TALKS", "PRESENTATION"],
      startDay: 2,
      span: 1
    },
    {
      id: 6,
      title: "zkTLS Deep Dive",
      time: "09:30–15:00",
      organizer: "EF TEAM",
      location: "TECH PAVILION",
      attendees: "500",
      type: "Core",
      color: "bg-blue-50",
      textColor: "text-blue-700",
      badges: ["DISCUSSION", "EXPERT"],
      startDay: 2,
      span: 1
    },
    {
      id: 7,
      title: "NFT Art Gallery",
      time: "11:00–19:00",
      organizer: "ART COLLECTIVE",
      location: "GALLERY SPACE",
      attendees: "800",
      type: "Partner",
      color: "bg-yellow-50",
      textColor: "text-yellow-700",
      badges: ["EXHIBITION", "ALL WELCOME"],
      startDay: 1,
      span: 3
    },
    {
      id: 8,
      title: "Layer 2 Summit",
      time: "13:00–18:00",
      organizer: "POLYGON TEAM",
      location: "SUMMIT HALL",
      attendees: "1200",
      type: "Partner",
      color: "bg-yellow-50",
      textColor: "text-yellow-700",
      badges: ["TALKS", "BEGINNER"],
      startDay: 1,
      span: 1
    }
  ]

  // Get today's events - assuming today is day 0 (Nov 17) for demo purposes
  const getTodaysEvents = () => {
    const today = 0; // This would be calculated based on current date
    
    // Filter events that are happening today
    const todaysEvents = events.filter(event => 
      event.startDay <= today && (event.startDay + event.span) > today
    );
    
    // Sort to show cowork first, then core/partner events
    const sortedEvents = todaysEvents.sort((a, b) => {
      if (a.type === 'COWORK' && b.type !== 'COWORK') return -1;
      if (b.type === 'COWORK' && a.type !== 'COWORK') return 1;
      
      // Prioritize Core over Partner
      if (a.type === 'Core' && b.type === 'Partner') return -1;
      if (b.type === 'Core' && a.type === 'Partner') return 1;
      
      return 0;
    });
    
    // Return max 3 events
    return sortedEvents.slice(0, 3);
  }

  const todaysEvents = getTodaysEvents()

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {/* Event Info Header - Auto-scrolling */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 overflow-hidden relative">
        <div className="flex gap-8 animate-scroll whitespace-nowrap">
          {/* Triple the items for seamless infinite loop */}
          {[...eventInfo, ...eventInfo, ...eventInfo].map((info, index) => (
            <div key={index} className="flex items-center gap-3 flex-shrink-0 px-6">
              <div className="p-2 bg-white/20 rounded-lg">
                <info.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{info.label}</p>
                <p className="text-xs text-white/80">{info.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[200px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/70 to-indigo-900/80" />
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">World's Fair</h1>
            <p className="text-white/90 leading-relaxed">
              Discover the world built on Ethereum
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Mini CTAs */}
        <div className="grid grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-2 h-16"
            onClick={onNavigateToSchedule}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">Schedule</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-2 h-16"
            onClick={onNavigateToFavorites}
          >
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium">Favorites</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-2 h-16">
            <Map className="h-5 w-5" />
            <span className="text-sm font-medium">Event Map</span>
          </Button>
        </div>

        {/* Today's Schedule */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Today's schedule</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 mb-4">
                {todaysEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`flex items-center justify-between p-3 ${event.color} rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => onEventClick && onEventClick(event)}
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                    <Badge variant="outline">{event.time}</Badge>
                  </div>
                ))}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={onNavigateToSchedule}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Event Districts */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Event Districts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold text-sm mb-1">DeFi</h3>
                <Badge variant="secondary" className="text-xs mb-2">Pavilion Verde</Badge>
                <p className="text-xs text-muted-foreground">Explore DeFi protocols and financial innovations</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Palette className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                <h3 className="font-semibold text-sm mb-1">Arts</h3>
                <Badge variant="secondary" className="text-xs mb-2">Galería Norte</Badge>
                <p className="text-xs text-muted-foreground">Discover NFTs, digital art, and creative experiences</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold text-sm mb-1">Gaming</h3>
                <Badge variant="secondary" className="text-xs mb-2">Plaza Central</Badge>
                <p className="text-xs text-muted-foreground">Play blockchain games and virtual experiences</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold text-sm mb-1">Social</h3>
                <Badge variant="secondary" className="text-xs mb-2">Centro Sur</Badge>
                <p className="text-xs text-muted-foreground">Connect with communities and social platforms</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Cpu className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h3 className="font-semibold text-sm mb-1">Hardware</h3>
                <Badge variant="secondary" className="text-xs mb-2">Laboratorio Este</Badge>
                <p className="text-xs text-muted-foreground">Explore physical devices and infrastructure</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <h3 className="font-semibold text-sm mb-1">Onboarding</h3>
                <Badge variant="secondary" className="text-xs mb-2">Espacio Oeste</Badge>
                <p className="text-xs text-muted-foreground">Learn Web3 basics and get started</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="font-semibold text-sm mb-1">AI</h3>
                <Badge variant="secondary" className="text-xs mb-2">Sector Azul</Badge>
                <p className="text-xs text-muted-foreground">Artificial intelligence and machine learning</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Microscope className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                <h3 className="font-semibold text-sm mb-1">Biotech</h3>
                <Badge variant="secondary" className="text-xs mb-2">Jardín Común</Badge>
                <p className="text-xs text-muted-foreground">Biotechnology and life sciences innovations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Need Support Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Need support?</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Visit our Help Desk</h3>
                  <p className="text-muted-foreground mb-1">
                    <strong>Location:</strong> Main Entrance Lobby, Ground Floor
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Our friendly support team is available throughout the event to help with technical issues, venue navigation, and general questions.
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Quick Help Locations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Information Kiosks</p>
                      <p className="text-muted-foreground">Located at each district entrance</p>
                    </div>
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <p className="text-muted-foreground">Tech Foundry - Laboratorio Este</p>
                    </div>
                    <div>
                      <p className="font-medium">Event Coordinators</p>
                      <p className="text-muted-foreground">Look for staff in blue shirts</p>
                    </div>
                    <div>
                      <p className="font-medium">Emergency Services</p>
                      <p className="text-muted-foreground">Dial 911 or find security personnel</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Fair