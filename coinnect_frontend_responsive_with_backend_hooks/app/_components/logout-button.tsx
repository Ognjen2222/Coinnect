"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("coinnect-token");
        localStorage.removeItem("coinnect-user");
        router.push("/");
        router.refresh();
      }}
      className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
    >
      Logout
    </button>
  );
}
