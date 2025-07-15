import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "text" | "custom";
  variant?: "uppercase" | "tracking" | "gradient";
}

const levelTagMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const baseStyles: Record<number, string> = {
  1: "font-headline font-bold text-4xl md:text-5xl lg:text-6xl leading-tight",
  2: "font-headline font-semibold text-3xl md:text-4xl lg:text-5xl leading-snug",
  3: "font-headline font-semibold text-2xl md:text-3xl lg:text-4xl leading-snug",
  4: "font-headline font-medium text-xl md:text-2xl leading-snug",
  5: "font-headline font-medium text-lg md:text-xl leading-snug",
  6: "font-headline font-medium text-base md:text-lg leading-snug",
};

const colorClassMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  text: "text-foreground",
  custom: "",
};

const variantClassMap: Record<string, string> = {
  uppercase: "uppercase",
  tracking: "tracking-wide",
  gradient:
    "bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text",
};

export default function Heading({
  level = 1,
  children,
  className = "",
  color = "primary",
  variant,
}: HeadingProps) {
  const Tag = levelTagMap[level] || "h1";
  const colorClass = colorClassMap[color] || "";
  const variantClass = variant ? variantClassMap[variant] : "";
  const classes = [
    baseStyles[level],
    colorClass,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return React.createElement(Tag, { className: classes }, children);
} 