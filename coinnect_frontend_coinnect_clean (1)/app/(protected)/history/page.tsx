'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ActivityList } from '@/components/CoinnectCards';

export default function HistoryPage() {
  const [items, setItems] = useState<any[] | null>(null);
  useEffect(() => { api.activities().then(setItems).catch(() => setItems([])); }, []);
  if (!items) return <div className="loading-screen">Verlauf wird geladen…</div>;
  return <div className="screen-content"><ActivityList items={items} /></div>;
}
