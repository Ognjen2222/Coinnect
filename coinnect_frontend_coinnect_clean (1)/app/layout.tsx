import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coinnect',
  description: 'Zusammen zahlen im Coinnect Design',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
