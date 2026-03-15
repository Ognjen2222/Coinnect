'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any | null>(null);
  useEffect(() => { api.profile().then(setProfile).catch(() => setProfile(null)); }, []);
  if (!profile) return <div className="loading-screen">Profil wird geladen…</div>;

  return (
    <div className="screen-content grid-gap">
      <section className="profile-head card">
        <div className="profile-avatar">{profile.initials}</div>
        <div>
          <h2>{profile.name}</h2>
          <p className="muted">{profile.email}</p>
          <p className="muted">Mitglied seit {profile.memberSince}</p>
        </div>
        <div className="profile-balance">{profile.balance}</div>
      </section>
      <section className="card settings-grid">
        {profile.settings.map((setting: any) => (
          <div key={setting.key} className="quick-card">
            <div className="quick-icon">{setting.label.slice(0,1)}</div>
            <div className="quick-label">{setting.label}</div>
            <div className="muted">Aktiv</div>
          </div>
        ))}
      </section>
    </div>
  );
}
