"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
];

export default function Header() {
  const [activeLink, setActiveLink] = useState('/home');
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
      <div className="relative max-w-7xl mx-auto mt-4 mb-4 px-1">
        <div className="bg-[var(--card)] dark:bg-[var(--background)]/80 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10"></div>
          
          <div className="relative px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/home">
                <Logo 
                  variant="png" 
                  size="lg" 
                  showText={false}
                />
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setActiveLink(link.href)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group bg-muted/40 backdrop-blur-md border border-border/80 ${
                      activeLink === link.href
                        ? 'text-foreground bg-muted/60 border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {activeLink === link.href && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <Link href="/collaborate" className="relative group">
                  <Button
                    variant="gradient-monotone"
                    className="px-6 py-2.5 font-semibold rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 transition-all duration-300 text-primary-foreground"
                  >
                    <span className="relative z-10">Collaborate</span>
                  </Button>
                </Link>

                {/* Dark mode switch */}
                {mounted && (
                  <button
                    onClick={toggleDarkMode}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="p-2 rounded-lg bg-muted/40 backdrop-blur-md border border-border/80 hover:bg-muted/60 transition-colors text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {isDark ? (
                      // Sun icon
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
                      </svg>
                    ) : (
                      // Moon icon
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Mobile menu button */}
                <button className="md:hidden p-2 rounded-lg bg-muted/40 backdrop-blur-md border border-border/80 hover:bg-muted/60 transition-colors text-muted-foreground">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}