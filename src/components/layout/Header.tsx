'use client'
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, Settings, Bell, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/who-we-help', label: 'Who We Help' },
  { href: '/services', label: 'What We Do' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/proof', label: 'Proof' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/collaborate', label: 'Collaborate', isDropdown: true },
];

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

interface HeaderProps {
  showHeader?: boolean;
}

export default function Header({ showHeader = true }: HeaderProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false);
  const [loaderActive, setLoaderActive] = useState(true); // Start as true to hide initially

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

  // Check for loader state
  useEffect(() => {
    const checkLoaderState = () => {
      const isLoaderActive = document.documentElement.hasAttribute('data-loader-active');
      setLoaderActive(isLoaderActive);
    };

    // Initial check
    checkLoaderState();

    // Watch for changes
    const observer = new MutationObserver(checkLoaderState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-loader-active']
    });

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    if (!collabOpen) return;
    function handleClick(e: MouseEvent | Event) {
      const target = e.target as Node;
      if (
        !document.getElementById('collab-dropdown')?.contains(target) &&
        !document.getElementById('collab-trigger')?.contains(target)
      ) {
        setCollabOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [collabOpen]);

  // Don't render header if showHeader is false or loader is active
  if (!showHeader || loaderActive) {
    return null;
  }

  return (
    <motion.nav
      className="sticky top-0 left-0 right-0 z-[100] p-2 rounded-2xl bg-card/80 dark:bg-card/80 backdrop-blur-lg border border-border shadow-lg flex items-center justify-between max-w-[95%] mx-auto my-4"
      initial="initial"
      whileHover="hover"
    >
      {/* Logo */}
      <Link href="/home" className="flex-shrink-0 pl-4">
        <Logo variant="png" size="lg" showText={false} />
      </Link>
      {/* Animated Links */}
      <div className="flex-1 flex justify-center">
        <motion.div className="relative">
          <motion.div
            className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--primary)/10 0%, var(--secondary)/10 50%, var(--accent)/10 100%)',
            }}
            variants={navGlowVariants}
          />
          <ul className="flex items-center gap-2 relative z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.isDropdown) {
                return (
                  <motion.li key={link.href} className="relative">
                    <motion.div
                      className="block rounded-xl overflow-visible group relative"
                      style={{ perspective: '600px' }}
                      whileHover="hover"
                      initial="initial"
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                        variants={glowVariants}
                        style={{
                          background: 'radial-gradient(circle, var(--primary)/15 0%, var(--secondary)/6 50%, var(--accent)/0 100%)',
                          opacity: 0,
                        }}
                      />
                      {/* Front-facing menu item */}
                      <motion.button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''}`}
                        variants={itemVariants}
                        transition={sharedTransition}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center bottom',
                        }}
                        aria-haspopup="menu"
                        aria-expanded={collabOpen}
                        onClick={() => setCollabOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${collabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {/* Back-facing menu item for the 3D flip effect */}
                      <motion.button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''}`}
                        variants={backVariants}
                        transition={sharedTransition}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center top',
                          transform: 'rotateX(90deg)',
                        }}
                        aria-haspopup="menu"
                        aria-expanded={collabOpen}
                        onClick={() => setCollabOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${collabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {/* Dropdown menu */}
                      {collabOpen && (
                        <div
                          id="collab-dropdown"
                          role="menu"
                          tabIndex={-1}
                          className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-[200] py-1 animate-fade-in"
                        >
                          <Link
                            href="/contact"
                            className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 bg-muted hover:bg-muted/60 text-muted-foreground hover:text-foreground`}
                            role="menuitem"
                            tabIndex={0}
                            onClick={() => setCollabOpen(false)}
                          >
                            Contact Us
                          </Link>
                          <Link
                            href="/collaborate"
                            className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 bg-muted hover:bg-muted/60 text-muted-foreground hover:text-foreground`}
                            role="menuitem"
                            tabIndex={0}
                            onClick={() => setCollabOpen(false)}
                          >
                            Partner With Us
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              }
              // Default nav link
              return (
                <motion.li key={link.href} className="relative">
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: '600px' }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                      variants={glowVariants}
                      style={{
                        background: 'radial-gradient(circle, var(--primary)/15 0%, var(--secondary)/6 50%, var(--accent)/0 100%)',
                        opacity: 0,
                      }}
                    />
                    {/* Front-facing menu item */}
                    <motion.a
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''}`}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center bottom',
                      }}
                    >
                      <span className="font-medium">{link.label}</span>
                    </motion.a>
                    {/* Back-facing menu item for the 3D flip effect */}
                    <motion.a
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''}`}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center top',
                        transform: 'rotateX(90deg)',
                      }}
                    >
                      <span className="font-medium">{link.label}</span>
                    </motion.a>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
      {/* Right side: dark mode, mobile menu, CTA */}
      <div className="flex items-center space-x-3">
        {mounted && (
          <button
            onClick={toggleDarkMode}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1 rounded-md bg-muted/40 backdrop-blur-md border border-border hover:bg-muted/60 transition-colors text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
        <button
          className="lg:hidden p-2 rounded-md bg-muted/40 backdrop-blur-md border border-border hover:bg-muted/60 transition-colors text-muted-foreground"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/why-delpat" className="relative group ml-2 pr-4">
          <Button
            variant="gradient-monotone"
            className="px-3 text-xs font-semibold rounded-md bg-primary/20 backdrop-blur-md border border-primary/30 transition-all duration-300 text-primary-foreground"
          >
            <span className="relative z-10">Why DELPAT</span>
          </Button>
        </Link>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="rerelative mx-auto w-[80vw] max-w-[90vw] h-full bg-[var(--card)] dark:bg-[var(--background)]/90 backdrop-blur-md border-l border-border flex flex-col p-6 space-y-4 animate-slide-in-right">
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
                  className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-[var(--muted)] dark:bg-[var(--muted)] text-muted-foreground hover:text-foreground hover:bg-muted/60 ${
                    pathname === link.href ? 'text-foreground bg-muted/60 border-border' : ''
                  }`}
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-[var(--muted)] dark:bg-[var(--muted)] border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 ${
                    pathname.startsWith('/collaborate') || pathname === '/contact'
                      ? 'text-foreground bg-muted/60 border-border'
                      : ''
                  }`}
                >
                  <span>Collaborate</span>
                  <svg className={`w-4 h-4 transition-transform ${mobileCollabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileCollabOpen && (
                  <div className="mt-1 ml-2 flex flex-col space-y-1">
                    <Link
                      href="/contact"
                      className={`px-4 py-2 rounded-md text-base transition-colors duration-200 bg-muted border border-border/80 hover:bg-muted/60 ${
                        pathname === '/contact' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/collaborate"
                      className={`px-4 py-2 rounded-md text-base transition-colors duration-200 bg-muted border border-border/80 hover:bg-muted/60 ${
                        pathname === '/collaborate' ? 'bg-muted/60 text-foreground' : 'text-muted-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Partner With Us
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/why-delpat"
                className="px-4 py-2 rounded-md text-base font-semibold bg-primary border border-primary/30 text-primary-foreground mt-2"
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
                className="mt-4 p-2 rounded-md bg-muted border border-border/80 hover:bg-muted/60 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
    </motion.nav>
  );
}
