import React from 'react'
import { X, MapPin, Users, Heart, Share2, Twitter, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

interface EventModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  favoriteEvents: Set<number>
  toggleFavorite: (eventId: number, eventTitle: string) => void
}

const EventModal: React.FC<EventModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  favoriteEvents, 
  toggleFavorite 
}) => {
  if (!isOpen || !event) return null

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

  const getEventImage = (eventTitle: string) => {
    // Generate different images based on event type and title
    const imageMap: { [key: string]: string } = {
      'COWORK': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      'Core': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
      'Partner': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
      'Community': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop'
    }
    
    // Special cases for specific events
    if (eventTitle.toLowerCase().includes('art') || eventTitle.toLowerCase().includes('nft')) {
      return 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?q=80&w=800&auto=format&fit=crop'
    }
    if (eventTitle.toLowerCase().includes('hackathon')) {
      return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
    }
    if (eventTitle.toLowerCase().includes('workshop')) {
      return 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'
    }
    
    return imageMap[event.type] || imageMap['Core']
  }

  const getEventDescription = (eventTitle: string, eventType: string) => {
    // Generate descriptions based on event title and type
    if (eventTitle.toLowerCase().includes('opening ceremony')) {
      return "Join us for the grand opening of Ethereum World's Fair! Experience inspiring talks from industry leaders, witness groundbreaking announcements, and connect with the global Ethereum community as we kick off this incredible week of innovation and collaboration."
    }
    if (eventTitle.toLowerCase().includes('closing ceremony')) {
      return "Celebrate the culmination of an extraordinary week at Ethereum World's Fair. Reflect on the innovations showcased, connections made, and the future we're building together. Join us for final remarks and a celebration of the Ethereum ecosystem."
    }
    if (eventTitle.toLowerCase().includes('hackathon')) {
      return "Push the boundaries of what's possible on Ethereum! Join developers from around the world in this intensive coding competition. Build innovative dApps, explore new protocols, and compete for prizes while collaborating with the brightest minds in Web3."
    }
    if (eventTitle.toLowerCase().includes('workshop')) {
      return "Deep dive into cutting-edge Ethereum technologies with hands-on learning. Our expert instructors will guide you through practical exercises, real-world applications, and advanced concepts to enhance your blockchain development skills."
    }
    if (eventTitle.toLowerCase().includes('art') || eventTitle.toLowerCase().includes('nft')) {
      return "Explore the intersection of art and technology in the digital age. Discover groundbreaking NFT projects, meet innovative artists, and experience how blockchain technology is revolutionizing creative expression and ownership."
    }
    if (eventTitle.toLowerCase().includes('defi')) {
      return "Discover the future of finance built on Ethereum. Learn about the latest DeFi protocols, yield farming strategies, and how decentralized finance is reshaping traditional banking and investment paradigms."
    }
    if (eventTitle.toLowerCase().includes('community')) {
      return "Connect with fellow Ethereum enthusiasts and builders from around the world. Share experiences, discuss the latest developments, and build lasting relationships within the vibrant Ethereum community."
    }
    
    // Default descriptions by type
    switch (eventType) {
      case 'Core':
        return "Join the Ethereum Foundation team and core contributors for insights into the latest developments, roadmap updates, and the future direction of the Ethereum ecosystem."
      case 'Partner':
        return "Discover innovative projects and partnerships that are building the future on Ethereum. Learn from industry leaders and explore cutting-edge applications of blockchain technology."
      case 'Community':
        return "Connect with the vibrant Ethereum community through networking, discussions, and collaborative activities. Share knowledge and build relationships with fellow enthusiasts."
      case 'COWORK':
        return "Join the collaborative workspace where builders, developers, and entrepreneurs come together to work, learn, and innovate on Ethereum projects throughout the event."
      default:
        return "Participate in this exciting Ethereum World's Fair event and be part of the global community building the decentralized future."
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Event Image with Close Button */}
        <div className="relative">
          <img 
            src={getEventImage(event.title)}
            alt={event.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Event Details */}
        <div className="p-6">
          {/* Title and Favorite Button */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 pr-2">{event.title}</h2>
            <button
              onClick={() => toggleFavorite(event.id, event.title)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <Heart 
                className={`h-5 w-5 ${
                  favoriteEvents.has(event.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400 hover:text-red-400'
                }`} 
              />
            </button>
          </div>

          {/* Time */}
          <div className="mb-3">
            <p className="text-lg font-semibold text-gray-700">{event.time}</p>
          </div>

          {/* Organizer */}
          {event.organizer && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {event.organizer}
              </p>
            </div>
          )}

          {/* Location and Attendees */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{event.attendees}</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`text-xs px-2 py-1 ${getBadgeStyle(badge)} border`}
              >
                {badge}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {getEventDescription(event.title, event.type)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button className="flex-1">
              Get tickets
            </Button>
            
            {/* Social Share Buttons */}
            <Button variant="outline" size="sm" className="p-2">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventModal