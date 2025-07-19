"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/who-we-help', label: 'Who We Help' },
  { href: '/services', label: 'What We Do' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/proof', label: 'Proof' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/collaborate', label: 'Collaborate' },
];

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // On mount, check localStorage and set theme
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}>
      {/* Main container with rounded corners and glass effect */}
      <div className="relative max-w-full mx-auto mt-4 mb-4 px-1">
        <div className="bg-[var(--card)] dark:bg-[var(--background)]/80 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10"></div>
          
          <div className="relative px-8 py-4">
            <div className="flex items-center justify-start">
              {/* Logo */}
              <Link href="/home">
                <Logo 
                  variant="png" 
                  size="lg" 
                  showText={false}
                />
              </Link>

              {/* Right side: Navigation and buttons */}
              <div className="flex items-center ml-auto space-x-3">
                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group bg-muted/40 backdrop-blur-md border border-border/80 ${
                          isActive
                            ? 'text-foreground bg-muted/60 border-border'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                        <div
                          className={`absolute inset-0 rounded-md bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 z-0 transition-opacity duration-200
                            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        ></div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Dark mode switch */}
                {mounted && (
                  <button
                    onClick={toggleDarkMode}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="p-2 rounded-md bg-muted/40 backdrop-blur-md border border-border/80 hover:bg-muted/60 transition-colors text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {isDark ? (
                       // Sun icon (filled, yellow)
                       <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                         <circle cx="12" cy="12" r="5" />
                         <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                           <line x1="12" y1="1" x2="12" y2="3" />
                           <line x1="12" y1="21" x2="12" y2="23" />
                           <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                           <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                           <line x1="1" y1="12" x2="3" y2="12" />
                           <line x1="21" y1="12" x2="23" y2="12" />
                           <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                           <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                         </g>
                       </svg>
                    ) : (
                       // Moon icon (filled, blue)
                       <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M21 12.79A9 9 0 1111.21 3c0 .34.02.67.05 1A7 7 0 0021 12.79z" />
                       </svg>
                    )}
                  </button>
                )}

                {/* Mobile menu button */}
                <button className="md:hidden p-2 rounded-md bg-muted/40 backdrop-blur-md border border-border/80 hover:bg-muted/60 transition-colors text-muted-foreground">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* CTA Button: Why DELPAT (last) */}
                <Link href="/why-delpat" className="relative group ml-2">
                  <Button
                    variant="gradient-monotone"
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-primary/20 backdrop-blur-md border border-primary/30 transition-all duration-300 text-primary-foreground"
                  >
                    <span className="relative z-10">Why DELPAT</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}