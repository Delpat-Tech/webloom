import { forwardRef } from "react";
import { TextareaProps } from "@/types";

// Create a Textarea component using forwardRef for better ref handling
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className = "", placeholder, rows = 5, required = false, ...props },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground resize-none";

    return (
      <textarea
        ref={ref}
        className={`${baseClasses} ${className}`.trim()}
        placeholder={placeholder}
        rows={rows}
        required={required}
        {...props}
      />
    );
  }
);

// Set display name for debugging
Textarea.displayName = "Textarea";

export default Textarea;
