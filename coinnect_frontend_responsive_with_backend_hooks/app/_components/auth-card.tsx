"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";
import { BrandMark } from "./branding";
import { login, register } from "../_lib/api";

type Mode = "login" | "register";

export function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      const payload = mode === "login"
        ? await login(email, password)
        : await register(name, email, password);

      localStorage.setItem("coinnect-token", payload.token);
      localStorage.setItem("coinnect-user", JSON.stringify(payload.user));
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Anmelden");
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid w-full items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
        <section className="hidden rounded-[34px] border border-white/7 bg-white/[0.02] p-8 backdrop-blur lg:flex lg:flex-col lg:justify-between">
          <div>
            <BrandMark />
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.28em] text-[#e7b11a]">Coinnect Web</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-white">
              Gruppenzahlungen im Stil der Screenshots – jetzt auch als responsive Website.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#98a2b3]">
              Für unangemeldete Nutzer gibt es Landingpage, Login und Registrierung. Nach dem Login wechselst du unten über Home, Gruppen, Verlauf und Profil.
            </p>
          </div>
          <Link href="/" className="inline-flex w-fit items-center rounded-2xl border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/5">
            Zurück zur Startseite
          </Link>
        </section>

        <section className="glass-card rounded-[30px] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <BrandMark />
            <Link href="/" className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5">
              Startseite
            </Link>
          </div>

          <h2 className="mt-10 text-3xl font-semibold tracking-tight text-white">{isLogin ? "Anmelden" : "Registrieren"}</h2>
          <p className="mt-2 text-sm text-[#98a2b3]">
            {isLogin ? "Melde dich an, um deine Gruppen und Aktivitäten zu sehen." : "Erstelle dein Konto und starte mit Gruppenzahlungen."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {!isLogin && <Field label="Name" name="name" placeholder="Max Mustermann" />}
            <Field label="E-Mail" name="email" type="email" placeholder="name@coinnect.at" />
            <Field label="Passwort" name="password" type="password" placeholder="••••••••" />

            {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

            <button disabled={loading} className="gold-button block w-full rounded-2xl px-4 py-4 text-center font-semibold transition hover:brightness-105 disabled:opacity-60">
              {loading ? "Lädt..." : isLogin ? "Einloggen" : "Konto erstellen"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#98a2b3]">
            {isLogin ? "Noch kein Konto? " : "Schon registriert? "}
            <Link href={isLogin ? "/register" : "/login"} className="text-[#f2c12f]">
              {isLogin ? "Jetzt registrieren" : "Zum Login"}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#cdd3df]">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required className="surface-muted w-full rounded-2xl px-4 py-4 text-white placeholder:text-[#6b7280]" />
    </div>
  );
}
