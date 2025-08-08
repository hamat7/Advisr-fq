const features = [
  {
    icon: "🛡️",
    title: "Blockchain Security",
    description: "Your advisor credentials are secured on Hedera's enterprise-grade blockchain infrastructure, ensuring immutable verification records."
  },
  {
    icon: "✅",
    title: "Verified Certification",
    description: "Multi-layered verification process ensures only legitimate, qualified investment advisors are certified on our platform."
  },
  {
    icon: "🌐",
    title: "Global Registry",
    description: "Access a comprehensive, searchable registry of certified investment advisors across different regions and specializations."
  },
  {
    icon: "⚡",
    title: "Instant Verification",
    description: "Real-time status updates and instant verification checks through smart contract integration on Hedera network."
  },
  {
    icon: "🔗",
    title: "EVM Integration",
    description: "Seamless integration with Ethereum-compatible wallets while leveraging Hedera's superior performance and sustainability."
  },
  {
    icon: "📊",
    title: "Transparent Metrics",
    description: "Public dashboard showing advisor statistics, certification status, and regional distribution for complete transparency."
  }
]

export default function Features() {
  return (
    <section className="features" id="features">
      <h2>Why Choose Advisr?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
