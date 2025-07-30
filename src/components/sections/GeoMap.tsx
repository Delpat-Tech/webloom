"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Map } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { ClientLocation, GeoMapProps } from "@/types";
import Button from "@/components/ui/Button";

// World map topology data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const defaultLocations: ClientLocation[] = [
  { id: 1, name: "London", lat: 51.509865, lng: -0.118092, projects: 5 },
  { id: 2, name: "Pune", lat: 18.5204, lng: 73.8567, projects: 5 },
  { id: 3, name: "Toronto, Canada", lat: 43.65107, lng: -79.347015, projects: 5 },
  { id: 4, name: "Dubai", lat: 25.276987, lng: 55.296249, projects: 5 },
  { id: 5, name: "Singapore", lat: 1.352083, lng: 103.819836, projects: 5 },
  { id: 6, name: "Moscow, Russia", lat: 55.755825, lng: 37.617298, projects: 5 },
  { id: 7, name: "Seoul, South Korea", lat: 37.566535, lng: 126.977969, projects: 5 },
  { id: 8, name: "Paris, France", lat: 48.856613, lng: 2.352222, projects: 5 },
  { id: 9, name: "Berlin, Germany", lat: 52.52, lng: 13.405, projects: 5 },
  { id: 10, name: "Raipur", lat: 21.2514, lng: 81.6296, projects: 5 },
  { id: 11, name: "Hyderabad", lat: 17.385044, lng: 78.486671, projects: 5 },
  { id: 12, name: "Bangalore", lat: 12.971599, lng: 77.594566, projects: 5 },
  { id: 13, name: "New York, USA", lat: 40.7128, lng: -74.0060, projects: 5 },
  { id: 14, name: "Kyiv, Ukraine", lat: 50.4501, lng: 30.5234, projects: 5 },
  { id: 15, name: "Nairobi, Kenya", lat: -1.292066, lng: 36.821945, projects: 5 },
  { id: 16, name: "Lagos, Nigeria", lat: 6.524379, lng: 3.379206, projects: 5 },
  { id: 17, name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, projects: 5 },
];

const GeoMap: React.FC<GeoMapProps> = ({
  clientLocations = defaultLocations,
  title = "Trusted from Pune to Global",
  subtitle = "A visual showcase of our global client base and successful projects",
  buttonText = "Explore Our Projects",
}) => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);

  const handleMarkerMouseEnter = (location: ClientLocation, event: React.MouseEvent) => {
    setHoveredPin(location.id);
    
          // Get the map container bounds
      const mapContainer = event.currentTarget.closest('.relative');
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        const containerWidth = rect.width;
        
        // Calculate tooltip position relative to container
        let tooltipX = event.clientX - rect.left;
        let tooltipY = event.clientY - rect.top;
      
      // Ensure tooltip stays within container bounds
      const tooltipWidth = 120; // Approximate tooltip width
      const tooltipHeight = 40; // Approximate tooltip height
      
      if (tooltipX + tooltipWidth > containerWidth) {
        tooltipX = containerWidth - tooltipWidth - 10;
      }
      
      if (tooltipY - tooltipHeight < 0) {
        tooltipY = tooltipHeight + 10;
      }
      
      setTooltip({
        x: tooltipX,
        y: tooltipY,
        name: location.name,
      });
    }
  };

  const handleMarkerMouseLeave = () => {
    setHoveredPin(null);
    setTooltip(null);
  };

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-4 h-4" />
            Global Reach
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="section-title">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative h-96 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background matching homepage */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />

          <div className="w-full h-full relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 240,
                center: [0, 30],
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies
                    .filter((geo) => geo.properties.NAME !== "Antarctica")
                    .map((geo) => (
                                             <Geography
                         key={geo.rsmKey}
                         geography={geo}
                         fill="#e5e7eb"
                         stroke="#d1d5db"
                         strokeWidth={1}
                         style={{
                           default: { outline: "none" },
                           hover: { fill: "#d1d5db", outline: "none" },
                           pressed: { outline: "none" },
                         }}
                       />
                    ))
                }
              </Geographies>

              {clientLocations.map((location) => (
                <Marker
                  key={location.id}
                  coordinates={[location.lng, location.lat]}
                  onMouseEnter={(event) => handleMarkerMouseEnter(location, event)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <motion.circle
                    r={hoveredPin === location.id ? 10 : 8}
                    fill="#125e8a"
                    stroke="#ffffff"
                    strokeWidth={3}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.3 }}
                    className="cursor-pointer drop-shadow-lg"
                  />
                  {hoveredPin === location.id && (
                    <motion.circle
                      r={25}
                      fill="#125e8a"
                      opacity={0.15}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Small inner dot for better visibility */}
                  <motion.circle
                    r={hoveredPin === location.id ? 3 : 2}
                    fill="#ffffff"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </Marker>
              ))}
            </ComposableMap>

            {/* Custom tooltip */}
            {tooltip && (
              <motion.div
                className="absolute z-20 px-4 py-2 bg-card border border-border rounded-lg shadow-xl text-sm font-semibold text-card-foreground"
                style={{
                  left: tooltip.x,
                  top: tooltip.y - 50,
                  pointerEvents: "none",
                }}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {tooltip.name}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            href="/proof"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-colors"
          >
            <Map className="w-4 h-4" />
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GeoMap;