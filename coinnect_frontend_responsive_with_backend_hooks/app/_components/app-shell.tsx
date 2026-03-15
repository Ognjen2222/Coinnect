import Link from "next/link";
import { ReactNode } from "react";
import { HiBell, HiHome, HiMiniArrowsRightLeft, HiOutlineClock, HiOutlineUserCircle, HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { BrandMark } from "./branding";
import { LogoutButton } from "./logout-button";

const navItems = [
  { href: "/dashboard", label: "Home", key: "dashboard", icon: HiHome },
  { href: "/groups", label: "Gruppen", key: "groups", icon: HiOutlineUsers },
  { href: "/history", label: "Verlauf", key: "history", icon: HiOutlineClock },
  { href: "/profile", label: "Profil", key: "profile", icon: HiOutlineUserCircle },
] as const;

export function AppShell({ active, children, title, subtitle }: {
  active: "dashboard" | "groups" | "history" | "profile";
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div className="grid items-start gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="phone-frame glass-card relative mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col rounded-[30px] p-4 sm:min-h-[860px] sm:rounded-[34px] sm:p-6 xl:mx-0">
          <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
            <BrandMark />
            <div className="mt-1 flex items-center gap-2 text-[#98a2b3] sm:gap-3">
              <button className="relative rounded-full p-2 transition hover:bg-white/5" aria-label="Benachrichtigungen">
                <HiBell className="text-2xl" />
                <span className="absolute right-2 top-1 h-2.5 w-2.5 rounded-full bg-[#e7b11a]" />
              </button>
              <button className="rounded-full p-2 transition hover:bg-white/5" aria-label="Einstellungen">
                <IoSettingsOutline className="text-2xl" />
              </button>
            </div>
          </div>

          {(title || subtitle) && (
            <div className="relative z-10 mb-5">
              {title && <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>}
              {subtitle && <p className="mt-1 text-sm text-[#98a2b3]">{subtitle}</p>}
            </div>
          )}

          <div className="relative z-10 flex-1 overflow-y-auto pb-28 hide-scrollbar">{children}</div>

          <nav className="glass-card absolute inset-x-0 bottom-0 z-20 rounded-t-[28px] border-x-0 border-b-0 px-4 py-4 sm:px-5 sm:py-5">
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const selected = item.key === active;
                return (
                  <Link key={item.key} href={item.href} className="group flex flex-col items-center gap-2 rounded-2xl px-1 py-2 text-center">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition sm:h-12 sm:w-12 ${selected ? "border-[#f2c12f]/45 bg-[#e7b11a]/18 text-[#f2c12f]" : "border-transparent bg-white/[0.02] text-[#8b94a7] group-hover:bg-white/[0.04] group-hover:text-white"}`}>
                      <Icon className="text-2xl" />
                    </span>
                    <span className={`text-xs sm:text-sm ${selected ? "text-[#f2c12f]" : "text-[#8b94a7] group-hover:text-white"}`}>{item.label}</span>
                    {selected && <span className="h-1 w-8 rounded-full bg-[#e7b11a] sm:w-10" />}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="hidden min-h-[860px] rounded-[36px] border border-white/7 bg-white/[0.02] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] xl:block">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[#e7b11a]">
              <HiMiniArrowsRightLeft className="text-2xl" />
              <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#e7b11a]">Eingeloggt</span>
            </div>
            <LogoutButton />
          </div>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white">Nach dem Login wechseln Nutzer unten zwischen Home, Gruppen, Verlauf und Profil.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#98a2b3]">Die App-Ansicht bleibt links zentriert. Rechts gibt es eine begleitende Desktop-Fläche, damit das Layout auch auf großen Screens sauber und vollständig formatiert ist.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Responsive Login & Register", "Mit Rücklink zur Startseite und sauberem Verhalten auf kleinen und großen Screens."],
              ["Mock-Backend angebunden", "Login, Registrierung, Gruppen, Verlauf, Profil und Dashboard werden über API-Endpunkte geladen."],
              ["Navigation unten", "Wie in den Screenshots bleibt die untere Navigation das zentrale UI-Muster für eingeloggte Nutzer."],
              ["Strenges Dark-UI", "Goldene Akzente, dunkle Karten, weiche Ränder und kompakte Aktivitätskarten im Screenshot-Stil."],
            ].map(([headline, text]) => (
              <div key={headline} className="surface-muted rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-white">{headline}</h3>
                <p className="mt-3 text-sm leading-7 text-[#98a2b3]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
