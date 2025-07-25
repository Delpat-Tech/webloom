import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Logo from './Logo';

interface LoaderProps {
  show: boolean;
  onFadeOut: () => void;
}

const PARTICLE_COUNT = 18;

const Loader: React.FC<LoaderProps> = ({ show, onFadeOut }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  // NEW: State for particle positions
  const [particlePositions, setParticlePositions] = useState<{ left: string; top: string }[] | null>(null);

  // Generate random positions on client only
  useEffect(() => {
    const positions = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticlePositions(positions);
  }, []);

  // Animate in on mount
  useEffect(() => {
    if (show && loaderRef.current) {
      gsap.set(loaderRef.current, { autoAlpha: 1 });
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.2, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 1, delay: 0.4, ease: 'power1.out' }
      );
      gsap.fromTo(
        ringRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [show]);

  // Animate out when show becomes false
  useEffect(() => {
    if (!show && loaderRef.current) {
      const tl = gsap.timeline({
        onComplete: onFadeOut,
      });
      tl.to(loaderRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.7,
        ease: 'power2.in',
      });
    }
  }, [show, onFadeOut]);

  // Continuous animations (glow pulse, ring rotate, particles float)
  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.4,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 3.5,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      });
    }
    if (particlesRef.current.length) {
      particlesRef.current.forEach((el, i) => {
        gsap.to(el, {
          x: `random(-30, 30)`,
          y: `random(-30, 30)`,
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        });
      });
    }
  }, []);

  // Render nothing until positions are generated (prevents hydration mismatch)
  if (!particlePositions) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="status"
      aria-live="polite"
      tabIndex={-1}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={el => (particlesRef.current[i] = el!)}
            className="absolute w-2 h-2 rounded-full bg-white/30 blur-sm"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      {/* Centered logo and effects */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow */}
        <div
          ref={glowRef}
          className="absolute w-48 h-48 rounded-full bg-blue-500 blur-3xl opacity-70"
          aria-hidden="true"
        />
        {/* Orbiting ring */}
        <svg
          ref={ringRef}
          width={220}
          height={220}
          className="absolute"
          aria-hidden="true"
        >
          <circle
            cx="110"
            cy="110"
            r="90"
            stroke="#60a5fa"
            strokeWidth="4"
            fill="none"
            strokeDasharray="12 12"
            opacity="0.7"
          />
        </svg>
        {/* Logo */}
        <div ref={logoRef} className="relative z-10">
          <Logo width={96} height={96} />
        </div>
      </div>
    </div>
  );
};

export default Loader; 