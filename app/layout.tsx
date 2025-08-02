// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ClientFooter from '@/components/ClientFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sonotron Italia',
  description: 'Tecnologia ultrasuoni per il benessere',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-white text-gray-900 overflow-x-hidden min-h-screen pt-24 pb-28 relative`}>
        <Header />
        <main className="relative w-full">{children}</main>
        <ClientFooter />
      </body>
    </html>
  );
}
