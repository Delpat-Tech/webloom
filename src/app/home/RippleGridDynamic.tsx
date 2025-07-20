import dynamic from "next/dynamic";

const RippleGridClientWrapper = dynamic(() => import("./RippleGridClientWrapper"), { ssr: false });

export default RippleGridClientWrapper;
