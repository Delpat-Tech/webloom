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
  // Collaborate will be handled as a dropdown below
];

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false);

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

  // Dropdown close on outside click
  useEffect(() => {
    if (!collabOpen) return;
    function handleClick(e: MouseEvent | Event) {
      const target = e.target as Node;
      if (!document.getElementById('collab-dropdown')?.contains(target) &&
          !document.getElementById('collab-trigger')?.contains(target)) {
        setCollabOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [collabOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}>
      {/* Main container with rounded corners and glass effect */}
      <div className="relative max-w-7xl mx-auto mt-4 mb-4 px-1">
        <div className="bg-[var(--card)] dark:bg-[var(--background)]/80 backdrop-blur-md rounded-2xl border border-border">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10"></div>
          
          <div className="relative px-5 py-2">
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
                {/* Desktop Navigation */}
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
                  {/* Collaborate dropdown */}
                  <div className="relative">
                    <button
                      id="collab-trigger"
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={collabOpen}
                      onClick={() => setCollabOpen((v) => !v)}
                      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group bg-muted/40 backdrop-blur-md border border-border/80 text-muted-foreground hover:text-foreground flex items-center gap-1 ${pathname.startsWith('/collaborate') || pathname === '/contact' ? 'text-foreground bg-muted/60 border-border' : ''}`}
                    >
                      <span className="relative z-10">Collaborate</span>
                      <svg className={`w-4 h-4 transition-transform ${collabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {collabOpen && (
                      <div
                        id="collab-dropdown"
                        role="menu"
                        tabIndex={-1}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--card)] dark:bg-[var(--background)]/80 backdrop-blur-md border border-border z-50 py-1 animate-fade-in"
                      >
                        <Link
                          href="/contact"
                          className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-muted/60 ${pathname === '/contact' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'}`}
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => setCollabOpen(false)}
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="/collaborate"
                          className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-muted/60 ${pathname === '/collaborate' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'}`}
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => setCollabOpen(false)}
                        >
                          Partner With Us
                        </Link>
                      </div>
                    )}
                  </div>
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
                <button
                  className="md:hidden p-2 rounded-md bg-muted/40 backdrop-blur-md border border-border/80 hover:bg-muted/60 transition-colors text-muted-foreground"
                  aria-label="Open menu"
                  onClick={() => setMobileMenuOpen(true)}
                >
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
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] flex md:hidden">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
              {/* Menu Panel */}
              <div className="relative ml-auto w-4/5 max-w-xs h-full bg-[var(--card)] dark:bg-[var(--background)]/90 backdrop-blur-md border-l border-border flex flex-col p-6 space-y-4 animate-slide-in-right">
                <button
                  className="self-end mb-4 p-2 rounded-md bg-muted/40 border border-border/80 hover:bg-muted/60 text-muted-foreground"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 ${pathname === link.href ? 'text-foreground bg-muted/60 border-border' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* Collaborate mobile dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={mobileCollabOpen}
                      onClick={() => setMobileCollabOpen((v) => !v)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 ${pathname.startsWith('/collaborate') || pathname === '/contact' ? 'text-foreground bg-muted/60 border-border' : ''}`}
                    >
                      <span>Collaborate</span>
                      <svg className={`w-4 h-4 transition-transform ${mobileCollabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {mobileCollabOpen && (
                      <div className="mt-1 ml-2 flex flex-col space-y-1">
                        <Link
                          href="/contact"
                          className={`px-4 py-2 rounded-md text-base transition-colors duration-200 bg-muted/40 border border-border/80 hover:bg-muted/60 ${pathname === '/contact' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="/collaborate"
                          className={`px-4 py-2 rounded-md text-base transition-colors duration-200 bg-muted/40 border border-border/80 hover:bg-muted/60 ${pathname === '/collaborate' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Partner With Us
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/why-delpat"
                    className="px-4 py-3 rounded-md text-base font-semibold bg-primary/20 border border-primary/30 text-primary-foreground mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Why DELPAT
                  </Link>
                </nav>
                {/* Optional: Add dark mode toggle in mobile menu */}
                {mounted && (
                  <button
                    onClick={toggleDarkMode}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="mt-4 p-2 rounded-md bg-muted/40 border border-border/80 hover:bg-muted/60 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {isDark ? (
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
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 1111.21 3c0 .34.02.67.05 1A7 7 0 0021 12.79z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}