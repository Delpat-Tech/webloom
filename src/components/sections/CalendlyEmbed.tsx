import React from 'react';

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
  // Widget variant: slightly bigger, still compact
  const widgetStyle = {
    minWidth: 250,
    maxWidth: 350,
    width: '100%',
    height: 400,
    borderRadius: '0.75rem',
  };
  const fullStyle = {
    minWidth: 320,
    maxWidth: 600,
    width: '100%',
    height: 700,
    borderRadius: '1rem',
  };
  const style = variant === 'widget' ? widgetStyle : fullStyle;
  return (
    <div className="my-8 flex justify-center">
      <iframe
        src={url}
        width={width}
        height={height || style.height}
        frameBorder="0"
        title={title}
        style={style}
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
};

export default CalendlyEmbed; 