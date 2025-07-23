import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Compass, ArrowRight } from 'lucide-react';

export interface ClientLocation {
  id: number;
  name: string;
  x: number;
  y: number;
  projects: number;
}

interface GeoMapProps {
  clientLocations?: ClientLocation[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const defaultLocations: ClientLocation[] = [
  { id: 1, name: 'San Francisco', x: 15, y: 45, projects: 12 },
  { id: 2, name: 'New York', x: 25, y: 40, projects: 8 },
  { id: 3, name: 'London', x: 50, y: 35, projects: 15 },
  { id: 4, name: 'Pune', x: 75, y: 55, projects: 25 },
  { id: 5, name: 'Sydney', x: 85, y: 70, projects: 6 },
  { id: 6, name: 'Berlin', x: 52, y: 32, projects: 9 }
];

const GeoMap: React.FC<GeoMapProps> = ({
  clientLocations = defaultLocations,
  title = 'Trusted from Pune to Global',
  subtitle = 'A visual showcase of our global client base and successful projects',
  buttonText = 'Explore Our Projects',
  onButtonClick
}) => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

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
            <Globe className="w-4 h-4" />
            Global Reach
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="section-title">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          className="relative h-96 bg-gradient-to-br from-muted/30 to-muted/60 rounded-3xl border border-border/50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Simplified world map background */}
          <div
            className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3Cpath d='M10,25 Q30,15 50,25 T90,25' stroke='rgba(99,102,241,0.1)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")] bg-center bg-no-repeat opacity-30`}
          />
          {/* Client location pins */}
          {clientLocations.map((location) => (
            <motion.div
              key={location.id}
              className="absolute group cursor-pointer"
              style={{ 
                left: `${location.x}%`, 
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: location.id * 0.1 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setHoveredPin(location.id)}
              onHoverEnd={() => setHoveredPin(null)}
            >
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: location.id * 0.2 }}
              />
              {/* Tooltip */}
              {hoveredPin === location.id && (
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs text-muted-foreground">{location.projects} projects</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-colors"
            onClick={onButtonClick}
          >
            <Compass className="w-4 h-4" />
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GeoMap; 