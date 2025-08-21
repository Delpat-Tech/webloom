"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Info, AlertTriangle, X } from 'lucide-react';
import Button from './Button';

export interface FormFeedbackProps {
  type: "success" | "error" | "loading" | "info" | "warning";
  message: string;
  details?: string;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export default function FormFeedback({
  type,
  message,
  details,
  duration = 5000,
  onClose,
  showCloseButton = true,
  className = ""
}: FormFeedbackProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type !== "loading" && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-3 h-3" />;
      case "error":
        return <XCircle className="w-3 h-3" />;
      case "loading":
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case "info":
        return <Info className="w-3 h-3" />;
      case "warning":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-accent/10 border-accent/20 text-accent";
      case "error":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      case "loading":
        return "bg-primary/10 border-primary/20 text-primary";
      case "info":
        return "bg-blue-500/10 border-blue-500/20 text-blue-500";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-500";
      default:
        return "bg-muted/10 border-border text-foreground";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`p-2 rounded-lg border text-xs ${getStyles()} ${className}`}
        >
                     <div className="flex items-start gap-2">
             <div className="flex-shrink-0 mt-0.5">
               <div className="w-3 h-3">
                 {getIcon()}
               </div>
             </div>
             <div className="flex-1 min-w-0 space-y-0.5">
               <p className="font-medium text-xs leading-tight">{message}</p>
               {details && (
                 <p className="text-xs opacity-80 leading-tight">{details}</p>
               )}
             </div>
             {showCloseButton && type !== "loading" && (
               <Button
                 onClick={handleClose}
                 className="flex-shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors"
                 variant="tertiary"
                 aria-label="Close feedback"
               >
                 <X className="w-3 h-3" />
               </Button>
             )}
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing form feedback state
export function useFormFeedback() {
  const [feedback, setFeedback] = useState<{
    type: FormFeedbackProps["type"];
    message: string;
    details?: string;
  } | null>(null);

  const showSuccess = (message: string, details?: string) => {
    setFeedback({ type: "success", message, details });
  };

  const showError = (message: string, details?: string) => {
    setFeedback({ type: "error", message, details });
  };

  const showLoading = (message: string) => {
    setFeedback({ type: "loading", message });
  };

  const showInfo = (message: string, details?: string) => {
    setFeedback({ type: "info", message, details });
  };

  const showWarning = (message: string, details?: string) => {
    setFeedback({ type: "warning", message, details });
  };

  const clearFeedback = () => {
    setFeedback(null);
  };

  return {
    feedback,
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    clearFeedback,
  };
} 