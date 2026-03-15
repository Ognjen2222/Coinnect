"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "../_components/branding";

export default function LoginPage() {
  const router = useRouter();

  // Diese Funktion wird jetzt direkt vom Button aufgerufen, 
  // um jegliche Formular-Fehler zu umgehen.
  const bypassLogin = () => {
    router.push("/dashboard");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px]">
        
        {/* Linke Seite (Desktop) */}
        <section className="hidden rounded-[34px] border border-white/7 bg-white/[0.02] p-10 lg:block">
          <BrandMark />
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-white">Willkommen zurück.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#98a2b3]">
            Melde dich an und verwalte Gruppenzahlungen, Aktivitäten und dein Profil im selben Look wie die App-Screens.
          </p>
        </section>

        {/* Rechte Seite (Login Formular) */}
        <section className="glass-card rounded-[34px] p-7 sm:p-8">
          <BrandMark />
          <h2 className="mt-10 text-3xl font-semibold tracking-tight text-white">Anmelden</h2>
          <p className="mt-2 text-sm text-[#98a2b3]">Nutze vorerst die Demo-Ansicht. Das Formular ist rein visuell vorbereitet.</p>
          
          {/* Wir entfernen das onSubmit vom Formular für maximale Unabhängigkeit */}
          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-[#cdd3df]">E-Mail</label>
              <input 
                type="email" 
                placeholder="max@coinnect.com" 
                className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[#cdd3df]">Passwort</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" 
              />
            </div>

            {/* Der Button führt nur die Navigation aus, kein Form-Submit */}
            <button 
              type="button" 
              onClick={bypassLogin}
              className="gold-button block w-full rounded-2xl px-4 py-4 text-center font-semibold transition hover:brightness-105"
            >
              Einloggen
            </button>
          </div>

          <p className="mt-6 text-sm text-[#98a2b3]">
            Noch kein Konto? <Link href="/register" className="text-[#f2c12f]">Jetzt registrieren</Link>
          </p>
        </section>
      </div>
    </main>
  );
}