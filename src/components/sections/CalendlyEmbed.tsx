import React, { useEffect, useRef, useState } from 'react';
import { CalendlyEmbedProps } from '@/types';

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({
  url,
  width = '100%',
  height,
  title = 'Book a Discovery Call',
  variant = 'full',
  inModal = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(variant === 'widget' ? 750 : 950);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Set initial height based on variant and context
      const initialHeight = inModal 
        ? Math.min(window.innerHeight * 0.75, 700) // Smaller height for modal to prevent scroll
        : variant === 'widget' ? 750 : 950;
      
      setIframeHeight(initialHeight);
      
      // Try to get the actual content height
      try {
        iframe.onload = () => {
          // Add a small delay to ensure content is loaded
          setTimeout(() => {
            if (iframe.contentWindow && iframe.contentWindow.document) {
              const contentHeight = iframe.contentWindow.document.body.scrollHeight;
              if (contentHeight > 0) {
                // Add moderate padding to prevent scroll but minimize empty space
                const newHeight = Math.min(contentHeight + 30, inModal ? window.innerHeight * 0.75 : 1200);
                setIframeHeight(newHeight);
              }
            }
          }, 1000);
        };
      } catch (error) {
        // Cross-origin restrictions might prevent access
        console.log('Calendly iframe loaded');
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [variant, inModal]);

  // Widget variant: compact but responsive
  const widgetStyle = {
    minWidth: 250,
    maxWidth: 350,
    width: '100%',
    minHeight: 700,
    height: `${iframeHeight}px`,
    borderRadius: '0.75rem',
    border: 'none',
    overflow: 'hidden',
  };
  
  const fullStyle = {
    minWidth: 320,
    maxWidth: inModal ? '100%' : '90%',
    width: inModal ? '100%' : '90%',
    minHeight: inModal ? 500 : 900,
    height: `${iframeHeight}px`,
    borderRadius: '1rem',
    border: 'none',
    overflow: 'hidden',
  };
  
  const style = variant === 'widget' ? widgetStyle : fullStyle;
  
  return (
    <div className={`${inModal ? 'h-full flex justify-center modal-calendly-container' : 'my-8 flex justify-center'}`}>
      <iframe
        ref={iframeRef}
        src={url}
        width={width}
        height={height || `${iframeHeight}px`}
        frameBorder="0"
        title={title}
        className={`calendly-iframe ${inModal ? 'modal-calendly' : ''}`}
        style={{
          ...style,
          overflow: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        scrolling="no"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
};

export default CalendlyEmbed; 