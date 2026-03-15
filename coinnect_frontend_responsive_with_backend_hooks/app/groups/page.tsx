"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../_components/app-shell";
import { AuthGuard } from "../_components/auth-guard";
import { LoadingCard } from "../_components/loading-card";
import { SectionCard, SectionTitle } from "../_components/ui";
import { fetchGroups } from "../_lib/api";
import { Group } from "../_lib/types";
import { HiMiniUserGroup, HiOutlineChevronRight, HiOutlinePlus, HiOutlineUserPlus } from "react-icons/hi2";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[] | null>(null);
  useEffect(() => { fetchGroups().then(setGroups).catch(console.error); }, []);

  return <AuthGuard><AppShell active="groups" title="Gruppen" subtitle="Verwalte Mitglieder, offene Zahlungen und gemeinsame Ausgaben.">{!groups ? <LoadingCard /> : <GroupsContent groups={groups} />}</AppShell></AuthGuard>;
}

function GroupsContent({ groups }: { groups: Group[] }) {
  return (
    <>
      <SectionCard className="rounded-[28px]">
        <SectionTitle eyebrow="Übersicht" title="Aktive Gruppen" action={<button className="text-base font-medium text-[#e7b11a]">Mehr</button>} />
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="surface-muted rounded-[24px] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7b11a]/14 text-[#e7b11a]"><HiMiniUserGroup className="text-3xl" /></div>
                  <div>
                    <p className="text-xl font-medium text-white sm:text-2xl">{group.name}</p>
                    <p className="mt-1 text-sm text-[#8b94a7]">{group.detail}</p>
                    <p className="mt-3 text-sm text-[#cdd3df]">Mit {group.members.join(", ")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-semibold sm:text-2xl ${group.balance.startsWith("+") ? "text-[#22c55e]" : "text-white"}`}>{group.balance}</p>
                  <button className="mt-5 inline-flex items-center gap-1 text-sm text-[#e7b11a]">Öffnen<HiOutlineChevronRight /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <div className="mt-6 grid gap-4">
        <button className="gold-button flex items-center justify-center gap-3 rounded-[24px] px-5 py-4 text-lg font-semibold"><HiOutlinePlus className="text-xl" />Neue Gruppe anlegen</button>
        <button className="surface-muted flex items-center justify-center gap-3 rounded-[24px] px-5 py-4 text-lg font-medium text-white"><HiOutlineUserPlus className="text-xl text-[#e7b11a]" />Mitglied zu Gruppe einladen</button>
      </div>
    </>
  );
}
