import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }: InputProps, ref) => {
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
