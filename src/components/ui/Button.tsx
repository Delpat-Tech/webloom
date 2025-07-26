import React from "react";
import {ButtonProps} from "@/types";
import { trackCTAClick } from "@/lib/analytics";

const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ children, variant = "primary", className, href, ...rest }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-sans font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary shadow-sm";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-secondary",
      secondary: "bg-secondary text-secondary-foreground hover:bg-primary",
      tertiary: "bg-muted text-foreground hover:bg-muted-foreground hover:text-background",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      accent: "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
      "gradient-monotone":
        "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:brightness-110 dark:from-primary/70 dark:to-secondary/70 dark:hover:brightness-90 dark:text-white",
      "gradient-outline":
        "bg-transparent border-2 border-primary text-primary hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-secondary",
      "gradient-duotone":
        "bg-gradient-to-r from-accent to-secondary text-accent-foreground hover:brightness-110",
      "glass-floating":
        "bg-card/30 backdrop-blur-xl border border-border shadow-2xl hover:shadow-accent/25 text-foreground",
    };

    if (href) {
      return (
        <a
          href={href}
          className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
          ref={ref as React.Ref<HTMLAnchorElement>}
          onClick={() => {
            // Track CTA clicks for important buttons
            if (variant === 'gradient-monotone' || variant === 'primary') {
              const currentPage = typeof window !== 'undefined' ? window.location.pathname : 'unknown';
              const buttonText = typeof children === 'string' ? children : 'cta';
              trackCTAClick(buttonText.toLowerCase().replace(/\s+/g, '_'), currentPage);
            }
          }}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;