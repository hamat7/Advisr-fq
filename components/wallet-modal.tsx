interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: 'metamask' | 'hashpack' | 'blade') => void
}

const wallets = [
  {
    id: 'metamask' as const,
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask wallet'
  },
  {
    id: 'hashpack' as const,
    name: 'HashPack',
    icon: '📦',
    description: 'Native Hedera wallet'
  },
  {
    id: 'blade' as const,
    name: 'Blade Wallet',
    icon: '⚔️',
    description: 'Multi-chain Hedera wallet'
  }
]

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="modal" 
      style={{ display: 'flex' }}
      onClick={handleBackdropClick}
    >
      <div className="modal-content max-w-md">
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2 text-white">Connect Your Wallet</h3>
          <p className="text-text-secondary">
            Choose your preferred wallet to connect to the Advisr registry.
          </p>
        </div>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => onConnect(wallet.id)}
              className="w-full flex items-center gap-4 p-4 bg-glass-bg border border-glass-border rounded-lg hover:border-accent-gold transition-all duration-200 group"
            >
              <span className="text-3xl">{wallet.icon}</span>
              <div className="text-left">
                <h4 className="font-semibold text-white group-hover:text-accent-gold transition-colors">
                  {wallet.name}
                </h4>
                <p className="text-sm text-text-muted">{wallet.description}</p>
              </div>
              <svg 
                className="w-5 h-5 text-text-muted group-hover:text-accent-gold transition-colors ml-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-glass-bg rounded-lg border border-glass-border">
          <p className="text-sm text-text-muted text-center">
            By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
