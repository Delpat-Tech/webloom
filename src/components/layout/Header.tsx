'use client'
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { lockBodyScroll } from '@/utils/scrollLock';

const navLinks = [
  // { href: '/home', label: 'Home' }, // Removed Home tab
  // { href: '/who-we-help', label: 'Who We Help' },
  // { href: '/services', label: 'What We Do' },
  // { href: '/how-we-work', label: 'How We Work' },
  { href: '/about', label: 'About' },
  {
    label: 'Our Approach',
    isDropdown: 'ourApproach',
    children: [
      { href: '/who-we-help', label: 'Who We Help' },
      { href: '/what-we-do', label: 'Services' },
      { href: '/how-we-work', label: 'Our Process' },
      { href: '/why-delpat', label: 'Why DelPat?' },
    ],
  },
  { href: '/pricing', label: 'Pricing' },
  { href: '/proof', label: 'Proof' },
  { href: '/resources', label: 'Resources' },
  {
    label: 'Contact',
    isDropdown: true,
    children: [
      { href: '/contact', label: 'Contact Delpat' },
      { href: '/partner-with-us', label: 'Partner With Us' }
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

import { HeaderProps } from '@/types';

export default function Header({ showHeader = true }: HeaderProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [ourApproachOpen, setOurApproachOpen] = useState(false); // new state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Separate mobile dropdown states
  const [mobileOurApproachOpen, setMobileOurApproachOpen] = useState(false);
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false);

  const [loaderActive, setLoaderActive] = useState(true);

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
      // Add transition class to body for smooth animation
      document.body.classList.add('theme-transitioning');
      
      // Change the theme immediately with smooth CSS transitions
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
      
      // Remove the transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 200); // Reduced from 600ms to 200ms to match CSS transition duration
    }
  };

  useEffect(() => {
    function handleClick(e: MouseEvent | Event) {
      const target = e.target as Node;
      // For Our Approach
      if (
        ourApproachOpen &&
        !document.getElementById('ourApproach-dropdown')?.contains(target) &&
        !document.getElementById('ourApproach-trigger')?.contains(target)
      ) {
        setOurApproachOpen(false);
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
        }, [ourApproachOpen, collabOpen]);

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

  // Close mobile menu and mobile dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOurApproachOpen(false);
    setMobileCollabOpen(false);
  }, [pathname]);

  // Prevent body scroll and add blur effect when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      lockBodyScroll(true);
      // Add blur effect to the main content, excluding the navbar
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('blur-sm');
      }
      
      return () => {
        lockBodyScroll(false);
        // Remove blur effect when menu closes
        if (mainContent) {
          mainContent.classList.remove('blur-sm');
        }
      };
    }
  }, [mobileMenuOpen]);

  // Don't render header if explicitly hidden
  if (!showHeader) {
    return null;
  }

  const normalize = (str: string) => (str ? str.replace(/\/$/, '') : '');
  const current = normalize(pathname);

  return (
    <motion.nav
      className="sticky top-4 left-0 right-0 z-[100] p-3 sm:p-4 rounded-2xl bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border/60 shadow-2xl flex items-center justify-between max-w-5xl mx-auto relative group"
    >
      {/* Main nav glow effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, var(--primary)/8 0%, var(--secondary)/8 50%, var(--accent)/8 100%)',
        }}
      />
      
      {/* Logo - Responsive sizing */}
      <Link href="/" className="flex-shrink-0 pl-2 sm:pl-4 group relative z-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-110 group-hover:scale-100"></div>
        <Logo size="md" showText={false} className="relative z-10 transition-transform duration-300 group-hover:scale-105" />
      </Link>

      {/* Desktop Navigation - Hidden on mobile and tablet */}
      <div className="hidden lg:flex flex-1 justify-center relative z-10">
        <motion.div className="relative">
          <ul className="flex items-center gap-3 relative z-10">
            {navLinks.map((link) => {
              const isDropdownActive = link.children?.some(child => child.href && (current === normalize(child.href) || current.startsWith(normalize(child.href) + '/')));
              const isActive = link.href && (current === normalize(link.href) || current.startsWith(normalize(link.href) + '/'));
              if (link.isDropdown === 'ourApproach') {
                return (
                  <motion.li key={link.label} className="relative" onMouseEnter={() => setOurApproachOpen(true)} onMouseLeave={() => setOurApproachOpen(false)}>
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
                        id="ourApproach-trigger"
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 text-sm relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl ${isActive || isDropdownActive ? 'font-bold text-primary' : ''} hover:text-primary hover:font-bold`}
                        variants={itemVariants}
                        transition={sharedTransition}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center bottom',
                        }}
                        aria-haspopup="menu"
                        aria-expanded={ourApproachOpen}
                        onClick={() => setOurApproachOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${ourApproachOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        aria-expanded={ourApproachOpen}
                        onClick={() => setOurApproachOpen((v) => !v)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <svg className={`w-4 h-4 transition-transform ${ourApproachOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      {/* Dropdown menu */}
                      {ourApproachOpen && (
                        <div
                          id="ourApproach-dropdown"
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
                                onClick={() => setOurApproachOpen(false)}
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

      {/* Right side: dark mode, mobile menu, CTA */}
      <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
        {/* Dark mode toggle - hidden on very small screens */}
        {mounted && (
          <Button
            onClick={toggleDarkMode}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="hidden sm:block p-1 bg-muted/40 backdrop-blur-md border border-border hover:bg-muted/60 transition-colors text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary theme-toggle"
            variant="tertiary"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-4 h-4 text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            style={{ touchAction: 'none' }}
          />
          
          {/* Menu Panel */}
          <div className="relative mx-auto w-[85vw] max-w-[350px] h-[75vh] max-h-[500px] mt-[12vh] bg-card/98 dark:bg-background/98 backdrop-blur-xl border border-border/80 rounded-2xl flex flex-col animate-slide-in-right shadow-2xl">
            {/* Header section with logo */}
            <div className="flex-shrink-0 p-4 pb-3 border-b border-border/50">
                             {/* Top row: Logo, dark mode toggle, and close button */}
               <div className="flex items-center justify-between mb-3">
                 {/* Logo */}
                 <Link href="/" className="flex-shrink-0">
                   <Logo size="md" showText={false} className="transition-transform duration-300 hover:scale-105" />
                 </Link>
                 
                 {/* Right side: Dark mode toggle and close button */}
                 <div className="flex items-center space-x-2">
                   {/* Dark mode toggle for mobile */}
                   {mounted && (
                     <Button
                       onClick={toggleDarkMode}
                       aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                       className="p-1.5 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors !bg-transparent hover:!bg-transparent theme-toggle"
                       variant="tertiary"
                     >
                      {isDark ? (
                        <svg className="w-3.5 h-3.5 text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
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
                        <svg className="w-3.5 h-3.5 text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 12.79A9 9 0 1111.21 3c0 .34.02.67.05 1A7 7 0 0021 12.79z" />
                        </svg>
                      )}
                    </Button>
                  )}
                  
                  {/* Close button */}
                  <Button
                    className="p-1.5 text-foreground hover:text-primary transition-colors !bg-transparent hover:!bg-transparent"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                    variant="tertiary"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                 </div>
               </div>
            </div>

            {/* Scrollable content section */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent px-4 py-3" style={{ touchAction: 'pan-y' }}>
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => {
                  if (link.isDropdown === 'howWeHelp') {
                    return (
                      <React.Fragment key={link.label}>
                        <motion.button
                          type="button"
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 bg-muted/40 border border-border/60 text-foreground hover:text-primary hover:bg-muted/60 ${
                            current === normalize('/who-we-help') || current === normalize('/what-we-do') || current === normalize('/how-we-work') ? 'text-primary bg-muted/60 border-border' : ''
                          }`}
                          onClick={() => setMobileHowWeHelpOpen((v) => !v)}
                        >
                          {link.label}
                          <svg className={`w-3.5 h-3.5 inline-block ml-2 transition-transform ${mobileHowWeHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                        {mobileHowWeHelpOpen && link.children?.map((child) => (
                          <Link
                            key={child.href || child.label}
                            href={child.href || '#'}
                            className={`px-3 py-2.5 ml-3 rounded-lg text-sm font-medium transition-all duration-300 bg-muted/30 border border-border/50 text-foreground hover:text-primary hover:bg-muted/50 ${
                              child.href && current === normalize(child.href) ? 'text-primary bg-muted/50 border-border' : ''
                            }`}
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
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 bg-muted/40 border border-border/60 text-foreground hover:text-primary hover:bg-muted/60 ${
                            current === normalize('/contact') || current === normalize('/partner-with-us') ? 'text-primary bg-muted/60 border-border' : ''
                          }`}
                          onClick={() => setMobileCollabOpen((v) => !v)}
                        >
                          {link.label}
                          <svg className={`w-3.5 h-3.5 inline-block ml-2 transition-transform ${mobileCollabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                        {mobileCollabOpen && link.children?.map((child) => (
                          <Link
                            key={child.href || child.label}
                            href={child.href || '#'}
                            className={`px-3 py-2.5 ml-3 rounded-lg text-sm font-medium transition-all duration-300 bg-muted/30 border border-border/50 text-foreground hover:text-primary hover:bg-muted/50 ${
                              child.href && current === normalize(child.href) ? 'text-primary bg-muted/50 border-border' : ''
                            }`}
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
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 bg-muted/40 border border-border/60 text-foreground hover:text-primary hover:bg-muted/60 ${
                        link.href && current === normalize(link.href) ? 'text-primary bg-muted/60 border-border' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* CTA in mobile menu */}
                <Link
                  href="/contact"
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold bg-primary border border-primary/30 text-primary-foreground mt-3 hover:bg-primary/90 transition-colors"
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
