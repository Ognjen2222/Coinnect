import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coinnect",
  description: "Frontend prototype for splitting group payments.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="bg-[#05070d] text-white antialiased">{children}</body>
    </html>
  );
}
