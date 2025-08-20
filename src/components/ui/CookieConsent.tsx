'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';
import Button from './Button';
import Link from './Link';
import { getCookieConsent, setCookieConsent } from '@/lib/cookieConsent';

import { CookieConsentProps } from '@/types';

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = getCookieConsent();
    if (!cookieConsent) {
      // Show banner after a short delay to ensure page is loaded
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
    onAccept?.();
    
    // Dispatch custom event to notify analytics components
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  const handleDecline = () => {
    setCookieConsent('declined');
    setIsVisible(false);
    onDecline?.();
    
    // Dispatch custom event to notify analytics components
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: isMobile ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: isMobile ? -100 : 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed z-50 p-4 bg-card border shadow-lg ${
          isMobile 
            ? 'top-20 left-4 right-4 mx-auto max-w-md rounded-xl' 
            : 'bottom-0 left-0 right-0 border-t border-border'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icon and Main Content */}
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  We use cookies and similar technologies to help personalize content, 
                  provide and improve our services, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
                
                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-3 border-t border-border">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                            <h4 className="font-medium text-primary/90 mb-1">Essential Cookies</h4>
                            <p className="text-xs text-primary/80">
                              Required for basic website functionality and security.
                            </p>
                          </div>
                          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                            <h4 className="font-medium text-accent/90 mb-1">Analytics Cookies</h4>
                            <p className="text-xs text-accent/80">
                              Help us understand how visitors use our website.
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          You can learn more about our cookie policy in our{' '}
                          <Link href="/legal/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          . You can change your preferences at any time.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button
                variant="gradient-outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm"
              >
                <Settings className="h-4 w-4" />
                {isExpanded ? 'Less' : 'More'}
              </Button>
              <Button
                variant="gradient-outline"
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm"
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm"
              >
                Accept All
              </Button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center justify-center"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 