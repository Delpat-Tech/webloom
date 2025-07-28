import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";    
import { InfiniteScrollItem, InfiniteScrollProps } from "@/types";

gsap.registerPlugin(Observer);


const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinHeight = 150,
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
  columns = 3,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRefs = Array.from({ length: columns }, () => useRef<HTMLDivElement>(null));

  // Get the transform style based on tilt direction
  const getTiltTransform = (): string => {
    return "rotateX(20deg) rotateZ(-20deg) skewX(20deg)";
  };

  useEffect(() => {
    if (items.length === 0) return;

    // Split items into columns
    const columnItems: InfiniteScrollItem[][] = Array.from({ length: columns }, (_, colIdx) =>
      items.filter((_, idx) => idx % columns === colIdx)
    );

    const observers: Observer[] = [];
    let rafIds: number[] = [];

    columnItems.forEach((colItems, colIdx) => {
      const container = containerRefs[colIdx].current;
      if (!container) return;
      const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
      if (!divItems.length) return;

      const firstItem = divItems[0];
      const itemStyle = getComputedStyle(firstItem);
      const itemHeight = firstItem.offsetHeight;
      const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
      const totalItemHeight = itemHeight + itemMarginTop;
      const totalHeight = itemHeight * colItems.length + itemMarginTop * (colItems.length - 1);
      const wrapFn = gsap.utils.wrap(0, totalHeight);

      divItems.forEach((child, i) => {
        const y = i * totalItemHeight;
        gsap.set(child, { y });
      });

      const observer = Observer.create({
        target: container,
        type: "wheel,touch,pointer",
        preventDefault: true,
        onPress: ({ target }) => {
          (target as HTMLElement).style.cursor = "grabbing";
        },
        onRelease: ({ target }) => {
          (target as HTMLElement).style.cursor = "grab";
        },
        onChange: ({ deltaY, isDragging, event }) => {
          const d = event.type === "wheel" ? -deltaY : deltaY;
          if (d < 0) return;
          const distance = isDragging ? d * 5 : d * 10;
          divItems.forEach((child) => {
            gsap.to(child, {
              duration: 0.5,
              ease: "expo.out",
              y: `+=${distance}`,
              modifiers: {
                y: gsap.utils.unitize(wrapFn),
              },
              onUpdate: function () {
                const yVal = parseFloat(gsap.getProperty(child, 'y') as string);
                // Only show cards in the visible scroll area (0 <= y < totalHeight - itemHeight)
                child.style.opacity = (yVal >= 0 && yVal < totalHeight - itemHeight) ? '1' : '0';
              },
            });
          });
        },
      });
      observers.push(observer);

      if (autoplay) {
        const directionFactor = autoplayDirection === "down" ? 1 : -1;
        const speedPerFrame = autoplaySpeed * directionFactor * (1 + colIdx * 0.1); // slight offset for each column

        const tick = () => {
          divItems.forEach((child) => {
            if (directionFactor < 0) return;
            gsap.set(child, {
              y: `+=${speedPerFrame}`,
              modifiers: {
                y: gsap.utils.unitize(wrapFn),
              },
              onUpdate: function () {
                const yVal = parseFloat(gsap.getProperty(child, 'y') as string);
                child.style.opacity = (yVal >= 0 && yVal < totalHeight - itemHeight) ? '1' : '0';
              },
            });
          });
          rafIds[colIdx] = requestAnimationFrame(tick);
        };
        rafIds[colIdx] = requestAnimationFrame(tick);
      }
    });

    return () => {
      observers.forEach(o => o.kill());
      rafIds.forEach(id => id && cancelAnimationFrame(id));
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    columns,
  ]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .infinite-scroll-grid {
            width: ${width};
            display: grid;
            grid-template-columns: repeat(${columns}, 1fr);
            gap: 1.5rem;
            position: relative;
          }

          .infinite-scroll-item {
            height: ${itemMinHeight}px;
            margin-top: ${negativeMargin};
            background: var(--card);
            color: var(--card-foreground);
            box-shadow: var(--shadow-lg, 0 10px 20px rgba(0,0,0,0.1));
            border-radius: var(--radius, 1rem);
            border: 1px solid var(--border);
            padding: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: grab;
            overflow: hidden;
            box-sizing: border-box;
          }

          .infinite-scroll-item:hover {
            /* No hover effect */
          }

          .content-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
          }

          .infinite-scroll-item h3,
          .infinite-scroll-item div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .cta-button {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--primary);
            color: var(--primary-foreground);
            border-radius: var(--radius, 0.5rem);
            text-decoration: none;
            font-weight: 500;
            border: none;
            transition: background 0.3s ease;
          }

          .cta-button:hover {
            /* No hover effect */
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-grid"
          style={{
            transform: getTiltTransform(),
          }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              ref={containerRefs[colIdx]}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {items
                .filter((_, idx) => idx % columns === colIdx)
                .map((item, i) => (
                  <div className="infinite-scroll-item" key={i}>
                    <div className="content-wrapper">
                      {item.content}
                      <a className="cta-button" href={item.link || "#"}>
                        {item.ctaText || "See Case Study →"}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll; 