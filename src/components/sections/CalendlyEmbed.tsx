import React, { useEffect, useRef } from 'react';

interface CalendlyEmbedProps {
  url: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  variant?: 'full' | 'widget';
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({
  url,
  width = '100%',
  height,
  title = 'Book a Discovery Call',
  variant = 'full',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Set a balanced initial height
      iframe.style.height = variant === 'widget' ? '750px' : '950px';
      
      // Try to get the actual content height
      try {
        iframe.onload = () => {
          // Add a small delay to ensure content is loaded
          setTimeout(() => {
            if (iframe.contentWindow && iframe.contentWindow.document) {
              const contentHeight = iframe.contentWindow.document.body.scrollHeight;
              if (contentHeight > 0) {
                // Add moderate padding to prevent scroll but minimize empty space
                iframe.style.height = `${contentHeight + 50}px`;
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
  }, [variant]);

  // Widget variant: compact but responsive
  const widgetStyle = {
    minWidth: 250,
    maxWidth: 350,
    width: '100%',
    minHeight: 700,
    height: 'auto',
    borderRadius: '0.75rem',
    overflow: 'visible',
    border: 'none',
  };
  const fullStyle = {
    minWidth: 320,
    maxWidth: '90%',
    width: '90%',
    minHeight: 900,
    height: 'auto',
    borderRadius: '1rem',
    overflow: 'visible',
    border: 'none',
  };
  const style = variant === 'widget' ? widgetStyle : fullStyle;
  
  return (
    <div className="my-8 flex justify-center">
      <iframe
        ref={iframeRef}
        src={url}
        width={width}
        height={height || '100%'}
        frameBorder="0"
        title={title}
        className="calendly-iframe"
        style={{
          ...style,
          overflow: 'visible',
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