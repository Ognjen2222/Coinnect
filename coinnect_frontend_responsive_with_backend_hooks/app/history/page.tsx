"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../_components/app-shell";
import { AuthGuard } from "../_components/auth-guard";
import { ActivityIcon } from "../_components/icon-map";
import { LoadingCard } from "../_components/loading-card";
import { SectionTitle } from "../_components/ui";
import { fetchHistory } from "../_lib/api";
import { Activity } from "../_lib/types";

export default function HistoryPage() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  useEffect(() => { fetchHistory().then(setActivities).catch(console.error); }, []);

  return <AuthGuard><AppShell active="history">{!activities ? <LoadingCard /> : <HistoryContent activities={activities} />}</AppShell></AuthGuard>;
}

function HistoryContent({ activities }: { activities: Activity[] }) {
  return (
    <>
      <SectionTitle title="Letzte Aktivitäten" action={<button className="text-base font-medium text-[#e7b11a] sm:text-lg">Alle anzeigen</button>} />
      <div className="space-y-4 pb-4">
        {activities.map((item) => {
          const iconBox = item.type === "group" ? "bg-[#e7b11a]/14 text-[#e7b11a]" : item.type === "incoming" ? "bg-[#0d3d2a] text-[#22c55e]" : "bg-[#202632] text-[#cdd3df]";
          return (
            <div key={item.id} className="glass-card flex items-center justify-between gap-4 rounded-[24px] px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] sm:h-16 sm:w-16 ${iconBox}`}><ActivityIcon type={item.type} /></div>
                <div>
                  <p className="text-xl font-medium leading-none text-white sm:text-[2rem]">{item.title}</p>
                  <p className="mt-2 text-base text-[#8b94a7] sm:text-lg">{item.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold sm:text-2xl ${item.positive ? "text-[#22c55e]" : "text-white"}`}>{item.amount}</p>
                {item.date && <p className="mt-2 text-sm text-[#8b94a7]">{item.date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
