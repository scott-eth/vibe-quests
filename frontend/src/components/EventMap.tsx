import React, { useState, useRef, useEffect } from 'react'
import { X, Users, Search, Building2, Utensils, Coffee, Cpu, Microscope, Palette, ShoppingBag, LogIn, DoorOpen, Briefcase, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface POI {
  id: string
  name: string
  category: string
  description: string
  details?: string
  currentEvent?: string
  capacity?: string
  amenities?: string[]
  heroImage?: string
  companyDescription?: string
  companies?: string[]
}

interface EventMapProps {
  onNavigateBack?: () => void
}

const EventMap: React.FC<EventMapProps> = ({ onNavigateBack }) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  // POI data based on SVG structure with brand names and company details
  const pois: POI[] = [
    // Coworking Area
    { 
      id: 'coworking-area', name: 'Coworking Area', category: 'cowork', 
      description: 'Flexible workspace for developers, entrepreneurs, and remote workers', 
      currentEvent: 'Open Coworking - All Day', capacity: '200+ people', 
      amenities: ['WiFi', 'Power Outlets', 'Printing', 'Meeting Rooms', 'Phone Booths', 'Whiteboards', 'Coffee Station'],
      companyDescription: 'A collaborative workspace designed for the blockchain and tech community. Find your perfect spot whether you need focused work time, team collaboration, or networking opportunities.'
    },
    
    // DeFi District
    { 
      id: 'defi-district', name: 'DeFi District', category: 'defi', 
      description: 'Decentralized Finance companies and protocols showcase', 
      currentEvent: 'DeFi Innovation Showcase - All Day', capacity: '400 people',
      amenities: ['Protocol Demos', 'Trading Simulators', 'Developer Workshops', 'Yield Farming'],
      heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
      companyDescription: 'Explore the future of decentralized finance with leading protocols and innovative companies.',
      companies: ['Uniswap Labs', 'Aave Protocol', 'Compound Finance', 'MakerDAO', 'Curve Finance', 'Synthetix Network', '1inch Network', 'Balancer Protocol']
    },
    
    // Biotech District
    { 
      id: 'biotech-district', name: 'Biotech District', category: 'biotech', 
      description: 'Blockchain and biotechnology innovation showcase', 
      currentEvent: 'BioTech Innovation Summit - All Day', capacity: '320 people', 
      amenities: ['DNA Sequencing', 'Medical Research', 'Health Data Privacy', 'Clinical Trials'],
      heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop',
      companyDescription: 'Discover the intersection of blockchain and biotechnology with leading research organizations and healthcare innovators.',
      companies: ['GenomicsDAO', 'HealthBlocks', 'PharmaChain', 'BioLedger', 'MedToken', 'LifeDAO', 'DNAVault', 'BioMarket']
    },
    
    // Hardware District
    { 
      id: 'hardware-district', name: 'Hardware District', category: 'hardware', 
      description: 'Blockchain hardware and infrastructure showcase', 
      currentEvent: 'Hardware Innovation Expo - All Day', capacity: '200 people', 
      amenities: ['Hardware Wallets', 'IoT Devices', 'Mining Equipment', 'Security Solutions'],
      heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop',
      companyDescription: 'Experience cutting-edge blockchain hardware and infrastructure solutions from industry leaders.',
      companies: ['Helium Network', 'Filecoin Station', 'Raspberry Pi Foundation', 'Ledger', 'Trezor', 'GridPlus', 'Oasis Labs', 'Ethereum Foundation']
    },
    
    // Coffee Stations
    { 
      id: 'coffee-stations', name: 'Coffee Stations', category: 'coffee', 
      description: 'Premium coffee and refreshments throughout the venue', 
      currentEvent: 'Fresh Coffee - All Day', capacity: 'Multiple locations', 
      amenities: ['Espresso', 'Cold Brew', 'Tea Selection', 'Pastries', 'Energy Drinks', 'Crypto Payments'],
      companyDescription: 'Multiple coffee stations located throughout the venue serving premium beverages and light snacks. Perfect for networking breaks and staying energized during the event.'
    },
    
    // Food & Beverage
    { 
      id: 'fnb-1', name: 'Decentralized Dining', category: 'fnb', 
      description: 'Multi-vendor food hall with crypto payments', 
      amenities: ['Crypto Payments', 'Multiple Cuisines', 'Vegetarian Options', 'Seating for 200'],
      companyDescription: 'Decentralized Dining brings together diverse food vendors in a blockchain-powered marketplace.'
    },
    { 
      id: 'fnb-2', name: 'Token Treats', category: 'fnb', 
      description: 'Healthy snacks and token rewards', 
      amenities: ['Loyalty Tokens', 'Healthy Options', 'Quick Service', 'Sustainability Focus'],
      companyDescription: 'Token Treats rewards healthy eating choices with blockchain-based loyalty tokens.'
    },
    { 
      id: 'fnb-3', name: 'Global Gastronomy', category: 'fnb', 
      description: 'International cuisine with cultural NFTs', 
      amenities: ['Cultural NFTs', 'International Dishes', 'Chef Stories', 'Recipe Sharing'],
      companyDescription: 'Global Gastronomy celebrates world cuisine while preserving cultural heritage through NFTs.'
    },
    { 
      id: 'fnb-4', name: 'Night Owl Kitchen', category: 'fnb', 
      description: 'Late-night dining for developers', 
      amenities: ['24/7 Service', 'Developer Fuel', 'Energy Foods', 'Quiet Dining'],
      companyDescription: 'Night Owl Kitchen specializes in late-night dining solutions for hardworking developers and creators.'
    },
    
    // Toilets
    { 
      id: 'toilet-mf', name: 'Main Facilities', category: 'toilets', 
      description: 'Primary restroom facilities', 
      amenities: ['Accessibility Compliant', 'Baby Changing', 'Hand Sanitizer', 'Contactless Features'],
      companyDescription: 'Modern, accessible restroom facilities with contactless technology and sustainability features.'
    },
    { 
      id: 'toilet-dis', name: 'Accessible Facilities', category: 'toilets', 
      description: 'Fully accessible restroom facilities', 
      amenities: ['Wheelchair Accessible', 'Special Needs Support', 'Emergency Call System'],
      companyDescription: 'Specially designed accessible facilities ensuring comfort and independence for all users.'
    },
    
    // Other areas
    { 
      id: 'art-exhibit-1', name: 'SuperRare Gallery', category: 'art-exhbition', 
      description: 'Curated digital art and NFT exhibitions', 
      currentEvent: 'Generative Art Showcase - All Day', 
      amenities: ['NFT Displays', 'Artist Talks', 'Digital Art', 'Collector Meetups'],
      companyDescription: 'SuperRare is the digital art market on Ethereum, connecting artists and collectors through blockchain technology.'
    },
    { 
      id: 'swag', name: 'Ethereum Store', category: 'swag', 
      description: 'Official Ethereum merchandise and collectibles', 
      amenities: ['Limited Editions', 'NFT Collectibles', 'Apparel', 'Accessories'],
      companyDescription: 'The official Ethereum merchandise store featuring exclusive items and limited edition collectibles.'
    },
    
    // Entrances
    { 
      id: 'entrance-north', name: 'Main Reception', category: 'entrance', 
      description: 'Primary venue entrance with registration', 
      amenities: ['Registration Check', 'Welcome Desk', 'Information Kiosks', 'Security'],
      companyDescription: 'Main reception area providing comprehensive visitor services and event information.'
    },
    { 
      id: 'entrance-west', name: 'Accessibility Entrance', category: 'entrance', 
      description: 'Barrier-free entrance with full accessibility', 
      amenities: ['Wheelchair Access', 'Assisted Entry', 'Express Check-in', 'Accessibility Support'],
      companyDescription: 'Dedicated accessible entrance ensuring barrier-free access for all visitors.'
    },
    { 
      id: 'entrance-east', name: 'VIP Reception', category: 'entrance', 
      description: 'Exclusive entrance for speakers and VIP guests', 
      amenities: ['VIP Services', 'Speaker Check-in', 'Priority Access', 'Concierge'],
      companyDescription: 'Premium reception services for speakers, sponsors, and VIP attendees.'
    }
  ]

  // Filter categories based on SVG groups
  const filterCategories = [
    { key: 'cowork', label: 'Coworking', icon: Building2, color: 'bg-green-100 text-green-700' },
    { key: 'defi', label: 'DeFi', icon: Users, color: 'bg-blue-100 text-blue-700' },
    { key: 'biotech', label: 'BioTech', icon: Microscope, color: 'bg-purple-100 text-purple-700' },
    { key: 'hardware', label: 'Hardware', icon: Cpu, color: 'bg-orange-100 text-orange-700' },
    { key: 'coffee', label: 'Coffee', icon: Coffee, color: 'bg-red-100 text-red-700' },
    { key: 'fnb', label: 'Food & Drink', icon: Utensils, color: 'bg-pink-100 text-pink-700' },
    { key: 'toilets', label: 'Restrooms', icon: Users, color: 'bg-gray-100 text-gray-700' },
    { key: 'art-exhbition', label: 'Art Gallery', icon: Palette, color: 'bg-yellow-100 text-yellow-700' },
    { key: 'swag', label: 'Merchandise', icon: ShoppingBag, color: 'bg-indigo-100 text-indigo-700' },
    { key: 'entrance', label: 'Entrances', icon: LogIn, color: 'bg-teal-100 text-teal-700' }
  ]

  // Get POI color based on category
  const getPOIColor = (category: string) => {
    const categoryInfo = filterCategories.find(f => f.key === category)
    return categoryInfo ? categoryInfo.color : 'bg-gray-100 text-gray-700'
  }



  // Helper function to determine if a category should be dimmed
  const shouldDimCategory = (category: string) => {
    // If no filters are active, show everything at full opacity
    if (activeFilters.size === 0) return false
    // If filters are active, dim categories that aren't selected
    return !activeFilters.has(category)
  }

  // Toggle filter
  const toggleFilter = (category: string) => {
    const newFilters = new Set(activeFilters)
    if (newFilters.has(category)) {
      newFilters.delete(category)
    } else {
      newFilters.add(category)
    }
    setActiveFilters(newFilters)
  }

  // Handle POI click
  const handlePOIClick = (poi: POI) => {
    setSelectedPOI(poi)
    // Update URL hash for deep linking
    window.history.replaceState(null, '', `#map-${poi.id}`)
  }

  // Handle closing POI modal
  const closePOIModal = () => {
    setSelectedPOI(null)
    // Clear URL hash
    window.history.replaceState(null, '', window.location.pathname)
  }

  // Pan and zoom handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true)
    setLastPanPoint({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return
    
    const deltaX = e.clientX - lastPanPoint.x
    const deltaY = e.clientY - lastPanPoint.y
    
    setTransform(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }))
    
    setLastPanPoint({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    // Reduce zoom sensitivity for better trackpad experience
    const delta = e.deltaY > 0 ? 0.95 : 1.05
    const newScale = Math.max(0.5, Math.min(3, transform.scale * delta))
    
    setTransform(prev => ({ ...prev, scale: newScale }))
  }

  // Handle SVG element click
  const handleSVGElementClick = (elementId: string) => {
    const poi = pois.find(p => p.id === elementId)
    if (poi) {
      handlePOIClick(poi)
    }
  }

  // Helper function to render Lucide icons as SVG elements with dynamic sizing
  const renderIcon = (IconComponent: React.ComponentType<any>, x: number, y: number, baseSize: number = 16) => {
    const size = Math.max(8, Math.min(32, baseSize * transform.scale * 0.8))
    return (
      <foreignObject 
        x={x - size/2} 
        y={y - size/2} 
        width={size} 
        height={size}
        className="pointer-events-none"
      >
        <IconComponent 
          size={size} 
          className="text-gray-800 drop-shadow-sm" 
          style={{ filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))' }}
        />
      </foreignObject>
    )
  }

  // Handle deep linking on component mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#map-')) {
      const poiId = hash.substring(5)
      const poi = pois.find(p => p.id === poiId)
      if (poi) {
        setSelectedPOI(poi)
      }
    }
  }, [])

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateBack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Event Map</h1>
              <p className="text-white/90 text-sm">La Rural - Buenos Aires</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filterCategories.map((category) => {
              const isActive = activeFilters.has(category.key)
              const Icon = category.icon
              return (
                <button
                  key={category.key}
                  onClick={() => toggleFilter(category.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden bg-gray-50">
        <div
          className="w-full h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
          }}
        >
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 614 771"
            className="w-full h-full"
            style={{ minWidth: '614px', minHeight: '771px' }}
          >
            {/* Walls - always visible */}
            <g id="walls_" data-name="walls/">
              <path id="interior-wall-1" d="M109,769h502.63l-48.92-261.76,1.97-.37,49.33,264.13H107v-54H13v-2h94v-241h2v295ZM58,568h-2v-94h2v94ZM468,7l83.9,437.15-1.96.38L466.38,9h-138.38v-2h140ZM58,338h-2V63H0v-2h58v277ZM275,9H109v329h-2V9H14v-2h261v2Z" stroke="#666" strokeWidth="1" fill="none"/>
            </g>

            {/* Swag */}
            <g id="swag_" data-name="swag/" style={{ opacity: shouldDimCategory('swag') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect 
                id="swag" 
                x="175" y="706" width="67" height="62" 
                fill="#e0af7d" 
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSVGElementClick('swag')}
              />
              {transform.scale > 0.9 && !shouldDimCategory('swag') && 
                renderIcon(ShoppingBag, 208.5, 737, 18)
              }
            </g>

            {/* Art Exhibition */}
            <g id="art-exhbition_" data-name="art-exhbition/" style={{ opacity: shouldDimCategory('art-exhbition') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect 
                id="art-exhibit-1" 
                x="376.65" y="22.08" width="94" height="99.37" 
                transform="translate(-5.9 82.49) rotate(-11.04)" 
                fill="#eddab6"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSVGElementClick('art-exhibit-1')}
              />
              {transform.scale > 0.8 && !shouldDimCategory('art-exhbition') && 
                renderIcon(Palette, 424, 72, 20)
              }
            </g>

            {/* Toilets */}
            <g id="toilets_" data-name="toilets/" style={{ opacity: shouldDimCategory('toilets') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect 
                id="toilet-mf" 
                x="556.72" y="294.72" width="22" height="22" 
                transform="translate(-43.91 101.57) rotate(-9.84)" 
                fill="blue"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSVGElementClick('toilet-mf')}
              />
              {transform.scale > 1.2 && !shouldDimCategory('toilets') && 
                renderIcon(Users, 567.72, 305.72, 12)
              }
              
              <rect 
                id="toilet-dis" 
                x="561.72" y="319.72" width="22" height="22" 
                transform="translate(-48.11 102.79) rotate(-9.84)" 
                fill="blue"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSVGElementClick('toilet-dis')}
              />
              {transform.scale > 1.2 && !shouldDimCategory('toilets') && 
                renderIcon(Users, 572.72, 330.72, 12)
              }
            </g>

            {/* Food & Beverage */}
            <g id="fnb_" data-name="fnb/" style={{ opacity: shouldDimCategory('fnb') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect id="fnb-4" x="27" y="662" width="28" height="48" fill="#ff85a6" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('fnb-4')} />
              {transform.scale > 1.1 && !shouldDimCategory('fnb') && 
                renderIcon(Utensils, 41, 686, 16)
              }
              
              <rect id="fnb-3" x="27" y="569" width="28" height="88" fill="#ff85a6" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('fnb-3')} />
              {transform.scale > 0.9 && !shouldDimCategory('fnb') && 
                renderIcon(Utensils, 41, 613, 18)
              }
              
              <rect id="fnb-2" x="27" y="183" width="28" height="40" fill="#ff85a6" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('fnb-2')} />
              {transform.scale > 1.1 && !shouldDimCategory('fnb') && 
                renderIcon(Utensils, 41, 203, 14)
              }
              
              <rect id="fnb-1" x="20" y="70" width="34" height="40" fill="#ff85a6" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('fnb-1')} />
              {transform.scale > 1.0 && !shouldDimCategory('fnb') && 
                renderIcon(Utensils, 37, 90, 16)
              }
            </g>

            {/* DeFi */}
            <g id="defi_" data-name="defi/" style={{ opacity: shouldDimCategory('defi') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <path id="defi-8" d="M193,326l-20,35-17-10,20-35,17,10Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <path id="defi-7" d="M277.5,362l-17.5,10-20-35,17-10,20.5,35Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <path id="defi-4" d="M212,348l-22.5-13,10-18,23,13-10.5,18Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <rect id="defi-3" x="191.5" y="376" width="68" height="34" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <rect id="defi-2" x="157.5" y="376" width="33" height="14" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <rect id="defi-1" x="203.69" y="341.21" width="33" height="14" transform="translate(-191.47 364.79) rotate(-60)" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <path id="defi-6" d="M190.5,337l21,37.5h-42.5l21.5-37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
              <path id="defi-5" d="M236.5,338.5l21,37.5h-42.5l21.5-37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('defi-district')} />
            </g>

            {/* BioTech */}
            <g id="biotech_" data-name="biotech/" style={{ opacity: shouldDimCategory('biotech') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <path id="biotech-8" d="M240.5,256l20-35,17,10-20,35-17-10Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <path id="biotech-7" d="M156,220l17.5-10,20,35-17,10-20.5-35Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <path id="biotech-6" d="M221.5,234l22.5,13-10,18-23-13,10.5-18Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <rect id="biotech-5" x="174" y="172" width="68" height="34" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <rect id="biotech-4" x="243" y="192" width="33" height="14" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <rect id="biotech-3" x="196.81" y="226.79" width="33" height="14" transform="translate(-95.81 301.63) rotate(-60)" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <path id="biotech-2" d="M243,245l-21-37.5h42.5l-21.5,37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
              <path id="biotech-1" d="M197,243.5l-21-37.5h42.5l-21.5,37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('biotech-district')} />
            </g>

            {/* Hardware */}
            <g id="hardware_" data-name="hardware/" style={{ opacity: shouldDimCategory('hardware') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <path id="hardware-8" d="M240.5,618l20-35,17,10-20,35-17-10Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <path id="hardware-7" d="M156,582l17.5-10,20,35-17,10-20.5-35Z" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <path id="hardware-6" d="M221.5,596l22.5,13-10,18-23-13,10.5-18Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <rect id="hardware-5" x="174" y="534" width="68" height="34" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <rect id="hardware-4" x="243" y="554" width="33" height="14" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <rect id="hardware-3" x="196.81" y="588.79" width="33" height="14" transform="translate(-409.31 482.63) rotate(-60)" fill="#e82" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <path id="hardware-2" d="M243,607l-21-37.5h42.5l-21.5,37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
              <path id="hardware-1" d="M197,605.5l-21-37.5h42.5l-21.5,37.5Z" fill="#74acdf" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('hardware-district')} />
            </g>

            {/* Coffee */}
            <g id="coffee" style={{ opacity: shouldDimCategory('coffee') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect id="coffee-3" x="328" y="236" width="27" height="27" fill="#f50b0b" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coffee-stations')} />
              {transform.scale > 1.2 && !shouldDimCategory('coffee') && 
                renderIcon(Coffee, 341.5, 249.5, 12)
              }
              
              <rect id="coffee-2" x="328" y="236" width="27" height="27" fill="#f50b0b" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coffee-stations')} />
              {transform.scale > 1.2 && !shouldDimCategory('coffee') && 
                renderIcon(Coffee, 341.5, 249.5, 12)
              }
              
              <rect id="coffee-1" x="328" y="459" width="27" height="27" fill="#f50b0b" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coffee-stations')} />
              {transform.scale > 1.2 && !shouldDimCategory('coffee') && 
                renderIcon(Coffee, 341.5, 472.5, 12)
              }
            </g>

            {/* Coworking */}
            <g id="cowork" style={{ opacity: shouldDimCategory('cowork') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect id="cowork-8" x="146" y="104" width="100" height="34" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.0 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 196, 121, 16)
              }
              
              <rect id="cowork-7" x="328" y="206" width="27" height="27" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.2 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 341.5, 219.5, 12)
              }
              
              <rect id="cowork-6" x="321" y="266" width="41" height="42" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.1 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 341.5, 287, 14)
              }
              
              <rect id="cowork-5" x="321" y="328" width="41" height="42" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.1 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 341.5, 349, 14)
              }
              
              <rect id="cowork-4" x="328" y="429" width="28" height="27" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.2 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 342, 442.5, 12)
              }
              
              <rect id="cowork-3" x="328" y="520" width="28" height="27" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.2 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 342, 533.5, 12)
              }
              
              <rect id="cowork-2" x="410.68" y="457.02" width="100.63" height="33.17" transform="translate(-82.06 96.9) rotate(-11.02)" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.0 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 461, 473.6, 16)
              }
              
              <rect id="cowork-1" x="468" y="653" width="102" height="34" fill="#aaeba1" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('coworking-area')} />
              {transform.scale > 1.0 && !shouldDimCategory('cowork') && 
                renderIcon(Briefcase, 519, 670, 16)
              }
            </g>

            {/* Entrances */}
            <g id="entrance_" data-name="entrance/" style={{ opacity: shouldDimCategory('entrance') ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <rect id="entrance-east" x="555.82" y="441.73" width="34.18" height="62.65" transform="translate(-80.55 119.52) rotate(-11.13)" fill="#e5ec10" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('entrance-east')} />
              {transform.scale > 1.1 && !shouldDimCategory('entrance') && 
                renderIcon(DoorOpen, 573, 473, 14)
              }
              
              <rect id="entrance-north" x="275" y="0" width="53" height="17" fill="#e5ec10" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('entrance-north')} />
              {transform.scale > 1.0 && !shouldDimCategory('entrance') && 
                renderIcon(DoorOpen, 301.5, 8.5, 12)
              }
              
              <rect id="entrance-west" x="56" y="338" width="53" height="136" fill="#e5ec10" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSVGElementClick('entrance-west')} />
              {transform.scale > 0.8 && !shouldDimCategory('entrance') && 
                renderIcon(DoorOpen, 82.5, 406, 18)
              }
            </g>


          </svg>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale * 1.2) }))}
            className="bg-white shadow-md"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTransform(prev => ({ ...prev, scale: Math.max(0.5, prev.scale * 0.8) }))}
            className="bg-white shadow-md"
          >
            −
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTransform({ x: 0, y: 0, scale: 1 })}
            className="bg-white shadow-md"
          >
            ⌂
          </Button>
        </div>
      </div>

      {/* POI Detail Modal */}
      {selectedPOI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-end justify-center">
          <div className="bg-white rounded-t-lg max-w-lg w-full max-h-[calc(100vh-120px)] overflow-y-auto animate-slide-up mb-20">
            {/* Hero Image */}
            {selectedPOI.heroImage && (
              <div className="relative">
                <img 
                  src={selectedPOI.heroImage}
                  alt={selectedPOI.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                  onClick={closePOIModal}
                  className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 ${selectedPOI.heroImage ? '' : 'border-b'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getPOIColor(selectedPOI.category)}`}>
                  {filterCategories.find(f => f.key === selectedPOI.category)?.icon && 
                    React.createElement(filterCategories.find(f => f.key === selectedPOI.category)!.icon, { className: 'h-5 w-5' })
                  }
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedPOI.name}</h2>
                  <p className="text-sm text-gray-600 capitalize">{selectedPOI.category}</p>
                </div>
              </div>
              {!selectedPOI.heroImage && (
                <button
                  onClick={closePOIModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Description */}
              <div>
                <p className="text-gray-700">{selectedPOI.description}</p>
                {selectedPOI.details && (
                  <p className="text-sm text-gray-600 mt-2">{selectedPOI.details}</p>
                )}
              </div>

              {/* Company Description */}
              {selectedPOI.companyDescription && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">About</h4>
                  <p className="text-sm text-gray-700">{selectedPOI.companyDescription}</p>
                </div>
              )}

              {/* Companies List for Districts */}
              {selectedPOI.companies && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Companies Showcasing</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPOI.companies.map((company, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-white px-2 py-1 rounded border">
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Event */}
              {selectedPOI.currentEvent && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Current Event</h4>
                  <p className="text-sm text-blue-700">{selectedPOI.currentEvent}</p>
                </div>
              )}


            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventMap
