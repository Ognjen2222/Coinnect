export function BalanceCard({ balance }: { balance: string }) {
  return (
    <section className="balance-card card">
      <div className="muted">Dein Guthaben</div>
      <div className="balance-amount">{balance}</div>
      <div className="action-row">
        <button className="primary-button small">↗ Senden</button>
        <button className="outline-button small">↙ Anfordern</button>
      </div>
    </section>
  );
}

export function QuickActions({ items }: { items: { key: string; label: string; subtitle: string }[] }) {
  return (
    <section className="quick-grid">
      {items.map((item, index) => (
        <div className={`quick-card card quick-${index}`} key={item.key}>
          <div className="quick-icon">{item.label.slice(0, 1)}</div>
          <div className="quick-label">{item.label}</div>
          <div className="muted">{item.subtitle}</div>
        </div>
      ))}
    </section>
  );
}

export function ActivityList({ items }: { items: { id: number; title: string; subtitle?: string; amount: string; amountCents: number; date: string; direction: string }[] }) {
  return (
    <section className="card activity-card">
      <div className="section-header">
        <h3>Letzte Aktivitäten</h3>
        <span>Alle anzeigen</span>
      </div>
      <div className="activity-list">
        {items.map((item) => (
          <div key={item.id} className="activity-item">
            <div className={`activity-icon ${item.direction}`}>{item.direction === 'in' ? '↙' : item.direction === 'out' ? '↗' : '•'}</div>
            <div className="activity-copy">
              <div className="activity-title">{item.title}</div>
              <div className="muted">{item.subtitle || 'Coinnect Aktivität'}</div>
            </div>
            <div className={`activity-amount ${item.amountCents >= 0 ? 'positive' : 'negative'}`}>
              {item.amount}
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
