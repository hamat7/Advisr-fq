'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Dashboard from '@/components/dashboard'
import WalletModal from '@/components/wallet-modal'
import type { Advisor, WalletInfo } from '@/app/page'

export default function DashboardPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  const [advisors] = useState<Advisor[]>([
    { name: "Sarah Johnson, CFA", hederaId: "0.0.123456", region: "North America", certified: true },
    { name: "Michael Chen, CFP", hederaId: "0.0.789012", region: "Asia Pacific", certified: false },
    { name: "Elena Rodriguez, CIMA", hederaId: "0.0.345678", region: "Europe", certified: true },
    { name: "David Kim, ChFC", hederaId: "0.0.456789", region: "Asia Pacific", certified: true },
    { name: "Maria Santos, CFP", hederaId: "0.0.567890", region: "South America", certified: false },
    { name: "James Wilson, CFA", hederaId: "0.0.678901", region: "North America", certified: true },
    { name: "Anna Kowalski, CIMA", hederaId: "0.0.789012", region: "Europe", certified: true },
    { name: "Ahmed Hassan, CFP", hederaId: "0.0.890123", region: "Middle East", certified: false },
  ])

  const connectWallet = () => {
    setShowWalletModal(true)
  }

  const closeModal = () => {
    setShowWalletModal(false)
  }

  const handleWalletConnect = (walletType: 'metamask' | 'hashpack' | 'blade') => {
    const walletAddresses = {
      metamask: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      hashpack: '0.0.123456',
      blade: '0x8D4C0532925a3b8D4C0532925a3b8D4C0532925'
    }

    const newWalletInfo: WalletInfo = {
      address: walletAddresses[walletType],
      type: walletType,
      balance: '1,234.56 HBAR'
    }

    setWalletInfo(newWalletInfo)
    setIsWalletConnected(true)
    setShowWalletModal(false)
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletInfo(null)
  }

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advisor.hederaId.includes(searchTerm)
    const matchesRegion = !filterRegion || advisor.region === filterRegion
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'certified' && advisor.certified) ||
                         (filterStatus === 'pending' && !advisor.certified)
    
    return matchesSearch && matchesRegion && matchesStatus
  })

  const regions = [...new Set(advisors.map(a => a.region))]

  return (
    <div className="min-h-screen">
      <Navigation 
        isWalletConnected={isWalletConnected}
        walletInfo={walletInfo}
        onConnectWallet={connectWallet}
        onDisconnectWallet={disconnectWallet}
      />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Registry Dashboard
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore our comprehensive registry of certified investment advisors worldwide.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 backdrop-blur-20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Search Advisors
                </label>
                <input
                  type="text"
                  placeholder="Search by name or Hedera ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-glass-bg border border-border-subtle rounded-lg text-white placeholder-text-muted focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Region
                </label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-glass-bg border border-border-subtle rounded-lg text-white focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-glass-bg border border-border-subtle rounded-lg text-white focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="">All Status</option>
                  <option value="certified">Certified</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <Dashboard advisors={filteredAdvisors} showFilters={false} />
        </div>
      </div>

      <Footer />
      <WalletModal 
        isOpen={showWalletModal}
        onClose={closeModal}
        onConnect={handleWalletConnect}
      />
    </div>
  )
}
