"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Map as MapIcon, ChevronDown, Search } from 'react-feather';
import { ClientLocation, GeoMapProps } from '@/types';

// Slugify helper to map city names to file names, e.g., "New York" -> "new-york"
const slugifyCityName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Convert lat/lng to SVG coordinates for 2000x857 viewBox
const latLngToSVG = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 2000;
  const y = ((90 - lat) / 180) * 857;
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
  const imageSrc = `/images/maps/${slugifyCityName(location.name)}.svg`;
  return { ...location, x: svgCoords.x, y: svgCoords.y, imageSrc };
});

// Small helper component to show a city SVG with graceful fallback to the MapPin icon
const CityImage: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [source, setSource] = useState<string | undefined>(src);
  const [didFallback, setDidFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!source || hasError) {
    return <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary" aria-hidden="true" />;
  }

  return (
    <img
      src={source}
      alt={alt}
      className={className}
      onError={() => {
        if (!didFallback) {
          setSource('/images/maps/city-placeholder.svg');
          setDidFallback(true);
        } else {
          setHasError(true);
        }
      }}
      loading="lazy"
      decoding="async"
    />
  );
};

const GeoMap: React.FC<GeoMapProps> = ({
  clientLocations = defaultLocations,
  title = "Solving Execution Gaps, Globally",
  subtitle = " From validating a founder's idea in Sydney to automating an enterprise workflow in Dubai, our process delivers results across every time zone",
  buttonText = "Explore Our Projects",
}) => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [animatedRegions, setAnimatedRegions] = useState<{[key: number]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>({});

  // Sort locations alphabetically by country, then by city name
  const sortedLocations = useMemo(() => {
    const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
    return [...clientLocations].sort((a, b) => {
      const countryA = a.country ?? '';
      const countryB = b.country ?? '';
      const countryCompare = collator.compare(countryA, countryB);
      if (countryCompare !== 0) return countryCompare;
      return collator.compare(a.name, b.name);
    });
  }, [clientLocations]);

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

  // Filtered + grouped data for mobile list
  const filteredLocations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sortedLocations;
    return sortedLocations.filter((l) =>
      l.name.toLowerCase().includes(query) || (l.country ?? '').toLowerCase().includes(query)
    );
  }, [sortedLocations, searchQuery]);

  const groupedByCountry = useMemo((): Array<[string, ClientLocation[]]> => {
    const groups = new Map<string, ClientLocation[]>();
    for (const loc of filteredLocations) {
      const key = loc.country ?? 'Unknown';
      const arr = groups.get(key) ?? [];
      arr.push(loc);
      groups.set(key, arr);
    }
    return Array.from(groups.entries()) as Array<[string, ClientLocation[]]> ;
  }, [filteredLocations]);

  useEffect(() => {
    // Ensure newly visible countries are open by default
    setOpenCountries((prev) => {
      const next: Record<string, boolean> = { ...prev };
      for (const [country] of groupedByCountry) {
        if (!(country in next)) next[country] = true;
      }
      // Remove countries that are no longer present
      for (const key of Object.keys(next)) {
        if (!groupedByCountry.find(([c]: [string, ClientLocation[]]) => c === key)) delete next[key];
      }
      return next;
    });
  }, [groupedByCountry]);

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

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Mobile-only enhanced list (search, collapsible by country) - disabled */}
        {false && (
          <motion.div
            className="block sm:hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Search */}
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city or country"
                  className="w-full px-10 py-2 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {filteredLocations.length} result{filteredLocations.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Grouped list */}
            <div className="space-y-3">
              {groupedByCountry.length === 0 && (
                <div className="px-4 py-6 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                  No locations found
                </div>
              )}

              {groupedByCountry.map(([country, locations]) => (
                <div key={country} className="border border-border rounded-xl bg-card overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3"
                    onClick={() => setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }))}
                    aria-expanded={!!openCountries[country]}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{country}</span>
                      <span className="text-xs text-muted-foreground">({locations.length})</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${openCountries[country] ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {openCountries[country] && (
                    <ul className="divide-y divide-border">
                      {locations.map((loc) => {
                        const isExpanded = expandedId === loc.id;
                        return (
                          <li key={loc.id} className="">
                            <motion.button
                              type="button"
                              className="w-full px-4 py-3 flex items-center justify-between"
                              onClick={() => setExpandedId((prev) => (prev === loc.id ? null : loc.id))}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.1 }}
                              aria-expanded={isExpanded}
                            >
                              <span className="text-foreground font-medium">{loc.name}</span>
                              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </motion.button>

                            {isExpanded && (
                              <motion.div
                                className="px-4 pb-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                                    <CityImage src={loc.imageSrc} alt={`${loc.name} illustration`} className="w-full h-full object-contain p-2" />
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    <div>Lat: {loc.lat.toFixed(3)}, Lng: {loc.lng.toFixed(3)}</div>
                                    <div>Tap country to collapse group</div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tablet grid (sm to <lg), sorted by country) - disabled */}
        {false && (
          <motion.div
            className="hidden sm:block lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {sortedLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-card border border-border rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center h-full min-h-[150px] sm:min-h-[180px]"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 overflow-hidden">
                    <CityImage src={loc.imageSrc} alt={`${loc.name} illustration`} className="w-full h-full object-contain p-3" />
                  </div>
                  <div className="mt-auto">
                    <div className="text-base sm:text-lg font-semibold text-foreground">{loc.name}</div>
                    {loc.country && (
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">{loc.country}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="relative h-80 sm:h-96 md:h-[28rem] max-w-5xl w-full mx-auto hidden sm:block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <svg
            viewBox="0 0 2000 857"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* World map background image for visibility */}
            <image
              href="/world.svg"
              x="0"
              y="0"
              width="2000"
              height="857"
              preserveAspectRatio="xMidYMid meet"
              className="opacity-40 dark:opacity-70 dark:invert"
              style={{ pointerEvents: 'none' }}
              aria-hidden="true"
            />
            
            {/* Markers */}
            {clientLocations.map((location) => (
              <g key={location.id}>
                {animatedRegions[location.id] && (
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r="12"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="r"
                      values="12;28;12"
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
                
                <circle
                  cx={location.x}
                  cy={location.y}
                  r={hoveredPin === location.id ? "12" : "9"}
                  fill="var(--primary)"
                  stroke="var(--card)"
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredPin(location.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  style={{
                    filter: hoveredPin === location.id
                      ? 'drop-shadow(0 0 12px var(--primary))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    transform: hoveredPin === location.id ? 'scale(1.2)' : 'scale(1)',
                    transformOrigin: `${location.x}px ${location.y}px`
                  }}
                />

                {hoveredPin === location.id && (
                  <g>
                    <rect
                      x={location.x! - 90}
                      y={location.y! - 80}
                      width="180"
                      height="70"
                      rx="10"
                      fill="var(--popover)"
                      fillOpacity="0.95"
                      stroke="var(--primary)"
                      strokeWidth="1"
                    />
                    <text
                      x={location.x}
                      y={location.y! - 50}
                      textAnchor="middle"
                      fill="var(--popover-foreground)"
                      fontSize="18"
                      fontWeight="600"
                    >
                      {location.name}
                    </text>
                    {location.country && (
                      <text
                        x={location.x}
                        y={location.y! - 30}
                        textAnchor="middle"
                        fill="var(--muted-foreground)"
                        fontSize="14"
                      >
                        {location.country}
                      </text>
                    )}
                  </g>
                )}
              </g>
            ))}

            {hoveredLocation && (() => {
              const puneLocation = clientLocations.find(loc => loc.name === "Pune");
              if (puneLocation && hoveredLocation.id !== puneLocation.id) {
                return (
                  <line
                    x1={puneLocation.x}
                    y1={puneLocation.y}
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
                );
              }
              return null;
            })()}
          </svg>
        </motion.div>

        <motion.div
          className="text-center mt-8 hidden sm:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
            <MapIcon className="w-4 h-4" />
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GeoMap;
