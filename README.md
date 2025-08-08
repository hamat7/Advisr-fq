# Advisr - Investment Advisor Registry

## 🌟 Overview

**Advisr** is a sophisticated blockchain-based investment advisor registry platform built on Hedera's enterprise-grade infrastructure. It provides a secure, transparent, and decentralized solution for verifying and connecting certified investment advisors worldwide.

### ✨ Key Features

- 🛡️ **Blockchain Security** - Immutable credential verification on Hedera network
- ✅ **Multi-layered Verification** - Comprehensive advisor certification process
- 🌐 **Global Registry** - Searchable database of certified advisors worldwide
- ⚡ **Instant Verification** - Real-time status updates via smart contracts
- 🔗 **Multi-Wallet Support** - MetaMask, HashPack, and Blade Wallet integration
- 📊 **Transparent Metrics** - Public dashboard with comprehensive analytics
- 📱 **Responsive Design** - Optimized for all devices and screen sizes

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Custom CSS Variables** - Dynamic theming system
- **Glassmorphism Design** - Modern UI with backdrop blur effects
- **Responsive Grid System** - Mobile-first responsive design

### Blockchain Integration
- **Hedera Hashgraph** - Enterprise blockchain infrastructure
- **Multi-Wallet Support** - MetaMask, HashPack, Blade Wallet
- **EVM Compatibility** - Ethereum-compatible wallet integration

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Geist Font** - Modern typography system

## 📁 Project Structure

\`\`\`
advisr-registry/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard page
│   │   └── page.tsx
│   ├── features/                # Features showcase page
│   │   └── page.tsx
│   ├── register/                # Registration page
│   │   └── page.tsx
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page
├── components/                   # Reusable React components
│   ├── dashboard.tsx            # Dashboard component
│   ├── features.tsx             # Features grid component
│   ├── footer.tsx               # Footer component
│   ├── hero.tsx                 # Hero section component
│   ├── navigation.tsx           # Navigation bar component
│   ├── registration.tsx         # Registration form component
│   ├── theme-provider.tsx       # Theme context provider
│   └── wallet-modal.tsx         # Wallet connection modal
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities
├── public/                      # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles/                      # Additional stylesheets
│   └── globals.css              # Shadcn/ui base styles
├── components.json              # Shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🎨 Design System

### Color Palette
\`\`\`css
:root {
  --primary-navy: #1a2332;        /* Primary background */
  --secondary-slate: #2a3441;     /* Secondary background */
  --accent-gold: #c9a96e;         /* Primary accent color */
  --accent-light: #e8dcc0;        /* Light accent color */
  --text-primary: #ffffff;        /* Primary text */
  --text-secondary: #b8c1cc;      /* Secondary text */
  --text-muted: #8691a0;          /* Muted text */
  --glass-bg: rgba(255, 255, 255, 0.05);    /* Glass background */
  --glass-border: rgba(255, 255, 255, 0.1); /* Glass border */
}
\`\`\`

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Font Weights:** 400, 500, 600, 700, 800
- **Responsive Typography:** Clamp-based scaling

### Components
- **Glassmorphism Cards** - Translucent backgrounds with backdrop blur
- **Gradient Buttons** - Custom gradient hover effects
- **Responsive Navigation** - Mobile-first navigation with hamburger menu
- **Modal System** - Accessible modal components with backdrop click

## Installation & Setup

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/advisr-registry.git
   cd advisr-registry
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Build for Production

\`\`\`bash
# Build the application
npm run build

# Start production server
npm run start
\`\`\`

## Pages & Features

### Home Page (`/`)
- **Hero Section** - Main landing with call-to-action buttons
- **Features Overview** - Six key platform features
- **Registration Form** - Advisor registration with wallet integration
- **Dashboard Preview** - Statistics and advisor listings
- **Footer** - Links and company information

### Features Page (`/features`)
- **Detailed Feature Cards** - Comprehensive feature descriptions
- **Interactive Elements** - Hover effects and animations
- **Call-to-Action Section** - Registration and dashboard links

### Register Page (`/register`)
- **Registration Form** - Multi-step advisor registration
- **Requirements Section** - Clear registration requirements
- **Benefits Overview** - Why register with Advisr
- **Wallet Integration** - Required wallet connection

### Dashboard Page (`/dashboard`)
- **Advanced Search** - Search by name or Hedera ID
- **Filter System** - Filter by region and certification status
- **Statistics Cards** - Real-time advisor metrics
- **Advisor Listings** - Comprehensive advisor directory

## Wallet Integration

### Supported Wallets
1. **MetaMask** 🦊
   - Ethereum-compatible wallet
   - Browser extension integration
   - Address format: `0x...`

2. **HashPack** 📦
   - Native Hedera wallet
   - Optimized for Hedera network
   - Address format: `0.0.xxxxx`

3. **Blade Wallet** ⚔️
   - Multi-chain Hedera wallet
   - Advanced features support
   - Cross-chain compatibility

### Wallet Features
- **Connection Modal** - User-friendly wallet selection
- **Address Display** - Formatted address showing
- **Balance Information** - HBAR balance display
- **Copy Address** - One-click address copying
- **Disconnect Option** - Secure wallet disconnection

## Core Functionality

### Advisor Registration
\`\`\`typescript
interface Advisor {
  name: string;           // Full advisor name
  hederaId: string;       // Hedera account ID
  region: string;         // Geographic region
  certified: boolean;     // Certification status
}
\`\`\`

### Wallet Management
\`\`\`typescript
interface WalletInfo {
  address: string;                              // Wallet address
  type: 'metamask' | 'hashpack' | 'blade';    // Wallet type
  balance?: string;                            // Account balance
}
\`\`\`

### Search & Filtering
- **Text Search** - Name and Hedera ID search
- **Region Filter** - Geographic filtering
- **Status Filter** - Certification status filtering
- **Real-time Results** - Instant search results

## Styling Architecture

### CSS Organization
1. **Global Styles** (`app/globals.css`)
   - CSS custom properties
   - Base component styles
   - Responsive breakpoints

2. **Tailwind Configuration** (`tailwind.config.ts`)
   - Custom color palette
   - Extended spacing scale
   - Animation definitions

3. **Component Styles**
   - Scoped component styling
   - Utility-first approach
   - Responsive modifiers

### Responsive Design
\`\`\`css
/* Mobile First Approach */
@media (max-width: 768px) {
  /* Tablet and mobile styles */
}

@media (max-width: 480px) {
  /* Mobile-only styles */
}
\`\`\`

##  Features

### Blockchain Security
- **Immutable Records** - Blockchain-based credential storage
- **Decentralized Verification** - Distributed verification system
- **Smart Contract Integration** - Automated compliance checking

### Frontend Security
- **Type Safety** - Full TypeScript implementation
- **Input Validation** - Form validation and sanitization
- **Secure Wallet Integration** - Safe wallet connection handling

## Performance Optimizations

### Next.js Optimizations
- **App Router** - Latest Next.js routing system
- **Server Components** - Optimized server-side rendering
- **Image Optimization** - Automatic image optimization
- **Font Optimization** - Google Fonts optimization

### Bundle Optimization
- **Tree Shaking** - Unused code elimination
- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Component lazy loading

## Development Workflow

### Code Quality
\`\`\`bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
\`\`\`

### Git Workflow
1. **Feature Branches** - Create feature-specific branches
2. **Commit Messages** - Conventional commit format
3. **Pull Requests** - Code review process
4. **Automated Deployment** - Vercel integration

## Deployment

### Vercel Deployment
The application is automatically deployed to Vercel with:
- **Automatic Builds** - Git push triggers deployment
- **Preview Deployments** - Branch-based previews
- **Environment Variables** - Secure configuration management
- **Custom Domains** - Production domain configuration

### Environment Variables
\`\`\`bash
# Add to Vercel dashboard or .env.local
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Future Enhancements

### Planned Features
- [ ] **Real Hedera Integration** - Actual blockchain connectivity
- [ ] **User Authentication** - Login/signup system
- [ ] **Advisor Profiles** - Detailed advisor pages
- [ ] **Rating System** - Client review and rating system
- [ ] **Messaging System** - Direct advisor communication
- [ ] **Document Upload** - Credential document management
- [ ] **Multi-language Support** - Internationalization
- [ ] **Mobile App** - React Native mobile application

### Technical Improvements
- [ ] **Database Integration** - Persistent data storage
- [ ] **API Development** - RESTful API endpoints
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **Advanced Analytics** - Comprehensive metrics dashboard
- [ ] **SEO Optimization** - Enhanced search engine optimization
- [ ] **Accessibility** - WCAG compliance improvements

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- **TypeScript** - Strict type checking
- **ESLint** - Code linting rules
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format
