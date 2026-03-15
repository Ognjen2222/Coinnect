import { HiArrowDownLeft, HiArrowUpRight, HiMiniBanknotes, HiMiniQrCode, HiMiniUserGroup } from "react-icons/hi2";
import { PiPiggyBank } from "react-icons/pi";

export function ActionIcon({ type, className = "text-3xl" }: { type: "group" | "bank" | "piggy" | "qr"; className?: string }) {
  const common = { className };
  if (type === "group") return <HiMiniUserGroup {...common} />;
  if (type === "bank") return <HiMiniBanknotes {...common} />;
  if (type === "piggy") return <PiPiggyBank {...common} />;
  return <HiMiniQrCode {...common} />;
}

export function ActivityIcon({ type, className = "text-3xl" }: { type: "group" | "incoming" | "outgoing"; className?: string }) {
  const common = { className };
  if (type === "group") return <HiMiniUserGroup {...common} />;
  if (type === "incoming") return <HiArrowDownLeft {...common} />;
  return <HiArrowUpRight {...common} />;
}
