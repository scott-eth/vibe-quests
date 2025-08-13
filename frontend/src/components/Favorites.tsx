import React, { useState } from 'react'
import { MapPin, Users, ArrowLeft, ChevronDown, ChevronUp, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Event {
  id: number
  title: string
  time: string
  organizer?: string
  location: string
  attendees?: string
  type: string
  color: string
  textColor: string
  badges: string[]
  span: number
  startDay: number
}

interface FavoritesProps {
  onNavigateBack?: () => void;
  favoriteEvents: Set<number>;
  toggleFavorite: (eventId: number, eventTitle: string) => void;
  onEventClick?: (event: any) => void;
  onNavigateToSchedule?: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onNavigateBack, favoriteEvents, toggleFavorite, onEventClick, onNavigateToSchedule }) => {
  // Calendar dates from Nov 17-22
  const calendarDates = [
    { day: 'MON', date: 'NOV 17', fullDate: 'Monday, Nov 17' },
    { day: 'TUE', date: 'NOV 18', fullDate: 'Tuesday, Nov 18' },
    { day: 'WED', date: 'NOV 19', fullDate: 'Wednesday, Nov 19' },
    { day: 'THU', date: 'NOV 20', fullDate: 'Thursday, Nov 20' },
    { day: 'FRI', date: 'NOV 21', fullDate: 'Friday, Nov 21' },
    { day: 'SAT', date: 'NOV 22', fullDate: 'Saturday, Nov 22' },
    { day: 'SUN', date: 'NOV 23', fullDate: 'Sunday, Nov 23' }
  ]

  // Same event data as Schedule component
  const events: Event[] = [
    {
      id: 1,
      title: "Ethereum World's Fair & Coworking",
      time: "09:00–18:00 EVERY DAY",
      location: "LA RURAL",
      type: "COWORK",
      color: "bg-pink-100 border-pink-200",
      textColor: "text-pink-700",
      badges: ["TICKETS AVAILABLE", "ALL WELCOME"],
      span: 7,
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
      startDay: 0
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

  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set())

  const toggleDayExpansion = (dayIndex: number) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(dayIndex)) {
      newExpanded.delete(dayIndex)
    } else {
      newExpanded.add(dayIndex)
    }
    setExpandedDays(newExpanded)
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

  // Group favorite events by day
  const favoriteEventsByDay = calendarDates.map((date, dayIndex) => {
    const dayEvents = events.filter(event => {
      // Check if event is favorited and occurs on this day
      if (!favoriteEvents.has(event.id)) return false
      
      // For multi-day events, check if this day is within the event's span
      return dayIndex >= event.startDay && dayIndex < event.startDay + event.span
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time)
    })

    return {
      ...date,
      dayIndex,
      events: dayEvents
    }
  })

  const totalFavorites = favoriteEvents.size

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="p-4">
                      <div className="flex items-center gap-3">
              {onNavigateBack && (
                <button
                  onClick={onNavigateBack}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}
              <div>
                <h1 className="text-xl font-bold">Favorites</h1>
                <p className="text-white/90 text-sm">
                  {totalFavorites === 0 ? 'No favorite events yet' : `${totalFavorites} favorite event${totalFavorites === 1 ? '' : 's'}`}
                </p>
              </div>
            </div>
        </div>
      </div>

      {/* Favorites by Day */}
      <div className="p-4 space-y-4">
        {favoriteEventsByDay.map((day) => (
          <Card key={day.dayIndex} className="overflow-hidden">
            <button
              onClick={() => toggleDayExpansion(day.dayIndex)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <h3 className="font-semibold" style={{ color: '#242436', fontSize: '16px' }}>
                    {day.fullDate}
                  </h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {day.events.length === 0 
                      ? 'No favorite events' 
                      : `${day.events.length} favorite event${day.events.length === 1 ? '' : 's'}`
                    }
                  </p>
                </div>
              </div>
              {expandedDays.has(day.dayIndex) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedDays.has(day.dayIndex) && (
              <CardContent className="pt-0 pb-4 px-4">
                {day.events.length === 0 ? (
                  <div className="py-8 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-500 font-medium mb-1">No favorite events for this day</p>
                    <p className="text-sm text-gray-400 mb-4">
                      Browse the schedule to add events to your favorites
                    </p>
                    {onNavigateToSchedule && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={onNavigateToSchedule}
                        className="text-sm"
                      >
                        View schedule
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} border rounded-md p-3 relative cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => onEventClick && onEventClick(event)}
                      >
                        {/* Heart icon for unfavoriting */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(event.id, event.title)
                          }}
                          className="absolute top-2 right-2 p-1 hover:bg-white/50 rounded-full transition-colors"
                        >
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                        </button>

                        <div className="pr-8">
                          <h4 className="font-semibold text-sm mb-2" style={{ color: '#242436' }}>
                            {event.title}
                          </h4>
                          
                          <div className="text-xs mb-2">
                            <div className="font-medium" style={{ color: '#36364C' }}>
                              {event.time}
                            </div>
                          </div>

                          {event.organizer && (
                            <div className="text-xs mb-2">
                              <div className="font-medium uppercase" style={{ color: '#36364C' }}>
                                {event.organizer}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" style={{ color: '#36364C' }} />
                              <span style={{ color: '#36364C' }}>{event.location}</span>
                            </div>
                            {event.attendees && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" style={{ color: '#36364C' }} />
                                <span style={{ color: '#36364C' }}>{event.attendees}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {event.badges.slice(0, 3).map((badge, badgeIndex) => (
                              <Badge
                                key={badgeIndex}
                                variant="outline"
                                className={`text-xs px-1.5 py-0.5 h-5 ${getBadgeStyle(badge)} border`}
                              >
                                {badge}
                              </Badge>
                            ))}
                            {event.badges.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1.5 py-0.5 h-5 bg-gray-100 text-gray-600 border-gray-200"
                              >
                                +{event.badges.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
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
  )
}

export default Favorites