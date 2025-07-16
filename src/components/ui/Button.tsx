interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "gradient-monotone"
    | "gradient-outline"
    | "gradient-duotone"
    | "destructive"
    | "accent";
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = "primary", onClick, className = "" }: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-sans font-medium transition-all focus:outline-none shadow-sm";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-secondary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-primary",
    tertiary: "bg-muted text-foreground hover:bg-muted-foreground hover:text-background",
    destructive: "bg-destructive text-destructive-foreground hover:bg-red-700",
    accent: "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
    "gradient-monotone":
      "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:brightness-110",
    "gradient-outline":
      "bg-transparent border-2 border-primary text-primary hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-secondary",
    "gradient-duotone":
      "bg-gradient-to-r from-accent to-secondary text-accent-foreground hover:brightness-110",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}> 
      {children}
    </button>
  );
}
