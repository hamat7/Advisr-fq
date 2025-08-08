'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Registration from '@/components/registration'
import WalletModal from '@/components/wallet-modal'
import type { Advisor, WalletInfo } from '@/app/page'

export default function RegisterPage() {
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

  const registerAdvisor = (advisorData: Omit<Advisor, 'certified'>) => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first.')
      return false
    }

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
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Register as Investment Advisor
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Join the most trusted network of certified investment advisors on the blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 backdrop-blur-20">
                <h3 className="text-2xl font-bold mb-4 text-white">Why Register?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-primary-navy text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Blockchain Verification</h4>
                      <p className="text-text-secondary text-sm">Get your credentials verified on Hedera's secure blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-primary-navy text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Global Visibility</h4>
                      <p className="text-text-secondary text-sm">Reach clients worldwide through our registry</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-primary-navy text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Trust & Transparency</h4>
                      <p className="text-text-secondary text-sm">Build trust with immutable verification records</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 backdrop-blur-20">
                <h3 className="text-2xl font-bold mb-4 text-white">Requirements</h3>
                <div className="space-y-3 text-text-secondary">
                  <p>• Valid investment advisor license</p>
                  <p>• Hedera-compatible wallet</p>
                  <p>• Professional credentials documentation</p>
                  <p>• Regional regulatory compliance</p>
                </div>
              </div>
            </div>

            <div>
              <Registration onRegister={registerAdvisor} />
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
