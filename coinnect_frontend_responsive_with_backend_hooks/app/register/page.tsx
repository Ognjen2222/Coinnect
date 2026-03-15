"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "../_components/branding";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Da wir kein Backend haben, simulieren wir den Erfolg
    // und schicken den Nutzer direkt zum Login, damit er sich dort "anmelden" kann.
    router.push("/login");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px]">
        
        {/* Linke Seite (Desktop) */}
        <section className="hidden rounded-[34px] border border-white/7 bg-white/[0.02] p-10 lg:block">
          <BrandMark />
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-white">
            Neues Konto erstellen.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#98a2b3]">
            Registriere dich für Gruppen, gemeinsame Ausgaben, Verlauf und schnelle Zahlungsaktionen. Das Frontend ist vollständig vorbereitet.
          </p>
        </section>

        {/* Rechte Seite (Registrierungs-Formular) */}
        <section className="glass-card rounded-[34px] p-7 sm:p-8">
          <BrandMark />
          <h2 className="mt-10 text-3xl font-semibold tracking-tight text-white">
            Registrieren
          </h2>
          <p className="mt-2 text-sm text-[#98a2b3]">
            Visuelle Demo ohne Backend-Anbindung.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-[#cdd3df]">Vollständiger Name</label>
              <input 
                type="text" 
                required
                placeholder="Max Mustermann" 
                className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[#cdd3df]">E-Mail</label>
              <input 
                type="email" 
                required
                placeholder="name@coinnect.at" 
                className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[#cdd3df]">Passwort</label>
              <input 
                type="password" 
                required
                placeholder="Mindestens 8 Zeichen" 
                className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" 
              />
            </div>

            <button 
              type="submit"
              className="gold-button block w-full rounded-2xl px-4 py-4 text-center font-semibold transition hover:brightness-105"
            >
              Konto anlegen
            </button>
          </form>

          <p className="mt-6 text-sm text-[#98a2b3]">
            Bereits registriert?{" "}
            <Link href="/login" className="text-[#f2c12f]">
              Hier anmelden
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}