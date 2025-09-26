"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github, 
  ExternalLink,
  Send
} from "lucide-react";
import Link from '@/components/ui/Link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FormFeedback, { useFormFeedback } from "@/components/ui/FormFeedback";
import { validateForm, COMMON_VALIDATION_RULES } from "@/utils/formValidation";
import CookieManager from "@/components/ui/CookieManager";

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    // { href: '/team', label: 'Our Team' }, // Page does not exist
    // { href: '/careers', label: 'Careers' }, // Page does not exist
    { href: '/resources', label: 'Resources' },
    { href: '/proof', label: 'Proof' },
  ],
  ourApproach: [
    { href: '/who-we-help', label: 'Who We Help' },
    { href: '/what-we-do', label: 'Services' },
    { href: '/how-we-work', label: 'Our Process' },
    { href: '/why-delpat', label: 'Why Delpat?' },
    // No subpages exist
  ],
  connect: [
    { href: '/contact', label: 'Contact Delpat' },
    { href: '/partner-with-us', label: 'Partner With Us' },
  
  ],
  legal: [
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/terms', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Preferences', isCookieManager: true },
    // { href: '/legal/cookies', label: 'Cookie Policy' }, // Page does not exist
    // { href: '/legal/gdpr', label: 'GDPR' }, // Page does not exist
    // { href: '/legal/accessibility', label: 'Accessibility' }, // Page does not exist
  ],
};

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/delpatllp/',
    label: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/Delpat-Tech',
    label: 'GitHub',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=delpatllp@gmail.com',
    label: 'Gmail',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.364V5.457c0-.904.732-1.636 1.636-1.636h20.728c.904 0 1.636.732 1.636 1.636zM12 13.5L3.273 6.182v12.182h17.454V6.182L12 13.5z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCookieManagerOpen, setIsCookieManagerOpen] = useState(false);
  const { feedback, showSuccess, showError, showLoading, clearFeedback } = useFormFeedback();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any existing feedback
    clearFeedback();
    
    // Validate email
    const validation = validateForm({ email }, { email: COMMON_VALIDATION_RULES.email });
    
    if (!validation.isValid) {
      showError("Invalid email address", "Please enter a valid email address to subscribe.");
      return;
    }

    setIsSubmitting(true);
    showLoading("Subscribing to newsletter...");

    try {
      // Simulate API call - replace with actual newsletter subscription endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      showSuccess(
        "Successfully subscribed!", 
        "You'll receive our latest updates and insights in your inbox."
      );
      
      setEmail("");
    } catch (error) {
      showError(
        "Subscription failed", 
        "Please try again or contact us if the problem persists."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[var(--card)] dark:bg-[var(--background)]/90 backdrop-blur-md border-t border-border">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-[var(--secondary)]/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-10">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6 mb-6 md:mb-8">
          {/* Brand section */}
          <div className="lg:col-span-1 col-span-2">
            <div className="mb-6">
              <Link href="/">
                <Image src="/images/logo.svg" alt="Delpat Logo" width={64} height={64} className="w-16 h-16" />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The Execution Engine for Ambitious Founders and Teams. Fast. Smart. Trusted.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 group"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div 
            className="lg:col-span-1"
          >
            <h3 className="text-foreground font-semibold mb-3 md:mb-4 text-base md:text-lg">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div 
            className="lg:col-span-1"
          >
            <h3 className="text-foreground font-semibold mb-3 md:mb-4 text-base md:text-lg">
              Our Approach
            </h3>
            <ul className="space-y-2">
              {footerLinks.ourApproach.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div 
            className="lg:col-span-1"
          >
            <h3 className="text-foreground font-semibold mb-3 md:mb-4 text-base md:text-lg">
              Connect
            </h3>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="lg:col-span-1 col-span-2">
            <h3 className="text-foreground font-semibold mb-3 md:mb-4 text-base md:text-lg">
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-2 md:mb-3">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="space-y-3 relative">
              <form onSubmit={handleNewsletterSubmit}>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 md:px-4 py-2 bg-muted/40 backdrop-blur-md border border-border/80 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="gradient-monotone" 
                  className="w-full mt-2 py-2 text-sm font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : (
                    <>Subscribe</>
                  )}
                </Button>
              </form>
              
              {/* Newsletter Feedback - Absolutely positioned */}
              {feedback && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-0.5 sm:p-1 shadow-xl border border-border/50 max-w-sm mx-auto">
                    <FormFeedback
                      type={feedback.type}
                      message={feedback.message}
                      details={feedback.details}
                      onClose={clearFeedback}
                      duration={4000}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-5 md:pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Delpat. All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-1">
              {footerLinks.legal.map((link, index) => (
                <div key={link.href} className="flex items-center">
                  {link.isCookieManager ? (
                    <button
                      onClick={() => setIsCookieManagerOpen(true)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm px-3 py-1 rounded-lg hover:bg-muted/40"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm px-3 py-1 rounded-lg hover:bg-muted/40"
                    >
                      {link.label}
                    </Link>
                  )}
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-muted-foreground/50 text-sm">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Cookie Manager */}
      <CookieManager 
        isOpen={isCookieManagerOpen} 
        onClose={() => setIsCookieManagerOpen(false)} 
      />
    </footer>
  );
}