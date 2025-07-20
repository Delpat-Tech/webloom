"use client";
import RippleGrid from "./RippleGrid";

// Pass through all props
export default function RippleGridClientWrapper(props: React.ComponentProps<typeof RippleGrid>) {
  return <RippleGrid {...props} />;
}
