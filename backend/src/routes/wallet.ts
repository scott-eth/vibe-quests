import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { dataStore } from '../data/store'
import { AuthRequest, authenticateToken } from '../middleware/auth'
import { ApiResponse } from '../types'

const router = Router()

// GET /api/wallet - Get user's wallet information
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const user = req.user
    
    if (!user.walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'No wallet connected to this account'
      } as ApiResponse)
    }

    let wallet = dataStore.getUserWallet(userId)
    
    // Create wallet if it doesn't exist
    if (!wallet) {
      wallet = dataStore.createUserWallet(userId, user.walletAddress)
    }

    res.json({
      success: true,
      data: wallet
    } as ApiResponse)

  } catch (error) {
    console.error('Wallet fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/wallet/balance - Get wallet balance
router.get('/balance', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const wallet = dataStore.getUserWallet(userId)
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: {
        address: wallet.address,
        balance: wallet.balance
      }
    } as ApiResponse)

  } catch (error) {
    console.error('Balance fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/wallet/transactions - Get transaction history
router.get('/transactions', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const wallet = dataStore.getUserWallet(userId)
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      } as ApiResponse)
    }

    // Sort transactions by timestamp (most recent first)
    const sortedTransactions = [...wallet.transactions].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    res.json({
      success: true,
      data: sortedTransactions
    } as ApiResponse)

  } catch (error) {
    console.error('Transactions fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/wallet/nfts - Get user's NFT collections
router.get('/nfts', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const wallet = dataStore.getUserWallet(userId)
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      } as ApiResponse)
    }

    res.json({
      success: true,
      data: wallet.nfts
    } as ApiResponse)

  } catch (error) {
    console.error('NFTs fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/wallet/rewards - Distribute quest rewards (internal endpoint)
router.post('/rewards', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const { amount, type, description, token = 'ETH' } = req.body
    
    if (!amount || !type || !description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, type, description'
      } as ApiResponse)
    }

    let wallet = dataStore.getUserWallet(userId)
    
    if (!wallet) {
      const user = req.user
      if (!user.walletAddress) {
        return res.status(400).json({
          success: false,
          error: 'No wallet connected'
        } as ApiResponse)
      }
      wallet = dataStore.createUserWallet(userId, user.walletAddress)
    }

    // Create reward transaction
    const transaction = {
      id: uuidv4(),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock transaction hash
      type: type as 'quest_reward' | 'event_payment' | 'nft_mint' | 'transfer',
      amount: parseFloat(amount),
      token,
      status: 'confirmed' as const,
      timestamp: new Date(),
      description
    }

    // Add transaction to wallet
    wallet.transactions.push(transaction)

    // Update balance if it's ETH or a known token
    if (token === 'ETH') {
      wallet.balance.eth += parseFloat(amount)
    } else {
      const tokenIndex = wallet.balance.tokens.findIndex(t => t.symbol === token)
      if (tokenIndex >= 0) {
        wallet.balance.tokens[tokenIndex].balance += parseFloat(amount)
      }
    }

    res.status(201).json({
      success: true,
      data: {
        transaction,
        newBalance: wallet.balance
      },
      message: `Reward distributed: +${amount} ${token}`
    } as ApiResponse)

  } catch (error) {
    console.error('Reward distribution error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// POST /api/wallet/connect - Connect a new wallet address
router.post('/connect', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const { address } = req.body
    
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid wallet address format'
      } as ApiResponse)
    }

    // Check if address is already connected to another user
    const existingUser = dataStore.getUserByWallet(address)
    if (existingUser && existingUser.id !== userId) {
      return res.status(409).json({
        success: false,
        error: 'Wallet address already connected to another account'
      } as ApiResponse)
    }

    // Update user's wallet address
    const updatedUser = dataStore.updateUser(userId, {
      walletAddress: address,
      authMethod: 'wallet'
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse)
    }

    // Create or update wallet
    let wallet = dataStore.getUserWallet(userId)
    if (!wallet) {
      wallet = dataStore.createUserWallet(userId, address)
    }

    res.json({
      success: true,
      data: {
        address,
        connected: true,
        wallet: wallet
      },
      message: 'Wallet connected successfully'
    } as ApiResponse)

  } catch (error) {
    console.error('Wallet connection error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

// GET /api/wallet/stats - Get wallet statistics
router.get('/stats', authenticateToken, (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const wallet = dataStore.getUserWallet(userId)
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      } as ApiResponse)
    }

    const stats = {
      totalTransactions: wallet.transactions.length,
      totalValue: wallet.balance.eth + wallet.balance.tokens.reduce((sum, token) => sum + token.balance, 0),
      recentTransactions: wallet.transactions
        .filter(tx => new Date(tx.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .length,
      questRewards: wallet.transactions.filter(tx => tx.type === 'quest_reward').length,
      nftCollections: wallet.nfts.length,
      totalNFTs: wallet.nfts.reduce((sum, collection) => sum + collection.tokens.length, 0),
      transactionsByType: {
        quest_reward: wallet.transactions.filter(tx => tx.type === 'quest_reward').length,
        event_payment: wallet.transactions.filter(tx => tx.type === 'event_payment').length,
        nft_mint: wallet.transactions.filter(tx => tx.type === 'nft_mint').length,
        transfer: wallet.transactions.filter(tx => tx.type === 'transfer').length
      }
    }

    res.json({
      success: true,
      data: stats
    } as ApiResponse)

  } catch (error) {
    console.error('Wallet stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse)
  }
})

export default router