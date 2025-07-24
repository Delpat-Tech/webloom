import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
