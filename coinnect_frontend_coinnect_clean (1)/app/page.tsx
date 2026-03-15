import Link from 'next/link';
import { Brand } from '@/components/Brand';

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-card card">
        <Brand />
        <div className="landing-copy">
          <span className="tag">Coinnect Web Frontend</span>
          <h1>Zahlungen in Gruppen aufteilen — klar, mobil und im dunklen Coinnect Look.</h1>
          <p>
            Mit Coinnect kannst du Gruppen anlegen, Ausgaben nachverfolgen, deinen Verlauf prüfen und dein Profil
            in einer Ansicht im Stil der gelieferten Screens gestalten.
          </p>
        </div>
        <div className="landing-actions">
          <Link href="/login" className="primary-button">Anmelden</Link>
          <Link href="/register" className="outline-button">Registrieren</Link>
        </div>
        <div className="demo-box">
          <strong>Demo-Login</strong>
          <span>E-Mail: max@coinnect.at</span>
          <span>Passwort: Coinnect!2026#Demo</span>
        </div>
      </section>
    </main>
  );
}
