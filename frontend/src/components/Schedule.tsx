import React, { useState } from 'react'
import { MapPin, Users, Filter, Search, ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ScheduleProps {
  onNavigateBack?: () => void;
  favoriteEvents?: Set<number>;
  toggleFavorite?: (eventId: number, eventTitle: string) => void;
  onEventClick?: (event: any) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onNavigateBack, favoriteEvents = new Set(), toggleFavorite, onEventClick }) => {
  const [showCommunityEvents, setShowCommunityEvents] = useState(false)
  // Calendar dates from Nov 17-22
  const calendarDates = [
    { day: 'MON', date: 'NOV 17' },
    { day: 'TUE', date: 'NOV 18' },
    { day: 'WED', date: 'NOV 19' },
    { day: 'THU', date: 'NOV 20' },
    { day: 'FRI', date: 'NOV 21' },
    { day: 'SAT', date: 'NOV 22' },
    { day: 'SUN', date: 'NOV 23' }
  ]

  // Event data with more events distributed across days
  const events = [
    {
      id: 1,
      title: "Ethereum World's Fair & Coworking",
      time: "09:00–18:00 EVERY DAY",
      location: "LA RURAL",
      type: "COWORK",
      color: "bg-pink-100 border-pink-200",
      textColor: "text-pink-700",
      badges: ["TICKETS AVAILABLE", "ALL WELCOME"],
      span: 7, // Spans all days
      startDay: 0
    },
    {
      id: 2,
      title: "Ethereum Day",
      time: "10:00–18:00",
      organizer: "ETHEREUM FOUNDATION",
      location: "LA RURAL",
      attendees: "2000",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["TALKS", "PRESENTATION"],
      span: 1,
      startDay: 1
    },
    {
      id: 3,
      title: "Opening Ceremony",
      time: "09:00–10:00",
      organizer: "EF TEAM",
      location: "MAIN STAGE",
      attendees: "5000",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["PRESENTATION", "ALL WELCOME"],
      span: 1,
      startDay: 0
    },
    {
      id: 4,
      title: "DeFi Workshop Series",
      time: "14:00–17:00",
      organizer: "AAVE TEAM",
      location: "WORKSHOP HALL",
      attendees: "300",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["WORKSHOP", "INTERMEDIATE"],
      span: 2,
      startDay: 0
    },
    {
      id: 5,
      title: "ETHCon Day Argentina",
      time: "10:00–18:00",
      organizer: "DEVCONNECT TEAM",
      location: "LA RURAL",
      attendees: "2000",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["TALKS", "PRESENTATION"],
      span: 1,
      startDay: 2
    },
    {
      id: 6,
      title: "zkTLS Deep Dive",
      time: "09:30–15:00",
      organizer: "EF TEAM",
      location: "TECH PAVILION",
      attendees: "500",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["DISCUSSION", "EXPERT"],
      span: 1,
      startDay: 2
    },
    {
      id: 7,
      title: "NFT Art Gallery",
      time: "11:00–19:00",
      organizer: "ART COLLECTIVE",
      location: "GALLERY SPACE",
      attendees: "800",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["EXHIBITION", "ALL WELCOME"],
      span: 3,
      startDay: 1
    },
    {
      id: 8,
      title: "Layer 2 Summit",
      time: "13:00–18:00",
      organizer: "POLYGON TEAM",
      location: "SUMMIT HALL",
      attendees: "1200",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["TALKS", "BEGINNER"],
      span: 1,
      startDay: 1
    },
    {
      id: 9,
      title: "ETH Global Hackathon",
      time: "13:00–23:59",
      organizer: "ETH GLOBAL",
      location: "HACK SPACE",
      attendees: "1500",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["HACKATHON", "BEGINNER"],
      span: 3,
      startDay: 4
    },
    {
      id: 10,
      title: "zkID Workshop",
      time: "10:00–13:00",
      organizer: "EF TEAM",
      location: "WORKSHOP B",
      attendees: "200",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["WORKSHOP", "INTERMEDIATE"],
      span: 1,
      startDay: 3
    },
    {
      id: 11,
      title: "Agentic Zero Conference",
      time: "09:30–18:00",
      organizer: "MARTINTEL",
      location: "CONFERENCE HALL",
      attendees: "1000",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["TALKS", "PAID EVENT"],
      span: 1,
      startDay: 3
    },
    {
      id: 12,
      title: "Security Audit Workshop",
      time: "15:00–18:00",
      organizer: "CONSENSYS",
      location: "SECURITY LAB",
      attendees: "150",
      type: "Partner",
      color: "bg-yellow-100 border-yellow-200",
      textColor: "text-yellow-700",
      badges: ["WORKSHOP", "EXPERT"],
      span: 2,
      startDay: 3
    },
    {
      id: 13,
      title: "Community Meetup",
      time: "19:00–22:00",
      organizer: "LOCAL COMMUNITY",
      location: "NETWORKING AREA",
      attendees: "500",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["NETWORKING", "ALL WELCOME"],
      span: 1,
      startDay: 4
    },
    {
      id: 14,
      title: "Closing Ceremony",
      time: "16:00–18:00",
      organizer: "EF TEAM",
      location: "MAIN STAGE",
      attendees: "3000",
      type: "Core",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      badges: ["PRESENTATION", "ALL WELCOME"],
      span: 1,
      startDay: 5
    },
    {
      id: 15,
      title: "Buenos Aires Ethereum Meetup",
      time: "18:00–21:00",
      organizer: "LOCAL COMMUNITY",
      location: "COMMUNITY CENTER",
      attendees: "200",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["NETWORKING", "FREE"],
      span: 1,
      startDay: 0
    },
    {
      id: 16,
      title: "Women in Web3 Breakfast",
      time: "08:00–09:30",
      organizer: "WWW3 COLLECTIVE",
      location: "CAFE TERRACE",
      attendees: "80",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["NETWORKING", "FREE"],
      span: 1,
      startDay: 1
    },
    {
      id: 17,
      title: "Developer Happy Hour",
      time: "17:00–20:00",
      organizer: "DEV COMMUNITY",
      location: "ROOFTOP BAR",
      attendees: "150",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SOCIAL", "FREE"],
      span: 1,
      startDay: 2
    },
    {
      id: 18,
      title: "Student Blockchain Workshop",
      time: "14:00–16:00",
      organizer: "UNIVERSITY CLUB",
      location: "STUDENT LOUNGE",
      attendees: "60",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["WORKSHOP", "STUDENTS"],
      span: 1,
      startDay: 3
    },
    {
      id: 19,
      title: "Community Showcase",
      time: "15:00–18:00",
      organizer: "COMMUNITY LEADERS",
      location: "DEMO STAGE",
      attendees: "300",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SHOWCASE", "FREE"],
      span: 2,
      startDay: 4
    },
    // Additional Community Events
    {
      id: 20,
      title: "Crypto Coffee Chat",
      time: "07:30–09:00",
      organizer: "LOCAL BARISTAS",
      location: "COFFEE CORNER",
      attendees: "40",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["NETWORKING", "FREE"],
      span: 1,
      startDay: 0
    },
    {
      id: 21,
      title: "Web3 Book Club",
      time: "12:00–13:00",
      organizer: "READERS COLLECTIVE",
      location: "LIBRARY LOUNGE",
      attendees: "25",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["DISCUSSION", "FREE"],
      span: 1,
      startDay: 0
    },
    {
      id: 22,
      title: "Ethereum Trivia Night",
      time: "19:30–21:30",
      organizer: "QUIZ MASTERS",
      location: "PUB VENUE",
      attendees: "80",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SOCIAL", "FREE"],
      span: 1,
      startDay: 0
    },
    {
      id: 23,
      title: "Yoga & Meditation",
      time: "06:30–07:30",
      organizer: "WELLNESS GROUP",
      location: "GARDEN TERRACE",
      attendees: "30",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["WELLNESS", "FREE"],
      span: 1,
      startDay: 1
    },
    {
      id: 24,
      title: "Local Ethereum Meetup",
      time: "18:30–20:30",
      organizer: "BA ETHEREUM GROUP",
      location: "MEETUP SPACE",
      attendees: "120",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["NETWORKING", "FREE"],
      span: 1,
      startDay: 1
    },
    {
      id: 25,
      title: "Photography Walkabout",
      time: "14:00–16:00",
      organizer: "PHOTO ENTHUSIASTS",
      location: "CITY STREETS",
      attendees: "15",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["CREATIVE", "FREE"],
      span: 1,
      startDay: 1
    },
    {
      id: 26,
      title: "Community Lunch & Learn",
      time: "12:30–14:00",
      organizer: "VOLUNTEER ORGANIZERS",
      location: "DINING HALL",
      attendees: "60",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["NETWORKING", "FREE"],
      span: 1,
      startDay: 2
    },
    {
      id: 27,
      title: "Open Source Contribution Hour",
      time: "16:00–17:00",
      organizer: "GITHUB HEROES",
      location: "CODING CORNER",
      attendees: "35",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["CODING", "FREE"],
      span: 1,
      startDay: 2
    },
    {
      id: 28,
      title: "Ethereum Gaming Tournament",
      time: "20:00–23:00",
      organizer: "GAMING GUILD",
      location: "GAMING LOUNGE",
      attendees: "50",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["GAMING", "FREE"],
      span: 1,
      startDay: 2
    },
    {
      id: 29,
      title: "Morning Jog & Networking",
      time: "07:00–08:00",
      organizer: "RUNNING CLUB",
      location: "PARK ENTRANCE",
      attendees: "20",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["WELLNESS", "FREE"],
      span: 1,
      startDay: 3
    },
    {
      id: 30,
      title: "Podcast Recording Session",
      time: "15:30–17:30",
      organizer: "WEB3 PODCASTERS",
      location: "RECORDING STUDIO",
      attendees: "12",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["CONTENT", "FREE"],
      span: 1,
      startDay: 3
    },
    {
      id: 31,
      title: "Community Feedback Session",
      time: "11:00–12:00",
      organizer: "EVENT ORGANIZERS",
      location: "FEEDBACK ROOM",
      attendees: "40",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["DISCUSSION", "FREE"],
      span: 1,
      startDay: 3
    },
    {
      id: 32,
      title: "Startup Pitch Practice",
      time: "09:00–11:00",
      organizer: "ENTREPRENEUR CIRCLE",
      location: "PITCH ROOM",
      attendees: "25",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["ENTREPRENEURSHIP", "FREE"],
      span: 1,
      startDay: 4
    },
    {
      id: 33,
      title: "Web3 Career Fair",
      time: "13:00–16:00",
      organizer: "TALENT COLLECTIVE",
      location: "CAREER CENTER",
      attendees: "200",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["CAREER", "FREE"],
      span: 1,
      startDay: 4
    },
    {
      id: 34,
      title: "Community Art Project",
      time: "10:00–15:00",
      organizer: "ARTIST COLLECTIVE",
      location: "ART STUDIO",
      attendees: "30",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["CREATIVE", "FREE"],
      span: 1,
      startDay: 5
    },
    {
      id: 35,
      title: "Thank You Brunch",
      time: "10:30–12:30",
      organizer: "VOLUNTEER TEAM",
      location: "MAIN DINING",
      attendees: "150",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SOCIAL", "FREE"],
      span: 1,
      startDay: 5
    },
    {
      id: 36,
      title: "Community Photo Session",
      time: "14:00–15:00",
      organizer: "MEMORY MAKERS",
      location: "MAIN STAGE",
      attendees: "500",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SOCIAL", "FREE"],
      span: 1,
      startDay: 5
    },
    {
      id: 37,
      title: "Blockchain Study Group",
      time: "16:30–18:00",
      organizer: "STUDY BUDDIES",
      location: "STUDY HALL",
      attendees: "45",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["EDUCATION", "FREE"],
      span: 1,
      startDay: 6
    },
    {
      id: 38,
      title: "Farewell Gathering",
      time: "19:00–22:00",
      organizer: "COMMUNITY HOSTS",
      location: "FAREWELL PLAZA",
      attendees: "300",
      type: "Community",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      badges: ["SOCIAL", "FREE"],
      span: 1,
      startDay: 6
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'COWORK':
        return 'bg-pink-500'
      case 'Core':
        return 'bg-blue-500'
      case 'Partner':
        return 'bg-yellow-500'
      case 'Community':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'TICKETS AVAILABLE':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'ALL WELCOME':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'BEGINNER':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'EXPERT':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'PAID EVENT':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'FREE':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'SOCIAL':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'STUDENTS':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'SHOWCASE':
        return 'bg-pink-100 text-pink-700 border-pink-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {onNavigateBack && (
              <Button variant="ghost" size="sm" onClick={onNavigateBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-2xl font-bold">Schedule</h1>
          </div>
        </div>
        
        {/* Community Events Toggle */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommunityEvents(!showCommunityEvents)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                showCommunityEvents ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  showCommunityEvents ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
            <label className="text-sm font-medium">Show Community events</label>
          </div>
        </div>
        
        {/* Event Type Legend */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-500 rounded"></div>
            <span className="text-sm">Cowork</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm">Community</span>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative" style={{ width: '240px' }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events or organizers"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontSize: 'inherit' }}
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-2">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {calendarDates.map((date, index) => (
                <div key={index} className="text-center py-2 px-2">
                  <div className="text-xs font-medium text-gray-600">{date.day}</div>
                  <div className="text-sm font-bold">{date.date}</div>
                </div>
              ))}
            </div>

            {/* Events Grid */}
            <div className="relative">
              {/* Create a proper calendar grid with event rows */}
              <div className="space-y-1">
                {/* Sort events by start day and time to create proper rows */}
                {(() => {
                  // Filter events based on community toggle
                  const filteredEvents = showCommunityEvents 
                    ? events 
                    : events.filter(event => event.type !== 'Community');

                  // Group events into rows to avoid overlaps
                  const eventRows: typeof events[] = [];
                  const sortedEvents = [...filteredEvents].sort((a, b) => {
                    // Always put COWORK events first
                    if (a.type === 'COWORK' && b.type !== 'COWORK') return -1;
                    if (b.type === 'COWORK' && a.type !== 'COWORK') return 1;
                    
                    // Then prioritize Core and Partner events over Community events
                    const getPriority = (type: string) => {
                      switch (type) {
                        case 'COWORK': return 0;
                        case 'Core': return 1;
                        case 'Partner': return 2;
                        case 'Community': return 3;
                        default: return 4;
                      }
                    };
                    
                    if (a.startDay !== b.startDay) return a.startDay - b.startDay;
                    
                    // Sort by priority first, then by time
                    const priorityDiff = getPriority(a.type) - getPriority(b.type);
                    if (priorityDiff !== 0) return priorityDiff;
                    
                    return a.time.localeCompare(b.time);
                  });

                  sortedEvents.forEach(event => {
                    // Find a row where this event can fit without overlapping
                    let placedInRow = false;
                    for (let rowIndex = 0; rowIndex < eventRows.length; rowIndex++) {
                      const row = eventRows[rowIndex];
                      const hasOverlap = row.some(existingEvent => {
                        const existingEnd = existingEvent.startDay + existingEvent.span;
                        const eventEnd = event.startDay + event.span;
                        return !(event.startDay >= existingEnd || existingEvent.startDay >= eventEnd);
                      });
                      
                      if (!hasOverlap) {
                        row.push(event);
                        placedInRow = true;
                        break;
                      }
                    }
                    
                    // If no existing row can fit this event, create a new row
                    if (!placedInRow) {
                      eventRows.push([event]);
                    }
                  });

                  return eventRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-7 gap-2 relative" style={{ minHeight: '90px' }}>
                      {calendarDates.map((_, dayIndex) => {
                        // Find event that starts on this day in this row
                        const eventForThisDay = row.find(event => event.startDay === dayIndex);
                        
                        if (eventForThisDay) {
                          return (
                            <div
                              key={dayIndex}
                              className={`${eventForThisDay.color} border rounded-md p-2 overflow-hidden flex flex-col h-full relative cursor-pointer hover:shadow-md transition-shadow`}
                              style={{
                                gridColumn: `${dayIndex + 1} / ${dayIndex + 1 + eventForThisDay.span}`
                              }}
                              onClick={() => onEventClick && onEventClick(eventForThisDay)}
                            >
                              {/* Heart icon for favoriting */}
                              {toggleFavorite && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(eventForThisDay.id, eventForThisDay.title)
                                  }}
                                  className="absolute top-1 right-1 p-1 hover:bg-white/50 rounded-full transition-colors z-10"
                                >
                                  <Heart 
                                    className={`h-3 w-3 ${
                                      favoriteEvents.has(eventForThisDay.id) 
                                        ? 'text-red-500 fill-current' 
                                        : 'text-gray-400 hover:text-red-400'
                                    }`} 
                                  />
                                </button>
                              )}
                              
                              <div className="flex items-start gap-1 mb-1 pr-6">
                                <div className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(eventForThisDay.type)} flex-shrink-0 mt-0.5`}></div>
                                <h3 className="font-semibold leading-tight break-words" style={{ color: '#242436', fontSize: '14px', letterSpacing: '0.1px' }}>{eventForThisDay.title}</h3>
                              </div>
                              
                              <div className="text-xs">
                                <div className="font-medium text-xs break-words mb-1" style={{ color: '#36364C' }}>{eventForThisDay.time}</div>
                              </div>

                              <div className="text-xs mb-auto">
                                {eventForThisDay.organizer && (
                                  <>
                                    <div className="font-medium uppercase text-xs break-words mb-1" style={{ color: '#36364C' }}>{eventForThisDay.organizer}</div>
                                    <div className="border-t border-gray-300 my-1"></div>
                                  </>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-1 text-xs">
                                  <div className="flex items-center gap-0.5 flex-shrink-0">
                                    <MapPin className="h-2.5 w-2.5" style={{ color: '#36364C' }} />
                                    <span className="text-xs break-words" style={{ color: '#36364C' }}>{eventForThisDay.location}</span>
                                  </div>
                                  {eventForThisDay.attendees && (
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                      <Users className="h-2.5 w-2.5" style={{ color: '#36364C' }} />
                                      <span className="text-xs break-words" style={{ color: '#36364C' }}>{eventForThisDay.attendees}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-0.5 mt-1">
                                {eventForThisDay.badges.slice(0, 2).map((badge, badgeIndex) => (
                                  <Badge
                                    key={badgeIndex}
                                    variant="outline"
                                    className={`text-xs px-1 py-0 h-4 ${getBadgeStyle(badge)} border flex-shrink-0`}
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                                {eventForThisDay.badges.length > 2 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs px-1 py-0 h-4 bg-gray-100 text-gray-600 border-gray-200 flex-shrink-0"
                                  >
                                    +{eventForThisDay.badges.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        }
                        
                        // Check if this day is covered by a multi-day event from this row
                        const isCoveredByMultiDayEvent = row.some(event => 
                          dayIndex > event.startDay && dayIndex < event.startDay + event.span
                        );
                        
                        if (isCoveredByMultiDayEvent) {
                          return null; // This cell is covered by a spanning event
                        }
                        
                        return <div key={dayIndex}></div>; // Empty cell
                      })}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule