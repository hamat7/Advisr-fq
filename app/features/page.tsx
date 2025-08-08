'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import WalletModal from '@/components/wallet-modal'
import type { WalletInfo } from '@/app/page'

const features = [
  {
    icon: "🛡️",
    title: "Blockchain Security",
    description: "Your advisor credentials are secured on Hedera's enterprise-grade blockchain infrastructure, ensuring immutable verification records.",
    details: [
      "Enterprise-grade security protocols",
      "Immutable record keeping",
      "Decentralized verification system",
      "Advanced cryptographic protection"
    ]
  },
  {
    icon: "✅",
    title: "Verified Certification",
    description: "Multi-layered verification process ensures only legitimate, qualified investment advisors are certified on our platform.",
    details: [
      "Multi-step verification process",
      "Document authentication",
      "Professional credential checks",
      "Continuous monitoring system"
    ]
  },
  {
    icon: "🌐",
    title: "Global Registry",
    description: "Access a comprehensive, searchable registry of certified investment advisors across different regions and specializations.",
    details: [
      "Worldwide advisor network",
      "Advanced search capabilities",
      "Regional specialization filters",
      "Real-time availability status"
    ]
  },
  {
    icon: "⚡",
    title: "Instant Verification",
    description: "Real-time status updates and instant verification checks through smart contract integration on Hedera network.",
    details: [
      "Real-time status updates",
      "Smart contract integration",
      "Instant verification checks",
      "Automated compliance monitoring"
    ]
  },
  {
    icon: "🔗",
    title: "EVM Integration",
    description: "Seamless integration with Ethereum-compatible wallets while leveraging Hedera's superior performance and sustainability.",
    details: [
      "Ethereum wallet compatibility",
      "Cross-chain functionality",
      "Superior performance metrics",
      "Sustainable blockchain technology"
    ]
  },
  {
    icon: "📊",
    title: "Transparent Metrics",
    description: "Public dashboard showing advisor statistics, certification status, and regional distribution for complete transparency.",
    details: [
      "Public performance metrics",
      "Certification status tracking",
      "Regional distribution analytics",
      "Transparent reporting system"
    ]
  }
]

export default function FeaturesPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)

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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Platform Features
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Discover the powerful features that make Advisr the most trusted investment advisor registry on the blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="feature-icon mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-accent-gold rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 backdrop-blur-20">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of certified investment advisors who trust Advisr for their professional verification needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="btn-primary">Register as Advisor</a>
                <a href="/dashboard" className="btn-secondary">View Registry</a>
              </div>
            </div>
          </div>
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
