import * as React from "react";
import { usePathname } from "next/navigation";
import { ButtonProps } from "../../types";
import { trackCTAClick } from "../../lib/analytics";

// Utility to pick only anchor-appropriate props
function pickAnchorProps(props: Record<string, any>) {
  const anchorPropKeys = [
    'href', 'target', 'rel', 'download', 'hrefLang', 'media', 'ping', 'referrerPolicy', 'type', 'onClick', 'className', 'id', 'style', 'children', 'tabIndex', 'title', 'role', 'aria-label', 'aria-current'
  ];
  const result: Record<string, any> = {};
  for (const key of anchorPropKeys) {
    if (key in props) result[key] = props[key];
  }
  return result;
}

const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const pathname = usePathname();
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

    if ("href" in props && props.href) {
      const {
        href,
        onClick,
        variant = "primary",
        className,
        children,
        ...anchorRest
      } = props as Extract<ButtonProps, { href: string }>;
      const anchorProps = pickAnchorProps({
        ...anchorRest,
        href,
        className: `${baseStyles} ${variants[variant]} ${className ?? ""}`,
      });
      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) onClick(e);
            if (variant === "gradient-monotone" || variant === "primary") {
              const currentPage = pathname || "unknown";
              const buttonText =
                typeof children === "string" ? children : "cta";
              trackCTAClick(
                buttonText.toLowerCase().replace(/\s+/g, "_"),
                currentPage
              );
            }
          }}
        >
          {children}
        </a>
      );
    }

    const {
      onClick,
      variant = "primary",
      className,
      children,
      ...buttonRest
    } = props as Extract<ButtonProps, { href?: undefined }>;
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        {...buttonRest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;