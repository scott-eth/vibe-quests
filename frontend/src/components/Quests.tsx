import React, { useState, useEffect, useRef } from 'react'
import { 
  Trophy, 
  Star, 
  CheckCircle, 
  Lock, 
  Zap, 
  Target,
  Gift,
  BookOpen,
  Sword,
  Shield,
  ArrowLeft,
  Play,
  Award,
  Gamepad2,
  Users,
  Camera,
  Heart,
  Palette,
  Eye,
  ExternalLink,
  X,
  Globe,
  Twitter,
  Github
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

type QuestlineType = 'onboarding' | 'showcase' | null

interface Quest {
  id: string
  title: string
  description: string
  status: 'active' | 'completed' | 'locked'
  progress: number
  maxProgress: number
  xpReward: number
  coinReward: number
  difficulty: 'easy' | 'medium' | 'hard'
  icon: React.ReactNode
}

interface CompanyInfo {
  name: string
  description: string
  website: string
  image: string
  twitter?: string
  github?: string
  discord?: string
}

// Company Information Database
const companyDatabase: Record<string, CompanyInfo> = {
  'Uniswap': {
    name: 'Uniswap',
    description: 'A decentralized trading protocol known for its role in facilitating automated trading of decentralized finance (DeFi) tokens.',
    website: 'https://uniswap.org',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/Uniswap',
    github: 'https://github.com/Uniswap'
  },
  'Aave': {
    name: 'Aave',
    description: 'An open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
    website: 'https://aave.com',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/AaveAave',
    github: 'https://github.com/aave'
  },
  'Arbitrum': {
    name: 'Arbitrum',
    description: 'A suite of Ethereum scaling solutions that enables high-throughput, low cost smart contracts while remaining trustlessly secure.',
    website: 'https://arbitrum.io',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/arbitrum',
    github: 'https://github.com/OffchainLabs'
  },
  'Foundation': {
    name: 'Foundation',
    description: 'A platform that pioneers new markets at the intersection of culture and crypto, starting with NFTs.',
    website: 'https://foundation.app',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/foundation'
  },
  'Lens': {
    name: 'Lens Protocol',
    description: 'A Web3 social graph on the Polygon Proof-of-Stake blockchain designed to empower creators to own the links between themselves and their community.',
    website: 'https://lens.xyz',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/LensProtocol',
    github: 'https://github.com/lens-protocol'
  },
  'Compound': {
    name: 'Compound',
    description: 'An algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications.',
    website: 'https://compound.finance',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/compoundfinance',
    github: 'https://github.com/compound-finance'
  },
  'MakerDAO': {
    name: 'MakerDAO',
    description: 'A decentralized organization dedicated to bringing stability to the cryptocurrency economy through the DAI stablecoin.',
    website: 'https://makerdao.com',
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/MakerDAO',
    github: 'https://github.com/makerdao'
  },
  'Optimism': {
    name: 'Optimism',
    description: 'A low-cost and lightning-fast Ethereum L2 blockchain built by Ethereum developers, for Ethereum developers.',
    website: 'https://optimism.io',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/Optimism',
    github: 'https://github.com/ethereum-optimism'
  },
  'Polygon': {
    name: 'Polygon',
    description: 'A decentralized platform that provides faster and cheaper transactions on Ethereum using Layer 2 sidechains.',
    website: 'https://polygon.technology',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/0xPolygon',
    github: 'https://github.com/maticnetwork'
  },
  'Farcaster': {
    name: 'Farcaster',
    description: 'A sufficiently decentralized social network built on Ethereum, designed for developers who want to build social apps.',
    website: 'https://farcaster.xyz',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/farcaster_xyz',
    github: 'https://github.com/farcasterxyz'
  },
  'SuperRare': {
    name: 'SuperRare',
    description: 'The digital art market on Ethereum. Collect and trade unique, single-edition digital artworks.',
    website: 'https://superrare.co',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/SuperRareLabs'
  },
  'Akash': {
    name: 'Akash Network',
    description: 'The worlds first decentralized cloud computing marketplace, leveraging 85% of underutilized cloud compute.',
    website: 'https://akash.network',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/akashnet_',
    github: 'https://github.com/akash-network'
  },
  'Curve': {
    name: 'Curve Finance',
    description: 'A decentralized exchange optimized for low slippage swaps between assets of similar value, like stablecoins.',
    website: 'https://curve.fi',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/CurveFinance',
    github: 'https://github.com/curvefi'
  },
  'Yearn': {
    name: 'Yearn Finance',
    description: 'A suite of products in DeFi that provides lending aggregation, yield generation, and insurance.',
    website: 'https://yearn.finance',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/yearnfi',
    github: 'https://github.com/yearn'
  },
  'zkSync': {
    name: 'zkSync',
    description: 'A Layer 2 scaling solution for Ethereum using zero-knowledge proofs to increase throughput and reduce costs.',
    website: 'https://zksync.io',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/zksync',
    github: 'https://github.com/matter-labs'
  },
  'StarkNet': {
    name: 'StarkNet',
    description: 'A permissionless decentralized ZK-Rollup operating as an L2 network over Ethereum.',
    website: 'https://starknet.io',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/StarkNetEco',
    github: 'https://github.com/starkware-libs'
  },
  'Mirror': {
    name: 'Mirror',
    description: 'A decentralized publishing platform where writers can monetize their content through crypto and NFTs.',
    website: 'https://mirror.xyz',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/mirror'
  },
  'Friend.tech': {
    name: 'Friend.tech',
    description: 'A decentralized social network where you can tokenize your social influence and trade shares of people.',
    website: 'https://friend.tech',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/friendtech'
  },
  'Cyberconnect': {
    name: 'CyberConnect',
    description: 'A decentralized social graph protocol that helps dApps bootstrap network effects and build personalized experiences.',
    website: 'https://cyberconnect.me',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/CyberConnectHQ',
    github: 'https://github.com/cyberconnecthq'
  },
  'Mastodon': {
    name: 'Mastodon',
    description: 'A free, open-source social network server based on ActivityPub. Part of the broader fediverse of interconnected social platforms.',
    website: 'https://mastodon.social',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/joinmastodon',
    github: 'https://github.com/mastodon'
  },
  'VitaDAO': {
    name: 'VitaDAO',
    description: 'A decentralized collective funding early stage longevity research, governed by $VITA token holders.',
    website: 'https://vitadao.com',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/VitaDAO'
  },
  'LabDAO': {
    name: 'LabDAO',
    description: 'A decentralized network of wet and dry lab researchers, engineers, and operators working to accelerate progress in the life sciences.',
    website: 'https://labdao.xyz',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/LabDAO_',
    github: 'https://github.com/labdao'
  },
  'Molecule': {
    name: 'Molecule Protocol',
    description: 'A decentralized biotech protocol enabling an open, collaborative drug development ecosystem using IP-NFTs.',
    website: 'https://molecule.to',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/molecule_dao'
  },
  'Art Blocks': {
    name: 'Art Blocks',
    description: 'A platform focused on genuinely programmable on-demand generative art that is stored immutably on the Ethereum Blockchain.',
    website: 'https://artblocks.io',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/ArtBlocks'
  },
  'Async': {
    name: 'Async Art',
    description: 'A new art movement built on blockchain technology. Create, discover and trade programmable art.',
    website: 'https://async.art',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/AsyncArt'
  },
  'Zora': {
    name: 'Zora',
    description: 'A decentralized protocol where anyone can create, buy, and sell NFTs. Built for creators, by creators.',
    website: 'https://zora.co',
    image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/ourzora',
    github: 'https://github.com/ourzora'
  },
  'Axie': {
    name: 'Axie Infinity',
    description: 'A Pokémon-inspired digital pet universe built on the Ethereum blockchain where players can collect, breed, and battle creatures called Axies.',
    website: 'https://axieinfinity.com',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/AxieInfinity'
  },
  'Sandbox': {
    name: 'The Sandbox',
    description: 'A virtual world where players can build, monetize and own their gaming experiences using NFTs and the $SAND token.',
    website: 'https://sandbox.game',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/TheSandboxGame'
  },
  'Decentraland': {
    name: 'Decentraland',
    description: 'A virtual reality platform powered by Ethereum. Create, explore, and trade in the first-ever virtual world owned by its users.',
    website: 'https://decentraland.org',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/decentraland',
    github: 'https://github.com/decentraland'
  },
  'Helium': {
    name: 'Helium Network',
    description: 'A decentralized wireless network for IoT devices, powered by a blockchain incentive model and a network of hotspots.',
    website: 'https://helium.com',
    image: 'https://images.unsplash.com/photo-1558618047-fd930336c4c0?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/helium',
    github: 'https://github.com/helium'
  },
  'Render': {
    name: 'Render Network',
    description: 'A decentralized GPU rendering network connecting artists and studios in need of compute power with mining partners.',
    website: 'https://rendernetwork.com',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/rendernetwork'
  },
  'Ocean': {
    name: 'Ocean Protocol',
    description: 'A decentralized data exchange protocol to unlock data for AI. Data owners can monetize their data while preserving privacy.',
    website: 'https://oceanprotocol.com',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/oceanprotocol',
    github: 'https://github.com/oceanprotocol'
  },
  'Golem': {
    name: 'Golem Network',
    description: 'A decentralized marketplace for computing power, where anyone can monetize their idle hardware or develop applications.',
    website: 'https://golem.network',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop',
    twitter: 'https://twitter.com/golemproject',
    github: 'https://github.com/golemfactory'
  }
}

// Onboarding Quests (6 quests)
const onboardingQuests: Quest[] = [
  {
    id: 'ob1',
    title: 'Welcome Aboard!',
    description: 'Complete your profile setup and add a profile picture',
    status: 'completed',
    progress: 1,
    maxProgress: 1,
    xpReward: 100,
    coinReward: 50,
    difficulty: 'easy',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'ob2',
    title: 'First Steps',
    description: 'Take a tour of the main features and navigation',
    status: 'completed',
    progress: 1,
    maxProgress: 1,
    xpReward: 150,
    coinReward: 75,
    difficulty: 'easy',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: 'ob3',
    title: 'Make Connections',
    description: 'Connect with other users in the community',
    status: 'active',
    progress: 1,
    maxProgress: 1,
    xpReward: 200,
    coinReward: 100,
    difficulty: 'easy',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'ob4',
    title: 'Customize Your Space',
    description: 'Personalize your settings and preferences',
    status: 'active',
    progress: 1,
    maxProgress: 1,
    xpReward: 250,
    coinReward: 125,
    difficulty: 'medium',
    icon: <Palette className="h-5 w-5" />
  },
  {
    id: 'ob5',
    title: 'Share Your Story',
    description: 'Create your first post or share content',
    status: 'active',
    progress: 1,
    maxProgress: 1,
    xpReward: 300,
    coinReward: 150,
    difficulty: 'medium',
    icon: <Camera className="h-5 w-5" />
  },
  {
    id: 'ob6',
    title: 'Become a Pro',
    description: 'Complete advanced tutorials and unlock premium features',
    status: 'active',
    progress: 1,
    maxProgress: 1,
    xpReward: 500,
    coinReward: 250,
    difficulty: 'hard',
    icon: <Award className="h-5 w-5" />
  }
]

// World's Fair Quest Sections (8 sections with 5-6 quests each)
const showcaseQuestSections = [
  {
    id: 'defi',
    title: 'DeFi',
    theme: 'from-green-500 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-900/20 to-emerald-900/20',
    quests: [
      { id: 'df1', title: 'Visit Uniswap Booth', description: 'Explore the automated market maker exhibit and learn about liquidity pools', status: 'completed' as const, progress: 1, maxProgress: 1, xpReward: 150, coinReward: 75, difficulty: 'easy' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'df2', title: 'Aave Experience Center', description: 'Discover lending and borrowing protocols at the Aave pavilion', status: 'completed' as const, progress: 1, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <Zap className="h-4 w-4" /> },
      { id: 'df3', title: 'Compound Treasury Demo', description: 'Experience yield farming at the Compound interactive showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 180, coinReward: 90, difficulty: 'medium' as const, icon: <Gift className="h-4 w-4" /> },
      { id: 'df4', title: 'MakerDAO Stability Tour', description: 'Learn about DAI stablecoin mechanics at MakerDAO booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'medium' as const, icon: <Shield className="h-4 w-4" /> },
      { id: 'df5', title: 'Curve Finance Workshop', description: 'Master stablecoin swaps at the Curve Finance educational center', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> },
      { id: 'df6', title: 'Yearn Vault Experience', description: 'Optimize your yield strategies at the Yearn Finance vault simulator', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 350, coinReward: 175, difficulty: 'hard' as const, icon: <Trophy className="h-4 w-4" /> }
    ]
  },
  {
    id: 'l2s',
    title: 'L2s',
    theme: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20',
    quests: [
      { id: 'l21', title: 'Arbitrum Speed Test', description: 'Experience lightning-fast transactions at the Arbitrum demo station', status: 'completed' as const, progress: 1, maxProgress: 1, xpReward: 140, coinReward: 70, difficulty: 'easy' as const, icon: <Zap className="h-4 w-4" /> },
      { id: 'l22', title: 'Optimism Builder Zone', description: 'Build your first dApp on Optimism at their developer workshop', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 250, coinReward: 125, difficulty: 'medium' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'l23', title: 'Polygon Solutions Hub', description: 'Explore multi-chain capabilities at the Polygon technology showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <BookOpen className="h-4 w-4" /> },
      { id: 'l24', title: 'zkSync Proof Gallery', description: 'Discover zero-knowledge proofs at the zkSync interactive exhibit', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 280, coinReward: 140, difficulty: 'hard' as const, icon: <Lock className="h-4 w-4" /> },
      { id: 'l25', title: 'StarkNet Cairo Lab', description: 'Learn Cairo programming at the StarkNet developer bootcamp', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 400, coinReward: 200, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    id: 'social',
    title: 'Social',
    theme: 'from-pink-500 to-rose-600',
    bgColor: 'bg-gradient-to-br from-pink-900/20 to-rose-900/20',
    quests: [
      { id: 's1', title: 'Lens Protocol Studio', description: 'Create your decentralized social profile at the Lens Protocol booth', status: 'active' as const, progress: 1, maxProgress: 1, xpReward: 120, coinReward: 60, difficulty: 'easy' as const, icon: <Users className="h-4 w-4" /> },
      { id: 's2', title: 'Farcaster Hub Visit', description: 'Join the decentralized social network conversation at Farcaster', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 180, coinReward: 90, difficulty: 'medium' as const, icon: <Heart className="h-4 w-4" /> },
      { id: 's3', title: 'Mirror Writing Room', description: 'Publish your first decentralized blog post at Mirror booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <BookOpen className="h-4 w-4" /> },
      { id: 's4', title: 'Friend.tech Showcase', description: 'Experience social token trading at the Friend.tech pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 250, coinReward: 125, difficulty: 'medium' as const, icon: <Star className="h-4 w-4" /> },
      { id: 's5', title: 'Cyberconnect Graph', description: 'Map your social connections at the Cyberconnect identity hub', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Target className="h-4 w-4" /> },
      { id: 's6', title: 'Mastodon Federation', description: 'Join the federated social network at the Mastodon community space', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'easy' as const, icon: <Users className="h-4 w-4" /> }
    ]
  },
  {
    id: 'biotech',
    title: 'Biotech',
    theme: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-gradient-to-br from-teal-900/20 to-cyan-900/20',
    quests: [
      { id: 'b1', title: 'VitaDAO Longevity Lab', description: 'Explore longevity research funding at the VitaDAO booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 180, coinReward: 90, difficulty: 'easy' as const, icon: <Heart className="h-4 w-4" /> },
      { id: 'b2', title: 'LabDAO Science Hub', description: 'Participate in decentralized scientific research at LabDAO', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 250, coinReward: 125, difficulty: 'medium' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'b3', title: 'Molecule Protocol', description: 'Discover IP-NFTs for biotech at the Molecule showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <Zap className="h-4 w-4" /> },
      { id: 'b4', title: 'Genomes.io Demo', description: 'Secure your genetic data at the Genomes.io privacy booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'medium' as const, icon: <Shield className="h-4 w-4" /> },
      { id: 'b5', title: 'PharmaLedger Network', description: 'Track pharmaceutical supply chains at PharmaLedger exhibit', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <BookOpen className="h-4 w-4" /> },
      { id: 'b6', title: 'CureDAO Research', description: 'Contribute to open health data at the CureDAO pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 350, coinReward: 175, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    id: 'arts',
    title: 'Arts',
    theme: 'from-purple-500 to-violet-600',
    bgColor: 'bg-gradient-to-br from-purple-900/20 to-violet-900/20',
    quests: [
      { id: 'a1', title: 'SuperRare Gallery Tour', description: 'Explore digital art masterpieces at the SuperRare gallery', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 160, coinReward: 80, difficulty: 'easy' as const, icon: <Palette className="h-4 w-4" /> },
      { id: 'a2', title: 'Foundation Auction House', description: 'Bid on exclusive artworks at the Foundation auction pavilion', status: 'completed' as const, progress: 1, maxProgress: 1, xpReward: 240, coinReward: 120, difficulty: 'medium' as const, icon: <Trophy className="h-4 w-4" /> },
      { id: 'a3', title: 'Art Blocks Generator', description: 'Create generative art at the Art Blocks interactive studio', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 280, coinReward: 140, difficulty: 'medium' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'a4', title: 'Async Art Canvas', description: 'Experience programmable art at the Async Art exhibition', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <Play className="h-4 w-4" /> },
      { id: 'a5', title: 'Zora Creator Space', description: 'Launch your NFT collection at the Zora creator workshop', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 320, coinReward: 160, difficulty: 'hard' as const, icon: <Star className="h-4 w-4" /> },
      { id: 'a6', title: 'KnownOrigin Showcase', description: 'Display your artwork at the KnownOrigin artist pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    id: 'gaming',
    title: 'Gaming',
    theme: 'from-orange-500 to-red-600',
    bgColor: 'bg-gradient-to-br from-orange-900/20 to-red-900/20',
    quests: [
      { id: 'g1', title: 'Axie Infinity Arena', description: 'Battle digital pets at the Axie Infinity gaming booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 150, coinReward: 75, difficulty: 'easy' as const, icon: <Gamepad2 className="h-4 w-4" /> },
      { id: 'g2', title: 'The Sandbox Estate', description: 'Build virtual worlds at The Sandbox metaverse pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'medium' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'g3', title: 'Decentraland Plaza', description: 'Explore virtual reality at the Decentraland experience center', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <Users className="h-4 w-4" /> },
      { id: 'g4', title: 'Gods Unchained Duel', description: 'Master card battles at the Gods Unchained tournament booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 180, coinReward: 90, difficulty: 'medium' as const, icon: <Sword className="h-4 w-4" /> },
      { id: 'g5', title: 'Illuvium Adventure', description: 'Capture creatures in the Illuvium gaming showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Trophy className="h-4 w-4" /> },
      { id: 'g6', title: 'Gala Games Arcade', description: 'Try multiple blockchain games at the Gala Games mega-booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 350, coinReward: 175, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy',
    theme: 'from-gray-600 to-slate-700',
    bgColor: 'bg-gradient-to-br from-gray-900/20 to-slate-900/20',
    quests: [
      { id: 'p1', title: 'Tornado Cash Demo', description: 'Learn about transaction privacy at the Tornado Cash exhibit', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'easy' as const, icon: <Lock className="h-4 w-4" /> },
      { id: 'p2', title: 'Zcash Shielded Booth', description: 'Experience private transactions at the Zcash privacy pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 250, coinReward: 125, difficulty: 'medium' as const, icon: <Shield className="h-4 w-4" /> },
      { id: 'p3', title: 'Monero Fungibility', description: 'Discover untraceable currency at the Monero showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'medium' as const, icon: <Eye className="h-4 w-4" /> },
      { id: 'p4', title: 'Secret Network Hub', description: 'Build private smart contracts at Secret Network developer zone', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'p5', title: 'Oasis Privacy Lab', description: 'Explore confidential computing at the Oasis Protocol booth', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 350, coinReward: 175, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    id: 'ai-hardware',
    title: 'AI + Hardware',
    theme: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20',
    quests: [
      { id: 'ah1', title: 'Bittensor Network', description: 'Train AI models collectively at the Bittensor machine learning hub', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 180, coinReward: 90, difficulty: 'easy' as const, icon: <Zap className="h-4 w-4" /> },
      { id: 'ah2', title: 'Helium IoT Booth', description: 'Deploy wireless networks at the Helium infrastructure pavilion', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 200, coinReward: 100, difficulty: 'medium' as const, icon: <Target className="h-4 w-4" /> },
      { id: 'ah3', title: 'Akash Computing', description: 'Rent decentralized compute at the Akash cloud marketplace', status: 'completed' as const, progress: 1, maxProgress: 1, xpReward: 240, coinReward: 120, difficulty: 'medium' as const, icon: <BookOpen className="h-4 w-4" /> },
      { id: 'ah4', title: 'Render Network GPU', description: 'Power 3D rendering at the Render Network graphics station', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 220, coinReward: 110, difficulty: 'medium' as const, icon: <Play className="h-4 w-4" /> },
      { id: 'ah5', title: 'Ocean Protocol Data', description: 'Monetize AI datasets at the Ocean Protocol data marketplace', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 300, coinReward: 150, difficulty: 'hard' as const, icon: <Star className="h-4 w-4" /> },
      { id: 'ah6', title: 'Golem Supercomputer', description: 'Access distributed computing at the Golem network showcase', status: 'active' as const, progress: 0, maxProgress: 1, xpReward: 350, coinReward: 175, difficulty: 'hard' as const, icon: <Award className="h-4 w-4" /> }
    ]
  }
]

// Hero Card Component for Landing Screen  
const HeroCard: React.FC<{
  title: string
  description: string
  imageUrl: string
  onClick: () => void
  className?: string
  progress?: { completed: number; total: number }
}> = ({ title, description, imageUrl, onClick, className = '', progress }) => {
  return (
    <div 
      className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${className}`}
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Progress Indicator - Top Right */}
      {progress && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
          <div className="text-xs text-white font-medium">
            {progress.completed}/{progress.total} completed
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Brand Stamp Component
const BrandStamp: React.FC<{ questTitle: string; isCompleted: boolean }> = ({ questTitle, isCompleted }) => {
  const getBrandInfo = (title: string) => {
    // DeFi brands
    if (title.includes('Uniswap')) return { name: 'UNI', color: 'bg-pink-500', textColor: 'text-pink-600' }
    if (title.includes('Aave')) return { name: 'AAVE', color: 'bg-purple-500', textColor: 'text-purple-600' }
    if (title.includes('Compound')) return { name: 'COMP', color: 'bg-green-600', textColor: 'text-green-600' }
    if (title.includes('MakerDAO')) return { name: 'MKR', color: 'bg-teal-500', textColor: 'text-teal-600' }
    if (title.includes('Curve')) return { name: 'CRV', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
    if (title.includes('Yearn')) return { name: 'YFI', color: 'bg-blue-600', textColor: 'text-blue-600' }
    
    // L2 brands
    if (title.includes('Arbitrum')) return { name: 'ARB', color: 'bg-blue-500', textColor: 'text-blue-600' }
    if (title.includes('Optimism')) return { name: 'OP', color: 'bg-red-500', textColor: 'text-red-600' }
    if (title.includes('Polygon')) return { name: 'MATIC', color: 'bg-purple-600', textColor: 'text-purple-600' }
    if (title.includes('zkSync')) return { name: 'ZK', color: 'bg-gray-700', textColor: 'text-gray-600' }
    if (title.includes('StarkNet')) return { name: 'STRK', color: 'bg-orange-500', textColor: 'text-orange-600' }
    
    // Social brands
    if (title.includes('Lens')) return { name: 'LENS', color: 'bg-green-500', textColor: 'text-green-600' }
    if (title.includes('Farcaster')) return { name: 'FC', color: 'bg-indigo-500', textColor: 'text-indigo-600' }
    if (title.includes('Mirror')) return { name: 'MIR', color: 'bg-slate-600', textColor: 'text-slate-600' }
    if (title.includes('Friend.tech')) return { name: 'FT', color: 'bg-blue-400', textColor: 'text-blue-600' }
    if (title.includes('Cyberconnect')) return { name: 'CYBER', color: 'bg-cyan-500', textColor: 'text-cyan-600' }
    if (title.includes('Mastodon')) return { name: 'MAST', color: 'bg-violet-500', textColor: 'text-violet-600' }
    
    // Biotech brands
    if (title.includes('VitaDAO')) return { name: 'VITA', color: 'bg-emerald-500', textColor: 'text-emerald-600' }
    if (title.includes('LabDAO')) return { name: 'LAB', color: 'bg-teal-600', textColor: 'text-teal-600' }
    if (title.includes('Molecule')) return { name: 'MOL', color: 'bg-cyan-600', textColor: 'text-cyan-600' }
    if (title.includes('Genomes')) return { name: 'GNOME', color: 'bg-blue-700', textColor: 'text-blue-600' }
    if (title.includes('PharmaLedger')) return { name: 'PHAR', color: 'bg-green-700', textColor: 'text-green-600' }
    if (title.includes('CureDAO')) return { name: 'CURE', color: 'bg-red-600', textColor: 'text-red-600' }
    
    // Arts brands
    if (title.includes('SuperRare')) return { name: 'RARE', color: 'bg-black', textColor: 'text-gray-600' }
    if (title.includes('Foundation')) return { name: 'FND', color: 'bg-gray-800', textColor: 'text-gray-600' }
    if (title.includes('Art Blocks')) return { name: 'ART', color: 'bg-rainbow-500', textColor: 'text-purple-600' }
    if (title.includes('Async')) return { name: 'ASYNC', color: 'bg-indigo-600', textColor: 'text-indigo-600' }
    if (title.includes('Zora')) return { name: 'ZORA', color: 'bg-pink-600', textColor: 'text-pink-600' }
    if (title.includes('KnownOrigin')) return { name: 'KO', color: 'bg-purple-700', textColor: 'text-purple-600' }
    
    // Gaming brands
    if (title.includes('Axie')) return { name: 'AXS', color: 'bg-blue-500', textColor: 'text-blue-600' }
    if (title.includes('Sandbox')) return { name: 'SAND', color: 'bg-yellow-600', textColor: 'text-yellow-600' }
    if (title.includes('Decentraland')) return { name: 'MANA', color: 'bg-orange-600', textColor: 'text-orange-600' }
    if (title.includes('Gods Unchained')) return { name: 'GODS', color: 'bg-red-700', textColor: 'text-red-600' }
    if (title.includes('Illuvium')) return { name: 'ILV', color: 'bg-purple-800', textColor: 'text-purple-600' }
    if (title.includes('Gala')) return { name: 'GALA', color: 'bg-green-800', textColor: 'text-green-600' }
    
    // Privacy brands
    if (title.includes('Tornado')) return { name: 'TORN', color: 'bg-gray-900', textColor: 'text-gray-600' }
    if (title.includes('Zcash')) return { name: 'ZEC', color: 'bg-yellow-700', textColor: 'text-yellow-600' }
    if (title.includes('Monero')) return { name: 'XMR', color: 'bg-orange-700', textColor: 'text-orange-600' }
    if (title.includes('Secret')) return { name: 'SCRT', color: 'bg-slate-700', textColor: 'text-slate-600' }
    if (title.includes('Oasis')) return { name: 'ROSE', color: 'bg-pink-700', textColor: 'text-pink-600' }
    
    // AI + Hardware brands
    if (title.includes('Bittensor')) return { name: 'TAO', color: 'bg-cyan-700', textColor: 'text-cyan-600' }
    if (title.includes('Helium')) return { name: 'HNT', color: 'bg-green-600', textColor: 'text-green-600' }
    if (title.includes('Akash')) return { name: 'AKT', color: 'bg-red-500', textColor: 'text-red-600' }
    if (title.includes('Render')) return { name: 'RNDR', color: 'bg-purple-600', textColor: 'text-purple-600' }
    if (title.includes('Ocean')) return { name: 'OCEAN', color: 'bg-blue-800', textColor: 'text-blue-600' }
    if (title.includes('Golem')) return { name: 'GLM', color: 'bg-indigo-700', textColor: 'text-indigo-600' }
    
    // Generic fallback
    const words = title.split(' ')
    const initials = words.slice(0, 2).map(w => w[0]).join('')
    return { name: initials.toUpperCase(), color: 'bg-gray-500', textColor: 'text-gray-600' }
  }

  const brand = getBrandInfo(questTitle)

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full ${brand.color} text-white font-bold text-xs flex items-center justify-center shadow-lg transform rotate-12 border-4 border-white`}>
          {brand.name}
        </div>
        <span className="text-xs text-green-600 font-medium mt-1">Collected!</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center opacity-40">
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
        <span className="text-xs text-gray-400 font-medium">{brand.name}</span>
      </div>
      <span className="text-xs text-gray-400 mt-1">To Do</span>
    </div>
  )
}

// Quest Card for Individual Quests
const QuestCard: React.FC<{ 
  quest: Quest; 
  compact?: boolean; 
  isShowcase?: boolean; 
  onLearnMore?: (questTitle: string) => void;
  onVerifyQuest?: (questId: string) => void;
}> = ({ quest, compact = false, isShowcase = false, onLearnMore, onVerifyQuest }) => {
  const progressPercentage = (quest.progress / quest.maxProgress) * 100
  
  const getStatusColor = (status: Quest['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'locked': return 'bg-gray-400'
    }
  }

  if (compact) {
    return (
      <Card className={`transition-all duration-200 ${
        quest.status === 'locked' ? 'opacity-60' : 'hover:shadow-md hover:scale-[1.01]'
      }`}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(quest.status)} text-white flex-shrink-0`}>
              {quest.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{quest.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{quest.description}</p>
            </div>
            
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {/* For showcase quests, show stamp instead of legacy buttons */}
              {isShowcase ? (
                <BrandStamp questTitle={quest.title} isCompleted={quest.status === 'completed'} />
              ) : (
                <>
                  {quest.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onLearnMore?.(quest.title)}
              className="flex-1 text-xs h-8"
            >
              Learn more
            </Button>
            <Button
              size="sm"
              onClick={() => onVerifyQuest?.(quest.id)}
              className="flex-1 text-xs h-8"
              disabled={quest.status === 'completed'}
            >
              {quest.status === 'completed' ? 'Verified' : 'Verify quest'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      quest.status === 'locked' ? 'opacity-60' : 'hover:scale-[1.02]'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(quest.status)} text-white`}>
              {quest.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{quest.title}</CardTitle>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {quest.status === 'completed' && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="mb-4">
          {quest.description}
        </CardDescription>
        
        {quest.status !== 'locked' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {quest.progress}/{quest.maxProgress}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-blue-600">
              <Zap className="h-4 w-4" />
              <span className="font-medium">{quest.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <Gift className="h-4 w-4" />
              <span className="font-medium">{quest.coinReward} coins</span>
            </div>
          </div>
          
          {quest.status === 'active' && (
            <Button size="sm" className="ml-auto">
              {quest.progress === quest.maxProgress ? 'Claim' : 'Continue'}
            </Button>
          )}
          {quest.status === 'completed' && (
            <Badge variant="secondary" className="ml-auto">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
          {quest.status === 'locked' && (
            <Badge variant="outline" className="ml-auto">
              <Lock className="h-3 w-3 mr-1" />
              Locked
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

// Prize Wheel Component
const PrizeWheel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30">
          <img 
            src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=200&auto=format&fit=crop"
            alt="Wheel of Fortune"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">🎊 Grand Prize Wheel! 🎊</h3>
        <p className="text-white/90 text-sm mb-4">
          Complete all onboarding quests to spin the wheel and win amazing rewards!
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <span>👕 T-shirts</span>
          <span>🎁 Swag</span>
          <span>🌟 Rare prizes!</span>
        </div>
      </div>
    </div>
  )
}

// Bottom Sheet Component
const CompanyBottomSheet: React.FC<{
  company: CompanyInfo | null
  isOpen: boolean
  onClose: () => void
}> = ({ company, isOpen, onClose }) => {
  if (!isOpen || !company) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
        {/* Hero Image */}
        <div className="relative h-48 rounded-t-3xl overflow-hidden">
          <img 
            src={company.image} 
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* Company Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-1">{company.name}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {company.description}
          </p>
          
          {/* Website Link */}
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Visit Website</span>
            <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
          </a>
          
          {/* Social Links */}
          {(company.twitter || company.github || company.discord) && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Follow & Connect</h4>
              <div className="flex gap-2">
                {company.twitter && (
                  <a
                    href={company.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {company.github && (
                  <a
                    href={company.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Rewards Data
const rewardsData = [
  { 
    milestone: 10, 
    title: 'Explorer Badge', 
    description: 'Early adopter NFT badge', 
    icon: '🏅',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?q=80&w=200&auto=format&fit=crop'
  },
  { 
    milestone: 20, 
    title: 'Premium Access', 
    description: '30 days of premium features', 
    icon: '⭐',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=200&auto=format&fit=crop'
  },
  { 
    milestone: 30, 
    title: 'Exclusive Merch', 
    description: "World's Fair commemorative t-shirt", 
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop'
  },
  { 
    milestone: 40, 
    title: 'VIP Status', 
    description: 'Access to exclusive events & channels', 
    icon: '👑',
    image: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=200&auto=format&fit=crop'
  },
  { 
    milestone: 46, 
    title: 'Grand Prize', 
          description: 'Trip to Ethereum Devconnect ARG + $1000 USDC', 
    icon: '🎁',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=200&auto=format&fit=crop'
  }
]

// Progress Summary Component
const ProgressSummary: React.FC<{ completedQuests: number; totalQuests: number }> = ({ completedQuests, totalQuests }) => {
  const nextReward = rewardsData.find(reward => completedQuests < reward.milestone)

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          {/* Left side - Compact Progress Info */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-gray-900">{completedQuests}</div>
            <div>
              <div className="text-sm font-semibold text-gray-700">of {totalQuests} quests</div>
              <div className="text-xs text-gray-500">completed</div>
            </div>
          </div>

          {/* Right side - Compact Next Reward */}
          {nextReward && (
                <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-medium text-gray-600">Next reward</div>
                <div className="font-semibold text-sm text-gray-900">{nextReward.title}</div>
                <div className="text-xs text-gray-500">
                  {nextReward.milestone - completedQuests} more to go
                  </div>
                  </div>
              <div className="relative">
                <img 
                  src={nextReward.image} 
                  alt={nextReward.title}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-md"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {nextReward.milestone}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Sticky Navigation Component
const StickyNavigation: React.FC<{ 
  sections: Array<{id: string, title: string, emoji: string}>
  activeSection: string 
}> = ({ sections, activeSection }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for sticky navigation
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Auto-scroll navigation to keep active button visible
  useEffect(() => {
    if (!activeSection || !scrollContainerRef.current) return

    // Use requestAnimationFrame to ensure DOM has updated after activeSection change
    const scrollToActiveButton = () => {
      const container = scrollContainerRef.current
      if (!container) return

      // Find the active button by data attribute instead of ref (more reliable)
      const activeButton = container.querySelector(`[data-section-id="${activeSection}"]`) as HTMLButtonElement
      if (!activeButton) return

      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      
      // Calculate container dimensions and button position
      const containerWidth = container.clientWidth
      const buttonOffsetLeft = activeButton.offsetLeft
      const buttonWidth = activeButton.offsetWidth
      
      // Only scroll if button is not fully visible
      const isFullyVisible = 
        buttonRect.left >= containerRect.left && 
        buttonRect.right <= containerRect.right

      if (!isFullyVisible) {
        // Check if button is cut off on the left side
        if (buttonRect.left < containerRect.left) {
          // Scroll left to show the button with some padding
          const targetScrollLeft = buttonOffsetLeft - 16 // 16px padding
          container.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'smooth'
          })
        }
        // Check if button is cut off on the right side  
        else if (buttonRect.right > containerRect.right) {
          // Scroll right to show the button with some padding
          const targetScrollLeft = buttonOffsetLeft + buttonWidth - containerWidth + 16 // 16px padding
          container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          })
        }
      }
    }

    // Use requestAnimationFrame to ensure the DOM updates are complete
    requestAnimationFrame(scrollToActiveButton)
  }, [activeSection])

  const allSections = [...sections, { id: 'rewards-section', title: 'Rewards', emoji: '🏆' }]

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto pb-1" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allSections.map((section) => {
            const isActive = section.id === activeSection
            return (
              <button
                key={section.id}
                data-section-id={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                  isActive 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700'
                }`}
              >
                <span>{section.emoji}</span>
                <span>{section.title}</span>
              </button>
            )
          })}
                  </div>
                  </div>
                </div>
  )
}

// Rewards Tracker Component
const RewardsTracker: React.FC<{ completedQuests: number }> = ({ completedQuests }) => {
  const rewards = rewardsData

  const getRewardStatus = (milestone: number) => {
    if (completedQuests >= milestone) return 'completed'
    if (milestone === rewards.find(r => r.milestone > completedQuests)?.milestone) return 'next'
    return 'locked'
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🏆 Quest Rewards</h3>
        <p className="text-gray-600">Complete quests to unlock amazing rewards</p>
                  </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {rewards.map((reward) => {
          const status = getRewardStatus(reward.milestone)
          
          return (
            <div key={reward.milestone} className="relative flex items-start mb-6 last:mb-0">
              {/* Timeline Node */}
              <div className={`
                relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 text-lg
                ${status === 'completed' ? 'bg-green-500 border-green-200 text-white' : ''}
                ${status === 'next' ? 'bg-blue-500 border-blue-200 text-white animate-pulse' : ''}
                ${status === 'locked' ? 'bg-gray-100 border-gray-200 text-gray-400' : ''}
              `}>
                {status === 'completed' ? '✓' : reward.icon}
                  </div>
              
              {/* Content */}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold ${status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {reward.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      status === 'completed' ? 'bg-green-100 text-green-700' :
                      status === 'next' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {status === 'completed' ? 'Earned' : status === 'next' ? 'Next reward' : 'Locked'}
                    </span>
                    <span className={`text-xs font-medium ${status === 'locked' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {reward.milestone === 46 ? 'All' : reward.milestone} quests
                    </span>
                </div>
          </div>
                <p className={`text-sm ${status === 'locked' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {reward.description}
                </p>
                
                {/* Progress bar for next reward */}
                {status === 'next' && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{completedQuests} / {reward.milestone}</span>
        </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(completedQuests / reward.milestone) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Quests: React.FC = () => {
  const [activeQuestline, setActiveQuestline] = useState<QuestlineType>(null)
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  // Calculate onboarding progress (removed unused variable)

  // Scroll detection for active section highlighting
  useEffect(() => {
    if (activeQuestline !== 'showcase') return

    const handleScroll = () => {
      const sections = [...showcaseQuestSections.map(s => s.id), 'rewards-section']
      let currentSection = ''
      let maxVisibleArea = 0
      
      // Find the section with the most visible area in the viewport
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          
          // Calculate visible area of this section
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(viewportHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          // Only consider sections that are actually visible
          if (visibleHeight > 0) {
            // For sections near the top of viewport, give them priority
            let score = visibleHeight
            if (rect.top <= viewportHeight * 0.3) {
              score *= 1.5 // Boost sections in the upper part of viewport
            }
            
            if (score > maxVisibleArea) {
              maxVisibleArea = score
              currentSection = sectionId
            }
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    // Use throttling to improve performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [activeQuestline, activeSection])

  // Helper function to get company info from quest title
  const getCompanyFromTitle = (title: string): CompanyInfo | null => {
    for (const [companyName, companyInfo] of Object.entries(companyDatabase)) {
      if (title.includes(companyName)) {
        return companyInfo
      }
    }
    return null
  }

  // Handle learn more click
  const handleLearnMore = (questTitle: string) => {
    const company = getCompanyFromTitle(questTitle)
    if (company) {
      setSelectedCompany(company)
      setIsBottomSheetOpen(true)
    }
  }

  // Handle verify quest click
  const handleVerifyQuest = (questId: string) => {
    // This would typically integrate with quest verification logic
    console.log('Verifying quest:', questId)
    // For now, just show a placeholder
    alert('Quest verification would happen here!')
  }

  // Landing Screen Component
  const LandingScreen = () => {
    // Calculate progress for each questline
    const onboardingCompleted = onboardingQuests.filter(q => q.status === 'completed').length
    const onboardingTotal = onboardingQuests.length
    
    const showcaseCompleted = showcaseQuestSections.reduce((total, section) => 
      total + section.quests.filter(q => q.status === 'completed').length, 0
    )
    const showcaseTotal = showcaseQuestSections.reduce((total, section) => total + section.quests.length, 0)

    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Hero Image Header */}
        <div className="relative h-[200px] w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/70 to-indigo-900/80" />
          
          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center text-white max-w-4xl">
              <h1 className="text-[36px] font-bold mb-[8px]">Quests</h1>
              <p className="text-[16px] text-white/90 leading-relaxed max-w-3xl mx-auto">
                Embark on your adventure to learn how Ethereum can power everyday life and the city of the future
              </p>
            </div>
          </div>
        </div>

        {/* Hero Cards */}
        <div className="px-4 py-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HeroCard
                title="Onboarding"
                description="Start your journey with guided missions designed to help you master the basics and unlock your potential."
                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                onClick={() => setActiveQuestline('onboarding')}
                className="transform transition-all duration-500 hover:shadow-purple-500/25"
                progress={{ completed: onboardingCompleted, total: onboardingTotal }}
              />
              
              <HeroCard
                title="App Showcase"
                description="Explore the future of technology by visiting brand booths and pavilions across eight cutting-edge sectors."
                imageUrl="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"
                onClick={() => setActiveQuestline('showcase')}
                className="transform transition-all duration-500 hover:shadow-blue-500/25"
                progress={{ completed: showcaseCompleted, total: showcaseTotal }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Questline Screen
  const OnboardingScreen = () => {
    const completedOnboardingQuests = onboardingQuests.filter(q => q.status === 'completed').length
    const totalOnboardingQuests = onboardingQuests.length

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 pb-24">
        {/* Header with back button */}
        <div className="bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveQuestline(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Quests
              </Button>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Onboarding Journey</h1>
              <p className="text-muted-foreground mb-4">Complete all steps to unlock the prize wheel!</p>
            </div>
          </div>
        </div>

        {/* Sticky Progress Summary */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                {/* Left side - Progress Info */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-gray-900">{completedOnboardingQuests}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700">of {totalOnboardingQuests} quests</div>
                    <div className="text-xs text-gray-500">completed</div>
                  </div>
                </div>

                {/* Right side - Prize Wheel Info */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-600">
                      {completedOnboardingQuests === totalOnboardingQuests ? 'Prize unlocked!' : 'Complete all for'}
                    </div>
                    <div className="font-semibold text-sm text-gray-900">Prize Wheel</div>
                    <div className="text-xs text-gray-500">
                      {completedOnboardingQuests === totalOnboardingQuests ? 'Ready to spin!' : `${totalOnboardingQuests - completedOnboardingQuests} more to go`}
                    </div>
                  </div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border-2 shadow-md ${
                      completedOnboardingQuests === totalOnboardingQuests 
                        ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-yellow-300 animate-pulse' 
                        : 'bg-gray-100 border-gray-200'
                    }`}>
                      🎊
                    </div>
                    {completedOnboardingQuests === totalOnboardingQuests && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Quest Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onboardingQuests.map((quest) => (
              <QuestCard 
                key={quest.id} 
                quest={quest} 
                compact 
                isShowcase={false}
                onLearnMore={handleLearnMore}
                onVerifyQuest={handleVerifyQuest}
              />
            ))}
          </div>

          {/* Prize Wheel */}
          <div className="mt-8">
            <PrizeWheel />
          </div>
        </div>
      </div>
    )
  }

  // Showcase Questline Screen
  const ShowcaseScreen = () => {
    // Calculate total quests and completed quests
    const totalQuests = showcaseQuestSections.reduce((total, section) => total + section.quests.length, 0)
    const completedQuests = showcaseQuestSections.reduce((total, section) => 
      total + section.quests.filter(q => q.status === 'completed').length, 0
    )

    // Prepare section data for navigation
    const navigationSections = showcaseQuestSections.map(section => ({
      id: section.id,
      title: section.title,
      emoji: section.id === 'defi' ? '💰' :
             section.id === 'l2s' ? '⚡' :
             section.id === 'social' ? '🌐' :
             section.id === 'biotech' ? '🧬' :
             section.id === 'arts' ? '🎨' :
             section.id === 'gaming' ? '🎮' :
             section.id === 'privacy' ? '🔒' :
             section.id === 'ai-hardware' ? '🤖' : '📋'
    }))

    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header with back button */}
        <div className="bg-background border-b">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveQuestline(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Quests
              </Button>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">World's Fair Adventures</h1>
              <p className="text-muted-foreground">Visit booths, explore exhibits, and discover the future across different sectors</p>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <StickyNavigation sections={navigationSections} activeSection={activeSection} />

        <div className="max-w-6xl mx-auto p-4">
          {/* Progress Summary */}
          <ProgressSummary completedQuests={completedQuests} totalQuests={totalQuests} />
        </div>

        <div className="max-w-6xl mx-auto">
        {/* Themed Sections */}
        {showcaseQuestSections.map((section) => {
          const completedCount = section.quests.filter(q => q.status === 'completed').length
          const totalCount = section.quests.length
          const progressPercentage = (completedCount / totalCount) * 100

          return (
            <div 
              key={section.id}
              id={section.id}
              className={`${section.bgColor} transition-all duration-700 ease-in-out scroll-mt-20`}
            >
              <div className="p-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                  {/* Left side - Title and Icon */}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.theme} text-white`}>
                      <div className="text-xl">
                        {section.id === 'defi' && '💰'}
                        {section.id === 'l2s' && '⚡'}
                        {section.id === 'social' && '🌐'}
                        {section.id === 'biotech' && '🧬'}
                        {section.id === 'arts' && '🎨'}
                        {section.id === 'gaming' && '🎮'}
                        {section.id === 'privacy' && '🔒'}
                        {section.id === 'ai-hardware' && '🤖'}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  
                  {/* Right side - Progress Indicator */}
                  <div className="text-right min-w-[120px]">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {completedCount} of {totalCount}
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${section.theme} transition-all duration-300`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                {/* Quest Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.quests.map((quest) => (
                    <QuestCard 
                      key={quest.id} 
                      quest={quest} 
                      compact 
                      isShowcase={true}
                      onLearnMore={handleLearnMore}
                      onVerifyQuest={handleVerifyQuest}
                    />
              ))}
            </div>
              </div>
            </div>
          )
        })}
        
        {/* Rewards Tracker */}
        <div id="rewards-section" className="py-12 bg-gray-50 scroll-mt-20 mx-5">
          <RewardsTracker 
            completedQuests={showcaseQuestSections.reduce((total, section) => 
              total + section.quests.filter(q => q.status === 'completed').length, 0
            )} 
          />
        </div>
      </div>
    </div>
  )
  }

  // Render appropriate screen based on state
  if (activeQuestline === 'onboarding') {
    return (
      <>
        <OnboardingScreen />
        <CompanyBottomSheet
          company={selectedCompany}
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      </>
    )
  }
  
  if (activeQuestline === 'showcase') {
    return (
      <>
        <ShowcaseScreen />
        <CompanyBottomSheet
          company={selectedCompany}
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <LandingScreen />
      <CompanyBottomSheet
        company={selectedCompany}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  )
}

export default Quests