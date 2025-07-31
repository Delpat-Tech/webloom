'use client'
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useTranslation } from '@/components/layout/TranslationProvider';

// Navigation links will be created dynamically using translations
const createNavLinks = (t: (key: string) => string) => [
  { href: '/about', label: t('common.navigation.about') },
  {
    label: t('common.navigation.howWeWork'),
    isDropdown: 'howWeHelp',
    children: [
      { href: '/who-we-help', label: t('common.navigation.whoWeHelp') },
      { href: '/services', label: t('common.navigation.services') },
      { href: '/how-we-work', label: t('common.navigation.howWeWork') },
      { href: '/why-delpat', label: t('common.navigation.whyDelpat') },
    ],
  },
  { href: '/pricing', label: t('common.navigation.pricing') },
  { href: '/proof', label: 'Proof' }, // Keep as is since it's not in translations yet
  { href: '/resources', label: t('common.navigation.resources') },
  {
    href: '/collaborate',
    label: t('common.navigation.collaborate'),
    isDropdown: true,
    children: [
      { href: '/contact', label: t('common.navigation.contact') },
      { href: '/collaborate', label: t('common.navigation.collaborate') }
    ]
  },
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
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [howWeHelpOpen, setHowWeHelpOpen] = useState(false); // new state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Separate mobile dropdown states
  const [mobileHowWeHelpOpen, setMobileHowWeHelpOpen] = useState(false);
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false);

  const [loaderActive, setLoaderActive] = useState(true);

  // Create navigation links with translations
  const navLinks = createNavLinks(t);

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
    function handleClick(e: MouseEvent | Event) {
      const target = e.target as Node;
      // For How We Help
      if (
        howWeHelpOpen &&
        !document.getElementById('howwehelp-dropdown')?.contains(target) &&
        !document.getElementById('howwehelp-trigger')?.contains(target)
      ) {
        setHowWeHelpOpen(false);
      }
      // For Collaborate
      if (
        collabOpen &&
        !document.getElementById('collab-dropdown')?.contains(target) &&
        !document.getElementById('collab-trigger')?.contains(target)
      ) {
        setCollabOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [howWeHelpOpen, collabOpen]);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render header if showHeader is false or loader is active
  if (!showHeader || loaderActive) {
    return null;
  }

  const normalize = (str: string) => (str ? str.replace(/\/$/, '') : '');
  const current = normalize(pathname);

  return (
    <motion.nav
      className="sticky top-0 left-0 right-0 z-[100] p-3 sm:p-4 rounded-2xl bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border/60 shadow-2xl flex items-center justify-between max-w-6xl mx-auto mt-2 sm:mt-3"
      initial="initial"
      whileHover="hover"
    >
      {/* Logo - Responsive sizing */}
      <Link href="/" className="flex-shrink-0 pl-2 sm:pl-4 group relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-110 group-hover:scale-100"></div>
        <Logo variant="png" size="md" showText={false} className="relative z-10 transition-transform duration-300 group-hover:scale-105" />
      </Link>

      {/* Desktop Navigation - Hidden on mobile and tablet */}
      <div className="hidden lg:flex flex-1 justify-center">
        <motion.div className="relative">
          <motion.div
            className="absolute -inset-3 rounded-3xl z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--primary)/8 0%, var(--secondary)/8 50%, var(--accent)/8 100%)',
            }}
            variants={navGlowVariants}
          />
          <ul className="flex items-center gap-3 relative z-10">
            {navLinks.map((link) => {
              const isDropdownActive = link.children?.some(child => child.href && (current === normalize(child.href) || current.startsWith(normalize(child.href) + '/')));
              const isActive = link.href && (current === normalize(link.href) || current.startsWith(normalize(link.href) + '/'));
              if (link.isDropdown === 'howWeHelp') {
                return (
                  <motion.li key={link.label} className="relative" onMouseEnter={() => setHowWeHelpOpen(true)} onMouseLeave={() => setHowWeHelpOpen(false)}>
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
                        id="howwehelp-trigger"
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive || isDropdownActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                        variants={itemVariants}
                        transition={sharedTransition}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center bottom',
                        }}
                        aria-haspopup="menu"
                        aria-expanded={howWeHelpOpen}
                        onClick={() => setHowWeHelpOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${howWeHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {/* Back-facing menu item for the 3D flip effect */}
                      <motion.button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive || isDropdownActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                        variants={backVariants}
                        transition={sharedTransition}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center top',
                          transform: 'rotateX(90deg)',
                        }}
                        aria-haspopup="menu"
                        aria-expanded={howWeHelpOpen}
                        onClick={() => setHowWeHelpOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${howWeHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {/* Dropdown menu */}
                      {howWeHelpOpen && (
                        <div
                          id="howwehelp-dropdown"
                          role="menu"
                          tabIndex={-1}
                          className="absolute left-0 top-full 
                        w-48 shadow-lg bg-card border border-border rounded-md z-[200] py-1 animate-fade-in"
                        >
                          {link.children?.map((child) => {
                            const isChildActive = child.href && (current === normalize(child.href) || current.startsWith(normalize(child.href) + '/'));
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 text-muted-foreground ${isChildActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                                role="menuitem"
                                tabIndex={0}
                                onClick={() => setHowWeHelpOpen(false)}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              }
              if (link.isDropdown) {
                return (
                  <motion.li key={link.href} className="relative" onMouseEnter={() => setCollabOpen(true)} onMouseLeave={() => setCollabOpen(false)}>
                    <motion.div
                      className="block overflow-visible group relative"
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
                        id="collab-trigger"
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive || isDropdownActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
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
                        className={`flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive || isDropdownActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
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
                          className="absolute left-0 top-full w-48 shadow-lg bg-card border border-border rounded-md z-[200] py-1 animate-fade-in"
                        >
                          {link.children?.map((child) => {
                            const isChildActive = child.href && (current === normalize(child.href) || current.startsWith(normalize(child.href) + '/'));
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 text-muted-foreground ${isChildActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                                role="menuitem"
                                tabIndex={0}
                                onClick={() => setCollabOpen(false)}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              }
              // Default nav link
              return (
                <motion.li key={link.href || link.label} className="relative">
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
                    {link.href ? (
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                      >
                        <motion.span
                          className="font-medium"
                          variants={itemVariants}
                          transition={sharedTransition}
                          style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center bottom',
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl cursor-pointer">
                        <motion.span
                          className="font-medium"
                          variants={itemVariants}
                          transition={sharedTransition}
                          style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center bottom',
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </div>
                    )}
                    {/* Back-facing menu item for the 3D flip effect */}
                    {link.href ? (
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                      >
                        <motion.span
                          className="font-medium"
                          variants={backVariants}
                          transition={sharedTransition}
                          style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center top',
                            transform: 'rotateX(90deg)',
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 text-sm absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl cursor-pointer">
                        <motion.span
                          className="font-medium"
                          variants={backVariants}
                          transition={sharedTransition}
                          style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center top',
                            transform: 'rotateX(90deg)',
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </div>
                    )}
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Right side: dark mode, language switcher, mobile menu, CTA */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Language switcher - hidden on very small screens */}
        <div className="hidden sm:block">
          <LanguageSwitcher variant="minimal" showFlags={true} />
        </div>

        {/* Dark mode toggle - hidden on very small screens */}
        {mounted && (
          <Button
            onClick={toggleDarkMode}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="hidden sm:block p-1 bg-muted/40 backdrop-blur-md border border-border hover:bg-muted/60 transition-colors text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            variant="tertiary"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3c0 .34.02.67.05 1A7 7 0 0021 12.79z" />
              </svg>
            )}
          </Button>
        )}

        {/* CTA Button - Responsive sizing */}
        <Link href="/contact" className="relative group ml-1 sm:ml-2 pr-2 sm:pr-4">
          <Button
            variant="gradient-monotone"
            className="px-2 sm:px-3 text-xs font-semibold rounded-md bg-primary/20 backdrop-blur-md border border-primary/30 transition-all duration-300 text-primary-foreground"
          >
            <span className="relative z-10">Get a Quote</span>
          </Button>
        </Link>

        {/* Mobile menu button - visible on all screens below lg */}
        <Button
          className="lg:hidden p-2 bg-muted/40 backdrop-blur-md border border-border hover:bg-muted/60 transition-colors text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
          variant="tertiary"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel - Responsive positioning and sizing */}
          <div className="relative mx-auto w-[90vw] max-w-[400px] h-[80vh] max-h-[600px] mt-[10vh] bg-card/95 dark:bg-background/95 backdrop-blur-md border border-border rounded-2xl flex flex-col animate-slide-in-right shadow-2xl">
            {/* Header section - fixed */}
            <div className="flex-shrink-0 p-4 sm:p-6 pb-2 border-b border-border/50">
              {/* Close button */}
              <Button
                className="self-end mb-2 p-2 rounded-md bg-muted/40 border border-border/80 hover:bg-muted/60 text-foreground hover:text-primary transition-colors"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                variant="tertiary"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Language switcher for mobile */}
              <div className="self-start mb-4">
                <LanguageSwitcher variant="buttons" showFlags={true} showNativeNames={true} />
              </div>

              {/* Dark mode toggle for mobile */}
              {mounted && (
                <Button
                  onClick={toggleDarkMode}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="self-start mb-4 p-1 rounded-md bg-muted/40 border border-border/80 hover:bg-muted/60 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  variant="tertiary"
                >
                  {isDark ? (
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1111.21 3c0 .34.02.67.05 1A7 7 0 0021 12.79z" />
                    </svg>
                  )}
                </Button>
              )}
            </div>

            {/* Scrollable content section */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent px-4 sm:px-6 py-4">
                          {/* Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                if (link.isDropdown === 'howWeHelp') {
                  return (
                    <React.Fragment key={link.label}>
                      <motion.button
                        type="button"
                        className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-foreground hover:text-primary hover:bg-muted/60 ${
                          current === normalize('/who-we-help') || current === normalize('/services') || current === normalize('/how-we-work') ? 'text-primary bg-muted/60 border-border' : ''
                        }`}
                        onClick={() => setMobileHowWeHelpOpen((v) => !v)}
                      >
                        {link.label}
                        <svg className={`w-4 h-4 inline-block ml-2 transition-transform ${mobileHowWeHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {mobileHowWeHelpOpen && link.children?.map((child) => (
                        <Link
                          key={child.href || child.label}
                          href={child.href || '#'}
                          className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-foreground hover:text-primary hover:bg-muted/60 ${
                            child.href && current === normalize(child.href) ? 'text-primary bg-muted/60 border-border' : ''
                          }`}
                          onClick={() => setMobileHowWeHelpOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </React.Fragment>
                  );
                }
                if (link.isDropdown) {
                  return (
                    <React.Fragment key={link.href}>
                      <motion.button
                        type="button"
                        className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-foreground hover:text-primary hover:bg-muted/60 ${
                          current === normalize('/contact') || current === normalize('/collaborate') ? 'text-primary bg-muted/60 border-border' : ''
                        }`}
                        onClick={() => setMobileCollabOpen((v) => !v)}
                      >
                        {link.label}
                        <svg className={`w-4 h-4 inline-block ml-2 transition-transform ${mobileCollabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {mobileCollabOpen && link.children?.map((child) => (
                        <Link
                          key={child.href || child.label}
                          href={child.href || '#'}
                          className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-foreground hover:text-primary hover:bg-muted/60 ${
                            child.href && current === normalize(child.href) ? 'text-primary bg-muted/60 border-border' : ''
                          }`}
                          onClick={() => setMobileCollabOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </React.Fragment>
                  );
                }
                return (
                  <Link
                    key={link.href || link.label}
                    href={link.href || '#'}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 bg-muted/40 border border-border/80 text-foreground hover:text-primary hover:bg-muted/60 ${
                      link.href && current === normalize(link.href) ? 'text-primary bg-muted/60 border-border' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
                
                {/* CTA in mobile menu */}
                <Link
                  href="/contact"
                  className="px-4 py-3 rounded-md text-base font-semibold bg-primary border border-primary/30 text-primary-foreground mt-4 hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Quote
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
