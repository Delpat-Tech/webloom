import React from "react";
import {LinkProps} from "@/types";

const Link: React.FC<LinkProps> = ({ href, children, className = "", ...props }) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

export default Link; 