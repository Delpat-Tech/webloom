import React from "react";

interface SimpleCardProps {
  children: React.ReactNode;
  className?: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-card text-foreground rounded-2xl shadow-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  );
};

export default SimpleCard; 