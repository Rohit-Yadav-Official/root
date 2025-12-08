import '../sales/statCards.css';

export default function StatCards() {
  return (
    <div className="stat-cards-container">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total units sold</span>
          <span className="info-icon">i</span>
        </div>
        <p className="stat-card-value">10</p>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Amount</span>
          <span className="info-icon">i</span>
        </div>
        <p className="stat-card-value">
          ₹89,000 <span className="secondary-text">(19 SRs)</span>
        </p>
        
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Discount</span>
          <span className="info-icon">i</span>
        </div>
        <p className="stat-card-value">
          ₹15000 <span className="secondary-text">(45 SRs)</span>
        </p>
      </div>
    </div>
  );
}