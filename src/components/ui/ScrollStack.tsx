
import React, { useState, useRef, useCallback } from "react";
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
  const variants: Variants = {
    top: {
      translateX: 0,
      rotateY: 0,
      opacity: 1,
      zIndex: 10,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    left1: {
      translateX: isHovered ? 0 : -150,
      rotateY: isHovered ? 0 : 30,
      opacity: isHovered ? 1 : 0.8,
      zIndex: isHovered ? 15 : 5,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    left2: {
      translateX: isHovered ? 0 : -100,
      rotateY: isHovered ? 0 : 30,
      opacity: isHovered ? 1 : 0.8,
      zIndex: isHovered ? 15 : 4,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    right1: {
      translateX: isHovered ? 0 : 100,
      rotateY: isHovered ? 0 : -30,
      opacity: isHovered ? 1 : 0.8,
      zIndex: isHovered ? 15 : 5,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    right2: {
      translateX: isHovered ? 0 : 150,
      rotateY: isHovered ? 0 : -30,
      opacity: isHovered ? 1 : 0.8,
      zIndex: isHovered ? 15 : 4,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hidden: {
      translateX: 0,
      rotateY: 0,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const getVariant = () => {
    if (isTop) return "top";
    if (index === 1 && isInView) return "left1";
    if (index === 2 && isInView) return "left2";
    if (index === 3 && isInView) return "right1";
    if (index === 4 && isInView) return "right2";
    return "hidden";
  };

  return (
    <motion.div
      className={`scroll-stack-item absolute w-[28rem] h-[35rem] rounded-xl box-border ${itemClassName}`.trim()}
      variants={variants}
      initial="hidden"
      animate={getVariant()}
      onHoverStart={() => onHoverStart(index)}
      onHoverEnd={onHoverEnd}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleClick = useCallback((index: number) => {
    setHoveredIndex(null);
    onStackComplete?.();
  }, [onStackComplete]);

  const childrenArray = React.Children.toArray(children) as React.ReactElement<ScrollStackItemProps>[];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[35rem] flex justify-center items-center overflow-visible ${className}`.trim()}
      style={{
        overscrollBehavior: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="relative w-[28rem] h-[35rem]">
        <AnimatePresence>
          {childrenArray.map((child, index) => (
            <ScrollStackItem
              key={index}
              index={index}
              isTop={index === 0} // Card 1 is always on top
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
