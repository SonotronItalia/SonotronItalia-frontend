'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-red-600">
          SONOTRON
        </Link>

        {/* Navigation links */}
        <nav className="flex space-x-6 text-sm font-medium text-gray-800">
          <Link href="/prodotti" className="hover:text-red-600">Prodotti</Link>

          <Link href="/contatti" className="hover:text-red-600">Contatti</Link>
        </nav>
      </div>
    </header>
  );
}
