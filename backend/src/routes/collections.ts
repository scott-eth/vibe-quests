import { Router } from 'express'
import { dataStore } from '../data/store'
import { authenticateToken } from '../middleware/auth'
import { ApiResponse, AuthRequest } from '../types'

const router = Router()

// Collection item interface
interface CollectionItem {
  id: string
  name: string
  description: string
  image: string
  type: 'poap' | 'nft' | 'swag' | 'voucher'
  metadata?: any
  acquiredAt: Date
}

// Mock collections data store (in production, this would be in the database)
const userCollections = new Map<string, CollectionItem[]>()

// Initialize demo collections
const initializeDemoCollections = (userId: string) => {
  if (userCollections.has(userId)) return

  const demoCollections: CollectionItem[] = [
    // POAPs
    {
      id: 'poap-1',
      name: "DevConnect Opening Ceremony",
      description: "Attended the opening ceremony",
      image: "https://images.unsplash.com/photo-1558618047-fd930336c4c0?w=80&h=80&auto=format&fit=crop",
      type: 'poap',
      acquiredAt: new Date()
    },
    {
      id: 'poap-2',
      name: "Workshop: DeFi Deep Dive",
      description: "Completed DeFi workshop",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=80&auto=format&fit=crop",
      type: 'poap',
      acquiredAt: new Date()
    },
    // NFTs
    {
      id: 'nft-1',
      name: "Ethereum Genesis",
      description: "Limited edition NFT artwork",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=80&h=80&auto=format&fit=crop",
      type: 'nft',
      acquiredAt: new Date()
    },
    {
      id: 'nft-2',
      name: "Web3 Builder",
      description: "Community builder recognition",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&auto=format&fit=crop",
      type: 'nft',
      acquiredAt: new Date()
    },
    // Swag
    {
      id: 'swag-1',
      name: "DevConnect T-Shirt",
      description: "Official event merchandise",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&auto=format&fit=crop",
      type: 'swag',
      acquiredAt: new Date()
    },
    {
      id: 'swag-2',
      name: "Ethereum Sticker Pack",
      description: "Collection of branded stickers",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=80&h=80&auto=format&fit=crop",
      type: 'swag',
      acquiredAt: new Date()
    },
    // Vouchers
    {
      id: 'voucher-1',
      name: "Coffee Shop Voucher",
      description: "$10 credit at event cafe",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&h=80&auto=format&fit=crop",
      type: 'voucher',
      acquiredAt: new Date()
    },
    {
      id: 'voucher-2',
      name: "Food Truck Discount",
      description: "20% off next purchase",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&auto=format&fit=crop",
      type: 'voucher',
      acquiredAt: new Date()
    }
  ]

  userCollections.set(userId, demoCollections)
}

// GET /api/collections - Get all user collections
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    
    // Initialize demo collections if they don't exist
    initializeDemoCollections(userId)
    
    const collections = userCollections.get(userId) || []
    
    // Group collections by type
    const groupedCollections = {
      poaps: collections.filter(item => item.type === 'poap'),
      nfts: collections.filter(item => item.type === 'nft'),
      swag: collections.filter(item => item.type === 'swag'),
      vouchers: collections.filter(item => item.type === 'voucher')
    }

    res.json({
      success: true,
      data: groupedCollections
    } as ApiResponse)

  } catch (error) {
    console.error('Collections fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/collections/:type - Get collections by type
router.get('/:type', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const type = req.params.type as 'poap' | 'nft' | 'swag' | 'voucher'
    
    if (!['poap', 'nft', 'swag', 'voucher'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid collection type'
      } as ApiResponse)
    }
    
    // Initialize demo collections if they don't exist
    initializeDemoCollections(userId)
    
    const collections = userCollections.get(userId) || []
    const filteredCollections = collections.filter(item => item.type === type)

    res.json({
      success: true,
      data: filteredCollections
    } as ApiResponse)

  } catch (error) {
    console.error('Collections fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/collections - Add new collection item
router.post('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const { name, description, image, type, metadata } = req.body
    
    if (!name || !type || !['poap', 'nft', 'swag', 'voucher'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Name and valid type are required'
      } as ApiResponse)
    }
    
    // Initialize demo collections if they don't exist
    initializeDemoCollections(userId)
    
    const collections = userCollections.get(userId) || []
    
    const newItem: CollectionItem = {
      id: `${type}-${Date.now()}`,
      name,
      description: description || '',
      image: image || '',
      type,
      metadata,
      acquiredAt: new Date()
    }
    
    collections.push(newItem)
    userCollections.set(userId, collections)

    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Collection item added successfully'
    } as ApiResponse)

  } catch (error) {
    console.error('Add collection item error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/collections/stats - Get collection statistics
router.get('/user/stats', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    
    // Initialize demo collections if they don't exist
    initializeDemoCollections(userId)
    
    const collections = userCollections.get(userId) || []
    
    const stats = {
      total: collections.length,
      byType: {
        poaps: collections.filter(item => item.type === 'poap').length,
        nfts: collections.filter(item => item.type === 'nft').length,
        swag: collections.filter(item => item.type === 'swag').length,
        vouchers: collections.filter(item => item.type === 'voucher').length
      },
      recentlyAcquired: collections
        .filter(item => new Date(item.acquiredAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .length
    }

    res.json({
      success: true,
      data: stats
    } as ApiResponse)

  } catch (error) {
    console.error('Collection stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router
