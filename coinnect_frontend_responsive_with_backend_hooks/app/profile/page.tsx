"use client";

import { useEffect, useState } from "react";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";
import { AppShell } from "../_components/app-shell";
import { AuthGuard } from "../_components/auth-guard";
import { ActionIcon } from "../_components/icon-map";
import { LoadingCard } from "../_components/loading-card";
import { SectionCard, SectionTitle } from "../_components/ui";
import { fetchProfile } from "../_lib/api";
import { Overview, User } from "../_lib/types";

export default function ProfilePage() {
  const [data, setData] = useState<{ user: User; quickActions: Overview["quickActions"] } | null>(null);
  useEffect(() => { fetchProfile().then(setData).catch(console.error); }, []);

  return <AuthGuard><AppShell active="profile">{!data ? <LoadingCard /> : <ProfileContent {...data} />}</AppShell></AuthGuard>;
}

function ProfileContent({ user, quickActions }: { user: User; quickActions: Overview["quickActions"] }) {
  return (
    <>
      <SectionCard>
        <p className="text-lg text-[#98a2b3] sm:text-xl">Dein Guthaben</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-6xl">{user.balance}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="gold-button flex items-center justify-center gap-3 rounded-[24px] px-4 py-4 text-lg font-semibold sm:py-5 sm:text-2xl"><HiArrowUpRight className="text-2xl" />Senden</button>
          <button className="outline-gold-button flex items-center justify-center gap-3 rounded-[24px] px-4 py-4 text-lg font-semibold sm:py-5 sm:text-2xl"><HiArrowDownLeft className="text-2xl" />Anfordern</button>
        </div>
      </SectionCard>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <SectionCard key={action.title} className="rounded-[24px] p-4">
            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] ${action.tone}`}><ActionIcon type={action.icon} /></div>
            <p className="text-[1.55rem] font-medium leading-none text-white sm:text-[1.9rem]">{action.title}</p>
            <p className="mt-3 text-base text-[#8b94a7] sm:text-lg">{action.subtitle}</p>
          </SectionCard>
        ))}
      </div>

      <div className="mt-8">
        <SectionTitle title="Profil" />
        <SectionCard className="rounded-[28px]">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#e7b11a]/14 text-2xl font-semibold text-[#e7b11a]">{user.initials}</div>
            <div>
              <p className="text-xl font-semibold text-white sm:text-2xl">{user.name}</p>
              <p className="mt-1 text-sm text-[#8b94a7]">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#cdd3df]">
            <div className="surface-muted rounded-2xl p-4"><p className="text-[#8b94a7]">Mitglied seit</p><p className="mt-2 text-lg text-white">{user.memberSince}</p></div>
            <div className="surface-muted rounded-2xl p-4"><p className="text-[#8b94a7]">Aktive Gruppen</p><p className="mt-2 text-lg text-white">{user.activeGroups} Gruppen</p></div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
