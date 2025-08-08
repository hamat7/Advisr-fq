import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>
          © 2024 Advisr. Built on Hedera Network. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
