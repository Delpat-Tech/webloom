"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useMobileOptimization, getOptimizedAnimationConfig } from "@/hooks/useMobileOptimization";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isMobile, shouldReduceAnimations } = useMobileOptimization();

  useEffect(() => {
    if (shouldReduceMotion || shouldReduceAnimations) return;
    
    const scrollConfig = getOptimizedAnimationConfig(isMobile).scrollConfig;
    
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Reduced duration for mobile
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile, // Disable smooth wheel on mobile for better performance
      touchMultiplier: scrollConfig.touchMultiplier,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: scrollConfig.wheelMultiplier,
      lerp: scrollConfig.lerp,
      syncTouch: true,
      syncTouchLerp: isMobile ? 0.1 : 0.075, // Adjusted for mobile
      // Mobile-specific optimizations
      smoothTouch: isMobile ? false : true, // Disable smooth touch on mobile
      touchInertiaMultiplier: isMobile ? 0.8 : 1, // Reduce touch inertia on mobile
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [shouldReduceMotion, shouldReduceAnimations, isMobile]);

  return <>{children}</>;
} 