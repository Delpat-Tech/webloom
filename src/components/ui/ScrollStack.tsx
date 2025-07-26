import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import { ScrollStackProps, ScrollStackItemProps } from "@/types";

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  index,
  isTop,
  isInView,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Responsive configurations
  const configs = {
    mobile: {
      cardWidth: "w-[18rem]",
      cardHeight: "h-[22rem]",
      positions: {
        left2: { translateX: -15, translateY: 160, rotateZ: -8 },
        left1: { translateX: -8, translateY: 80, rotateZ: -4 },
        right1: { translateX: 8, translateY: -80, rotateZ: 4 },
        right2: { translateX: 15, translateY: -160, rotateZ: 8 },
      },
    },
    tablet: {
      cardWidth: "w-[22rem]",
      cardHeight: "h-[27rem]",
      positions: {
        left2: { translateX: -280, translateY: -18, rotateZ: -18 },
        left1: { translateX: -160, translateY: -9, rotateZ: -9 },
        right1: { translateX: 160, translateY: -9, rotateZ: 9 },
        right2: { translateX: 280, translateY: -18, rotateZ: 18 },
      },
    },
    desktop: {
      cardWidth: "w-[25rem]",
      cardHeight: "h-[30rem]",
      positions: {
        left2: { translateX: -330, translateY: -20, rotateZ: -20 },
        left1: { translateX: -200, translateY: -10, rotateZ: -10 },
        right1: { translateX: 200, translateY: -10, rotateZ: 10 },
        right2: { translateX: 330, translateY: -20, rotateZ: 20 },
      },
    },
  };

  const currentConfig = configs[screenSize];

  const variants: Variants = {
    top: (i: number) => ({
      translateX: 0,
      translateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 10,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    left2: (i: number) => ({
      ...currentConfig.positions.left2,
      opacity: 1,
      zIndex: 5,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    left1: (i: number) => ({
      ...currentConfig.positions.left1,
      opacity: 1,
      zIndex: 6,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    right1: (i: number) => ({
      ...currentConfig.positions.right1,
      opacity: 1,
      zIndex: 6,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    right2: (i: number) => ({
      ...currentConfig.positions.right2,
      opacity: 1,
      zIndex: 5,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    hidden: (i: number) => ({
      translateX: 0,
      translateY: 0,
      rotateZ: 0,
      opacity: 0,
      zIndex: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  const getVariant = () => {
    if (!isInView) return "hidden";
    if (isTop) return "top";

    // Different stacking order for mobile (vertical) vs desktop (horizontal)
    if (screenSize === "mobile") {
      if (index === 1) return "left1"; // Slightly above
      if (index === 2) return "left2"; // More above
      if (index === 3) return "right1"; // Slightly below
      if (index === 4) return "right2"; // More below
    } else {
      if (index === 1) return "left1";
      if (index === 2) return "left2";
      if (index === 3) return "right1";
      if (index === 4) return "right2";
    }
    return "hidden";
  };

  // Responsive hover scale
  const getHoverScale = () => {
    switch (screenSize) {
      case "mobile":
        return 1.03;
      case "tablet":
        return 1.04;
      default:
        return 1.05;
    }
  };

  return (
    <motion.div
      custom={index}
      className={`scroll-stack-item absolute ${currentConfig.cardWidth} ${currentConfig.cardHeight} rounded-xl box-border ${itemClassName}`}
      initial="hidden"
      animate={getVariant()}
      whileHover={{
        scale: getHoverScale(),
        zIndex: 20,
        rotateZ: 0,
        transition: {
          duration: screenSize === "mobile" ? 0.8 : 1.1,
          ease: "easeInOut",
        },
        boxShadow:
          screenSize === "mobile"
            ? "0 10px 25px rgba(0,0,0,0.2)"
            : "0 15px 40px rgba(0,0,0,0.25)",
      }}
      whileTap={{
        scale: screenSize === "mobile" ? 0.98 : 1.02,
        transition: { duration: 0.2 },
      }}
      variants={variants}
      onHoverStart={() => onHoverStart(index)}
      onHoverEnd={() => onHoverEnd()}
      onClick={() => onClick(index)}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        cursor: isTop ? "default" : "pointer",
      }}
    >
      {children}
    </motion.div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  onStackComplete,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      setHoveredIndex(null);
      onStackComplete?.();
    },
    [onStackComplete]
  );

  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<ScrollStackItemProps>[];

  // Responsive container dimensions
  const getContainerConfig = () => {
    switch (screenSize) {
      case "mobile":
        return {
          height: "h-[50rem]", // Increased height for vertical stacking
          width: "w-[18rem]",
          padding: "py-20 px-4",
        };
      case "tablet":
        return {
          height: "h-[42rem]",
          width: "w-[22rem]",
          padding: "py-18 px-6",
        };
      default:
        return {
          height: "h-[48rem]",
          width: "w-[25rem]",
          padding: "py-20",
        };
    }
  };

  const containerConfig = getContainerConfig();

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${containerConfig.height} flex justify-center items-center overflow-visible ${containerConfig.padding} ${className}`.trim()}
      style={{
        overscrollBehavior: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Unified Responsive Cards */}
      <div
        className={`relative mb-24 ${containerConfig.width} ${
          screenSize === "mobile"
            ? "h-[22rem]"
            : screenSize === "tablet"
            ? "h-[27rem]"
            : "h-[30rem]"
        }`}
      >
        <AnimatePresence>
          {childrenArray.map((child, index) => (
            <ScrollStackItem
              key={index}
              index={index}
              isTop={index === 0}
              isInView={isInView}
              isHovered={hoveredIndex === index}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onClick={handleClick}
              itemClassName={child.props.itemClassName}
              children={child.props.children}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollStack;
