'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/prodotti', label: 'Prodotti' },
  { href: '/azienda', label: 'Azienda' },
  { href: '/contatti', label: 'Contatti' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Chiudi menu al cambio rotta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-white text-[#0099CC] shadow-md border-b border-[#0099CC]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-full px-4">
      {/* Logo */}
      <Link href="/" className="text-xl">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-red-600">Sonotron</span>
          <span className="text-[#0099CC]">Italia s.r.l.</span>
        </h1>
       </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-red-600 font-semibold'
                    : 'text-[#0099CC] hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>


        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu mobile">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-blue-900 border-t border-blue-800 shadow-lg z-40">
          <ul className="flex flex-col text-center text-white text-base py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-red-600 font-semibold'
                      : 'text-white hover:text-red-600'
                  }`}

                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
