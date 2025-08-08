'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { WalletInfo } from '@/app/page'

interface NavigationProps {
  isWalletConnected: boolean
  walletInfo?: WalletInfo | null
  onConnectWallet: () => void
  onDisconnectWallet?: () => void
}

export default function Navigation({ 
  isWalletConnected, 
  walletInfo, 
  onConnectWallet, 
  onDisconnectWallet 
}: NavigationProps) {
  const [showWalletDropdown, setShowWalletDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleWalletClick = () => {
    if (isWalletConnected) {
      setShowWalletDropdown(!showWalletDropdown)
    } else {
      onConnectWallet()
    }
  }

  const formatAddress = (address: string) => {
    if (address.startsWith('0.0.')) {
      return address // Hedera format
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}` // Ethereum format
  }

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'metamask': return '🦊'
      case 'hashpack': return '📦'
      case 'blade': return '⚔️'
      default: return '💼'
    }
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="logo">
          Advisr
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex nav-links">
          <Link href="/features" className="nav-link">Features</Link>
          <Link href="/register" className="nav-link">Register</Link>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          
          <div className="relative">
            <button 
              className={`wallet-btn ${isWalletConnected ? 'connected' : ''}`}
              onClick={handleWalletClick}
              type="button"
            >
              {isWalletConnected && walletInfo ? (
                <div className="flex items-center gap-2">
                  <span>{getWalletIcon(walletInfo.type)}</span>
                  <span className="hidden lg:inline">{formatAddress(walletInfo.address)}</span>
                  <span className="lg:hidden">Connected</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
            
            {/* Wallet Dropdown */}
            {showWalletDropdown && isWalletConnected && walletInfo && (
              <div className="absolute right-0 mt-2 w-64 bg-secondary-slate border border-glass-border rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-glass-border">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getWalletIcon(walletInfo.type)}</span>
                    <div>
                      <p className="font-semibold text-white capitalize">{walletInfo.type}</p>
                      <p className="text-sm text-text-muted">{formatAddress(walletInfo.address)}</p>
                    </div>
                  </div>
                  {walletInfo.balance && (
                    <p className="text-sm text-text-secondary">Balance: {walletInfo.balance}</p>
                  )}
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(walletInfo.address)
                      alert('Address copied to clipboard!')
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-glass-bg rounded transition-colors"
                  >
                    Copy Address
                  </button>
                  {onDisconnectWallet && (
                    <button
                      onClick={() => {
                        onDisconnectWallet()
                        setShowWalletDropdown(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-glass-bg rounded transition-colors"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary-slate border-t border-glass-border">
          <div className="px-4 py-2 space-y-2">
            <Link href="/features" className="block py-2 text-text-secondary hover:text-accent-gold">
              Features
            </Link>
            <Link href="/register" className="block py-2 text-text-secondary hover:text-accent-gold">
              Register
            </Link>
            <Link href="/dashboard" className="block py-2 text-text-secondary hover:text-accent-gold">
              Dashboard
            </Link>
            <button 
              className={`wallet-btn w-full mt-4 ${isWalletConnected ? 'connected' : ''}`}
              onClick={handleWalletClick}
              type="button"
            >
              {isWalletConnected && walletInfo ? (
                <div className="flex items-center justify-center gap-2">
                  <span>{getWalletIcon(walletInfo.type)}</span>
                  <span>{formatAddress(walletInfo.address)}</span>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
