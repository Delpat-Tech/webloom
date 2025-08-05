import React from "react";
import {SimpleCardProps} from "@/types";

const SimpleCard: React.FC<SimpleCardProps> = ({ children, className = "", onClick }) => {
  return (
    <div className={`bg-card text-foreground rounded-2xl shadow-lg border border-border p-8 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default SimpleCard; 