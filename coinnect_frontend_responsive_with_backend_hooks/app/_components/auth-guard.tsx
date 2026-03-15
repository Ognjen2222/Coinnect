"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("coinnect-token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center text-[#98a2b3]">Lade Ansicht...</div>;
  }

  return <>{children}</>;
}
