import type { Advisor } from '@/app/page'

interface DashboardProps {
  advisors: Advisor[]
  showFilters?: boolean
}

export default function Dashboard({ advisors, showFilters = true }: DashboardProps) {
  const totalAdvisors = advisors.length
  const certified = advisors.filter(a => a.certified).length
  const pending = totalAdvisors - certified
  const activeRegions = new Set(advisors.map(a => a.region)).size

  return (
    <section className="dashboard" id="dashboard">
      {showFilters && <h2>Registry Dashboard</h2>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{totalAdvisors}</span>
          <span className="stat-label">Total Advisors</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{certified}</span>
          <span className="stat-label">Certified</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{activeRegions}</span>
          <span className="stat-label">Active Regions</span>
        </div>
      </div>

      <div className="advisor-list">
        {advisors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No advisors found matching your criteria.</p>
          </div>
        ) : (
          advisors.map((advisor, index) => (
            <div key={index} className="advisor-item">
              <div className="advisor-info">
                <h4>{advisor.name}</h4>
                <p>Hedera ID: {advisor.hederaId} • {advisor.region}</p>
              </div>
              <span className={`status-badge ${advisor.certified ? 'status-certified' : 'status-pending'}`}>
                {advisor.certified ? 'Certified' : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
