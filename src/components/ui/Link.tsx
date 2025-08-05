import React from "react";
import NextLink from "next/link";
import {LinkProps} from "@/types";

const Link: React.FC<LinkProps> = ({ href, children, className = "", ...props }) => {
  return (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  );
};

export default Link; 