"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Map } from 'react-feather';

// Types
interface ClientLocation {
  id: number;
  name: string;
  country?: string;
  lat: number;
  lng: number;
  x?: number; // SVG coordinates
  y?: number; // SVG coordinates
}

interface GeoMapProps {
  clientLocations?: ClientLocation[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

// Convert lat/lng to SVG coordinates (approximate conversion for a 900x450 viewBox)
const latLngToSVG = (lat: number, lng: number) => {
  // Simple equirectangular projection
  const x = ((lng + 180) / 360) * 900;
  const y = ((90 - lat) / 180) * 450;
  return { x, y };
};

const defaultLocations: ClientLocation[] = [
  { id: 1, name: "London", country: "UK", lat: 51.509865, lng: -0.118092 },
  { id: 2, name: "Pune", country: "India", lat: 18.5204, lng: 73.8567 },
  { id: 3, name: "Toronto", country: "Canada", lat: 43.65107, lng: -79.347015 },
  { id: 4, name: "Dubai", country: "UAE", lat: 25.276987, lng: 55.296249 },
  { id: 5, name: "Singapore", country: "Singapore", lat: 1.352083, lng: 103.819836 },
  { id: 6, name: "Moscow", country: "Russia", lat: 55.755825, lng: 37.617298 },
  { id: 7, name: "Seoul", country: "South Korea", lat: 37.566535, lng: 126.977969 },
  { id: 8, name: "Paris", country: "France", lat: 48.856613, lng: 2.352222 },
  { id: 9, name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { id: 10, name: "Raipur", country: "India", lat: 21.2514, lng: 81.6296 },
  { id: 11, name: "Hyderabad", country: "India", lat: 17.385044, lng: 78.486671 },
  { id: 12, name: "Bangalore", country: "India", lat: 12.971599, lng: 77.594566 },
  { id: 13, name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
  { id: 14, name: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234 },
  { id: 15, name: "Nairobi", country: "Kenya", lat: -1.292066, lng: 36.821945 },
  { id: 16, name: "Lagos", country: "Nigeria", lat: 6.524379, lng: 3.379206 },
  { id: 17, name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
].map(location => {
  const svgCoords = latLngToSVG(location.lat, location.lng);
  return { ...location, x: svgCoords.x, y: svgCoords.y };
});

const GeoMap: React.FC<GeoMapProps> = ({
  clientLocations = defaultLocations,
  title = "Trusted from Pune to Global",
  subtitle = "A visual showcase of our global client base and successful projects",
  buttonText = "Explore Our Projects",
}) => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [animatedRegions, setAnimatedRegions] = useState<{[key: number]: boolean}>({});

  // Add pulsing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLocation = clientLocations[Math.floor(Math.random() * clientLocations.length)];
      setAnimatedRegions(prev => ({
        ...prev,
        [randomLocation.id]: true
      }));
      
      setTimeout(() => {
        setAnimatedRegions(prev => {
          const newState = { ...prev };
          delete newState[randomLocation.id];
          return newState;
        });
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, [clientLocations]);

  const hoveredLocation = clientLocations.find(loc => loc.id === hoveredPin);

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-4 h-4" />
            Global Reach
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative h-96 bg-gradient-to-br from-card/50 to-muted/50 rounded-3xl border border-border overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full">
            {/* World map background */}
            <img 
              src="/world.svg" 
              alt="World Map" 
              className="absolute inset-0 w-full h-full object-contain opacity-60 dark:opacity-20"
              style={{ 
                filter: 'saturate(0.8) brightness(0.3) contrast(1.5) invert(0.8)'
              }}
            />
            
            {/* SVG overlay for markers */}
            <svg 
              viewBox="0 0 900 450" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Region markers */}
              {clientLocations.map((location) => (
                <g key={location.id}>
                  {/* Pulsing ring animation */}
                  {animatedRegions[location.id] && (
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r="8"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="r"
                        values="8;20;8"
                        dur="2s"
                        repeatCount="1"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.7;0;0.7"
                        dur="2s"
                        repeatCount="1"
                      />
                    </circle>
                  )}
                  
                  {/* Main marker */}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={hoveredPin === location.id ? "8" : "6"}
                    fill="var(--primary)"
                    stroke="var(--card)"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPin(location.id)}
                    onMouseLeave={() => setHoveredPin(null)}
                    style={{
                      filter: hoveredPin === location.id ? 'drop-shadow(0 0 12px var(--primary))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                      transform: hoveredPin === location.id ? 'scale(1.2)' : 'scale(1)',
                      transformOrigin: `${location.x}px ${location.y}px`
                    }}
                  />
                  
                  {/* Hover tooltip */}
                  {hoveredPin === location.id && (
                    <g>
                      <rect
                        x={location.x! - 60}
                        y={location.y! - 60}
                        width="120"
                        height="45"
                        rx="8"
                        fill="var(--popover)"
                        fillOpacity="0.95"
                        stroke="var(--primary)"
                        strokeWidth="1"
                      />
                      <text
                        x={location.x}
                        y={location.y! - 42}
                        textAnchor="middle"
                        fill="var(--popover-foreground)"
                        fontSize="13"
                        fontWeight="600"
                      >
                        {location.name}
                      </text>
                      {location.country && (
                        <text
                          x={location.x}
                          y={location.y! - 28}
                          textAnchor="middle"
                          fill="var(--muted-foreground)"
                          fontSize="11"
                        >
                          {location.country}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-border">
            <div className="text-2xl font-bold text-primary mb-1">
              {clientLocations.length}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              locations
            </div>
          </div>

          {/* Connection lines (optional) */}
          {hoveredLocation && (
            <svg 
              viewBox="0 0 900 450" 
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Animated connection line from center */}
              <line
                x1="450"
                y1="225"
                x2={hoveredLocation.x}
                y2={hoveredLocation.y}
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="5,5"
                opacity="0.5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
            <Map className="w-4 h-4" />
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Location list (visible on mobile) */}
        <motion.div
          className="mt-8 md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-2">
            {clientLocations.map((location) => (
              <div key={location.id} className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg hover:bg-muted">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium">{location.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GeoMap;