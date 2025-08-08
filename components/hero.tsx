import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <h1>Trusted Investment<br />Advisory Network</h1>
      <p>Connect with certified investment advisors on Hedera&apos;s secure blockchain infrastructure. Build trust through transparency and verification.</p>
      <div className="hero-buttons">
        <Link href="/register" className="btn-primary">
          Register as Advisor
        </Link>
        <Link href="/dashboard" className="btn-secondary">
          View Registry
        </Link>
      </div>
    </section>
  )
}
