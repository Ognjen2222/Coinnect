'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Brand } from './Brand';
import { clearAuth, isAuthenticated } from '@/lib/auth';

const nav = [
  { href: '/home', label: 'Home', icon: '⌂' },
  { href: '/groups', label: 'Gruppen', icon: '◌' },
  { href: '/history', label: 'Verlauf', icon: '↺' },
  { href: '/profile', label: 'Profil', icon: '◔' },
];

export function ProtectedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return <div className="loading-screen">Coinnect wird geladen…</div>;

  return (
    <div className="app-shell">
      <header className="topbar">
        <Brand />
        <button className="ghost-button" onClick={() => { clearAuth(); router.replace('/'); }}>Abmelden</button>
      </header>
      <main className="screen-frame">{children}</main>
      <nav className="bottom-nav">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
