'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { saveAuth } from '@/lib/auth';
import { Brand } from './Brand';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = mode === 'login'
        ? await api.login(email, password)
        : await api.register(name, email, password);
      saveAuth(result.token, result.user);
      router.push('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-hero card">
        <Brand />
        <h1>Willkommen bei Coinnect</h1>
        <p>
          Verwalte Gruppen, teile Zahlungen auf und behalte deine Aktivitäten in einem klaren,
          mobilen Interface im Stil der Screenshots im Blick.
        </p>
        <ul className="hero-points">
          <li>Gruppen für WG, Reisen oder Freizeit</li>
          <li>Ausgaben und Rückzahlungen im Verlauf</li>
          <li>Profil mit Guthaben und Schnellfunktionen</li>
        </ul>
      </div>

      <form className="auth-card card" onSubmit={onSubmit}>
        <Link href="/" className="back-link">← Zurück zur Startseite</Link>
        <h2>{mode === 'login' ? 'Anmelden' : 'Registrieren'}</h2>
        <p className="muted">{mode === 'login' ? 'Melde dich mit deinem Coinnect Konto an.' : 'Lege dein Konto für Coinnect an.'}</p>
        {mode === 'register' && (
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Max Schmid" required />
          </label>
        )}
        <label>
          E-Mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@coinnect.at" required />
        </label>
        <label>
          Passwort
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sicheres Passwort" required />
        </label>
        {mode === 'register' && <div className="hint">Mindestens 10 Zeichen. Demo: Coinnect!2026#Demo</div>}
        {error && <div className="error-box">{error}</div>}
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Bitte warten…' : mode === 'login' ? 'Einloggen' : 'Konto erstellen'}
        </button>
        <div className="auth-switch">
          {mode === 'login' ? 'Noch kein Konto?' : 'Bereits registriert?'}{' '}
          <Link href={mode === 'login' ? '/register' : '/login'}>
            {mode === 'login' ? 'Jetzt registrieren' : 'Zum Login'}
          </Link>
        </div>
      </form>
    </div>
  );
}
