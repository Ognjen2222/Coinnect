"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../_components/app-shell";
import { AuthGuard } from "../_components/auth-guard";
import { LoadingCard } from "../_components/loading-card";
import { ActionIcon, ActivityIcon } from "../_components/icon-map";
import { SectionCard } from "../_components/ui";
import { fetchOverview } from "../_lib/api";
import { Overview } from "../_lib/types";
import { HiArrowUpRight, HiOutlineEye, HiOutlinePlus } from "react-icons/hi2";

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => { fetchOverview().then(setData).catch(console.error); }, []);

  return <AuthGuard><AppShell active="dashboard">{!data ? <LoadingCard /> : <DashboardContent data={data} />}</AppShell></AuthGuard>;
}

function DashboardContent({ data }: { data: Overview }) {
  return (
    <>
      <SectionCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg text-[#98a2b3] sm:text-xl">Dein Guthaben</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-6xl">{data.user.balance}</h2>
          </div>
          <button className="mt-1 rounded-full p-2 text-[#8b94a7] transition hover:bg-white/5"><HiOutlineEye className="text-3xl" /></button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="gold-button flex items-center justify-center gap-3 rounded-[24px] px-4 py-4 text-lg font-semibold sm:py-5 sm:text-2xl"><HiArrowUpRight className="text-2xl" />Senden</button>
          <button className="outline-gold-button flex items-center justify-center gap-3 rounded-[24px] px-4 py-4 text-lg font-semibold sm:py-5 sm:text-2xl"><HiArrowUpRight className="rotate-180 text-2xl" />Anfordern</button>
        </div>
      </SectionCard>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.quickActions.map((action) => (
          <SectionCard key={action.title} className="rounded-[24px] p-4">
            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] ${action.tone}`}>
              <ActionIcon type={action.icon} />
            </div>
            <p className="text-[1.55rem] font-medium leading-none text-white sm:text-[1.9rem]">{action.title}</p>
            <p className="mt-3 text-base text-[#8b94a7] sm:text-lg">{action.subtitle}</p>
          </SectionCard>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between px-1">
        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Deine Gruppen</h3>
        <button className="text-base font-medium text-[#e7b11a] sm:text-lg">Alle anzeigen</button>
      </div>

      <div className="mt-4 space-y-4">
        {data.groups.slice(0, 2).map((group) => (
          <SectionCard key={group.id} className="rounded-[26px] px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7b11a]/14 text-[#e7b11a]">
                  <ActivityIcon type="group" />
                </div>
                <div>
                  <p className="text-xl font-medium text-white sm:text-2xl">{group.name}</p>
                  <p className="mt-1 text-sm text-[#8b94a7]">{group.members.length} Mitglieder · {group.openPayments} offene Zahlungen</p>
                </div>
              </div>
              <span className={`text-xl font-semibold sm:text-2xl ${group.balance.startsWith("+") ? "text-[#22c55e]" : "text-white"}`}>{group.balance}</span>
            </div>
          </SectionCard>
        ))}
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] px-5 py-4 text-lg font-medium text-[#cdd3df] transition hover:bg-white/[0.04]"><HiOutlinePlus className="text-xl" />Neue Gruppe erstellen</button>
    </>
  );
}
