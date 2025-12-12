import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import React, { JSX } from "react";

import { MessageSquare } from "react-feather";
import { Testimonial } from "@/types";

export interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  title?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Delpat delivered our MVP in 5 weeks when our internal team estimated 4 months. Game changer. We shipped, they didn't ghost.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "SC"
  },
  {
    quote: "We went from idea to 10K users in just 8 weeks. The MVP they built became the foundation for our ₹2M funding round.",
    author: "Mike Rodriguez",
    role: "Founder, HealthTrack",
    avatar: "MR"
  },
  {
    quote: "Our internal dashboard went from chaos to clarity in 3 weeks. ROI was immediate - we saved 20+ hours per week.",
    author: "Priya Sharma",
    role: "Operations Lead, GrowthCo",
    avatar: "PS"
  },
  {
    quote: "Best decision we made early on. Launched in weeks, validated fast. They think like founders, not just developers.",
    author: "Ravi Mehta",
    role: "Founder, StartupForge",
    avatar: "RM"
  },
  {
    quote: "We launched in 10 days and saved weeks of manual work. Delpat nailed it - fixed scope, fixed timeline, zero surprises.",
    author: "Sarah Lane",
    role: "Head of Support Ops, SupportFlow",
    avatar: "SL"
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: Testimonial;
  index: number;
  trackItemOffset: number;
  itemWidth: number;
  x: any;
  round: boolean;
  effectiveTransition: any;
}

function CarouselItemComponent({ item, index, trackItemOffset, itemWidth, x, round, effectiveTransition }: CarouselItemProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${round
        ? "items-center justify-center text-center bg-card border-0"
        : "items-start justify-between bg-card border border-border rounded-[12px] shadow-lg"
        } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={effectiveTransition}
    >
      <div className={`${round ? "p-0 m-0" : "mb-4 p-3 sm:p-4 md:p-5"}`}>
        <span className="flex h-[24px] w-[24px] sm:h-[28px] sm:w-[28px] items-center justify-center rounded-full bg-primary shadow-md">
          <MessageSquare className="h-[12px] w-[12px] sm:h-[16px] sm:w-[16px] text-primary-foreground" />
        </span>
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        <div className="mb-1 font-black text-sm sm:text-base md:text-lg text-foreground">
          &quot;{item.quote}&quot;
        </div>
        <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-4">{item.author}</p>
        <p className="text-xs text-muted-foreground">{item.role}</p>
      </div>
    </motion.div>
  );
}

export default function TestimonialsCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  baseWidth = 800,
  autoplay = true,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
  round = false
  // title: _title = "What Founders Are Saying"
}: TestimonialCarouselProps): JSX.Element {
  // Responsive width calculation
  const getResponsiveWidth = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const containerPadding = 32; // Account for px-4 on parent
      const availableWidth = width - containerPadding;

      if (width < 640) return Math.min(320, availableWidth); // Mobile
      if (width < 768) return Math.min(480, availableWidth); // Small tablet
      if (width < 1024) return Math.min(600, availableWidth); // Tablet
      if (width < 1280) return Math.min(700, availableWidth); // Small desktop
      return Math.min(baseWidth, availableWidth); // Large desktop
    }
    return baseWidth;
  };

  const [responsiveWidth, setResponsiveWidth] = useState(baseWidth);

  // Responsive padding calculation
  const getResponsivePadding = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 16; // Mobile
      if (width < 768) return 24; // Small tablet
      if (width < 1024) return 32; // Tablet
      return 32; // Desktop
    }
    return 32;
  };

  const [containerPadding, setContainerPadding] = useState(32);
  const itemWidth = responsiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...testimonials, testimonials[0]] : testimonials;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle responsive width and padding updates
  useEffect(() => {
    const updateDimensions = () => {
      setResponsiveWidth(getResponsiveWidth());
      setContainerPadding(getResponsivePadding());
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [baseWidth, getResponsiveWidth]);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === testimonials.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    testimonials.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === testimonials.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(testimonials.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-muted/30 via-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span className="text-foreground">What</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Founders Are Saying
            </span>
          </h2>
        </motion.div>

        <div className="flex justify-center w-full px-4">
          <div
            ref={containerRef}
            className={`relative overflow-hidden p-4 sm:p-6 md:p-8 ${round
              ? "rounded-full border border-white"
              : "rounded-[24px] border border-border bg-card/80 backdrop-blur-sm shadow-xl"
              }`}
            style={{
              width: `${responsiveWidth}px`,
              maxWidth: '100%',
              ...(round && { height: `${responsiveWidth}px` }),
            }}
          >
            <motion.div
              className="flex"
              drag="x"
              {...dragProps}
              style={{
                width: itemWidth,
                gap: `${GAP}px`,
                perspective: 1000,
                perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                x,
              }}
              onDragEnd={handleDragEnd}
              animate={{ x: -(currentIndex * trackItemOffset) }}
              transition={effectiveTransition}
              onAnimationComplete={handleAnimationComplete}
            >
              {carouselItems.map((item, index) => (
                <CarouselItemComponent
                  key={index}
                  item={item}
                  index={index}
                  trackItemOffset={trackItemOffset}
                  itemWidth={itemWidth}
                  x={x}
                  round={round}
                  effectiveTransition={effectiveTransition}
                />
              ))}
            </motion.div>

            {/* Dots Indicator */}
            <div
              className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : "mt-6"
                }`}
            >
              <div className="flex w-[150px] justify-between px-8">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % testimonials.length === index
                      ? round
                        ? "bg-white"
                        : "bg-primary"
                      : round
                        ? "bg-muted-foreground/60"
                        : "bg-muted-foreground/40"
                      }`}
                    animate={{
                      scale: currentIndex % testimonials.length === index ? 1.2 : 1,
                    }}
                    onClick={() => setCurrentIndex(index)}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
