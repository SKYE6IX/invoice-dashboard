import type { Metadata } from 'next';
import { Lusitana } from 'next/font/google';
import '../globalStyles/globals.scss';

const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lusitana',
});

export const metadata: Metadata = {
  title: 'Invoice Dasboard',
  description: 'Easily create and track invoice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lusitana.variable}>{children}</body>
    </html>
  );
}
