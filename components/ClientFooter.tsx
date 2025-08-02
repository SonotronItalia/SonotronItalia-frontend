// components/ClientFooter.tsx
'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ClientFooter() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return <Footer fixed={!isHome} />;
}
