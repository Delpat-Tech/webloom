'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check, X as XIcon } from 'lucide-react';
import Button from './Button';
import { getCookieConsent, setCookieConsent, clearCookieConsent } from '@/lib/cookieConsent';

interface CookieManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookieManager({ isOpen, onClose }: CookieManagerProps) {
  const [currentConsent, setCurrentConsent] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    setCurrentConsent(getCookieConsent());
  }, [isOpen]);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setCurrentConsent('accepted');
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  const handleDecline = () => {
    setCookieConsent('declined');
    setCurrentConsent('declined');
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  const handleReset = () => {
    clearCookieConsent();
    setCurrentConsent(null);
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-lg shadow-xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Cookie Preferences</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Current Status */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-2">Current Status</h3>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  {currentConsent === 'accepted' ? (
                    <>
                      <Check className="h-4 w-4 text-accent" />
                      <span className="text-sm text-foreground">Analytics cookies are enabled</span>
                    </>
                  ) : currentConsent === 'declined' ? (
                    <>
                      <XIcon className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-foreground">Analytics cookies are disabled</span>
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">No preference set</span>
                    </>
                  )}
                </div>
              </div>

              {/* Cookie Types */}
              <div className="space-y-4 mb-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary/90 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-primary/80 mb-2">
                    Required for basic website functionality and security. These cannot be disabled.
                  </p>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary/80">Always enabled</span>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h4 className="font-medium text-accent/90 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-accent/80 mb-2">
                    Help us understand how visitors use our website to improve our services.
                  </p>
                  <div className="flex items-center gap-2">
                    {currentConsent === 'accepted' ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <XIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-accent/80">
                      {currentConsent === 'accepted' ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleAccept}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Enable Analytics Cookies
                </Button>
                <Button
                  variant="gradient-outline"
                  onClick={handleDecline}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Disable Analytics Cookies
                </Button>
                <Button
                  variant="gradient-outline"
                  onClick={handleReset}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Reset Preferences
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  You can change these preferences at any time. 
                  Learn more in our{' '}
                  <a href="/legal/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 