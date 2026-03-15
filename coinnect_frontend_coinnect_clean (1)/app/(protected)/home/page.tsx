'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ActivityList, BalanceCard, QuickActions } from '@/components/CoinnectCards';

export default function HomePage() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.home().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="card">{error}</div>;
  if (!data) return <div className="loading-screen">Home wird geladen…</div>;

  return (
    <div className="screen-content">
      <BalanceCard balance={data.balance} />
      <QuickActions items={data.quickActions} />
      <ActivityList items={data.recentActivities} />
    </div>
  );
}
