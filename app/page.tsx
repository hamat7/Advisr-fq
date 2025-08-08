'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Registration from '@/components/registration'
import Dashboard from '@/components/dashboard'
import Footer from '@/components/footer'
import WalletModal from '@/components/wallet-modal'

export interface Advisor {
  name: string
  hederaId: string
  region: string
  certified: boolean
}

export interface WalletInfo {
  address: string
  type: 'metamask' | 'hashpack' | 'blade'
  balance?: string
}

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [advisors, setAdvisors] = useState<Advisor[]>([
    { name: "Sarah Johnson, CFA", hederaId: "0.0.123456", region: "North America", certified: true },
    { name: "Michael Chen, CFP", hederaId: "0.0.789012", region: "Asia Pacific", certified: false },
    { name: "Elena Rodriguez, CIMA", hederaId: "0.0.345678", region: "Europe", certified: true }
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
    
    const walletNames = {
      metamask: 'MetaMask',
      hashpack: 'HashPack',
      blade: 'Blade Wallet'
    }
    
    alert(`${walletNames[walletType]} connected successfully! Address: ${newWalletInfo.address}`)
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletInfo(null)
    alert('Wallet disconnected successfully!')
  }

  const registerAdvisor = (advisorData: Omit<Advisor, 'certified'>) => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first.')
      return false
    }

    const newAdvisor: Advisor = {
      ...advisorData,
      certified: false
    }

    setAdvisors(prev => [...prev, newAdvisor])
    alert('Registration submitted successfully! Your certification is pending approval.')
    return true
  }

  return (
    <div className="min-h-screen">
      <Navigation 
        isWalletConnected={isWalletConnected}
        walletInfo={walletInfo}
        onConnectWallet={connectWallet}
        onDisconnectWallet={disconnectWallet}
      />
      <Hero />
      <Features />
      <Registration onRegister={registerAdvisor} />
      <Dashboard advisors={advisors} />
      <Footer />
      <WalletModal 
        isOpen={showWalletModal}
        onClose={closeModal}
        onConnect={handleWalletConnect}
      />
    </div>
  )
}
