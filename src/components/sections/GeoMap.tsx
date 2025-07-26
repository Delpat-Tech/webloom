"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Map } from "react-feather";
import mapboxgl from "mapbox-gl";
import { ClientLocation, GeoMapProps } from "@/types";
import Button from "@/components/ui/Button";

// Ensure Mapbox CSS is included
import "mapbox-gl/dist/mapbox-gl.css";

const defaultLocations: ClientLocation[] = [
  { id: 1, name: "San Francisco", lat: 37.7749, lng: -122.4194, projects: 12 },
  { id: 2, name: "New York", lat: 40.7128, lng: -74.0060, projects: 8 },
  { id: 3, name: "London", lat: 51.5074, lng: -0.1278, projects: 15 },
  { id: 4, name: "Pune", lat: 18.5204, lng: 73.8567, projects: 25 },
  { id: 5, name: "Sydney", lat: -33.8688, lng: 151.2093, projects: 6 },
  { id: 6, name: "Berlin", lat: 52.5200, lng: 13.4050, projects: 9 },
];

const GeoMap: React.FC<GeoMapProps> = ({
  clientLocations = defaultLocations,
  title = "Trusted from Pune to Global",
  subtitle = "A visual showcase of our global client base and successful projects",
  buttonText = "Explore Our Projects",
}) => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isMapInitialized = useRef<boolean>(false); // Track map initialization

  useEffect(() => {
    if (!mapContainer.current) {
      console.error("Map container not found");
      setMapError("Map container failed to initialize");
      return;
    }

    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is missing");
      setMapError("Mapbox access token is missing. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.local");
      return;
    }

    // Prevent duplicate map initialization
    if (isMapInitialized.current) {
      console.log("Map already initialized, skipping");
      return;
    }

    try {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/navigation-day-v1", // Muted colors
        projection: "mercator", // Flat map
        zoom: 1, // Initial zoom, will be adjusted
        antialias: true, // Improve rendering quality
      });
      isMapInitialized.current = true;
      console.log("Map initialized with navigation-day-v1");

      // Log style load success or failure
      map.current.on("style.load", () => {
        console.log("Mapbox style loaded successfully: navigation-day-v1");
        // Verify single canvas
        if (mapContainer.current?.querySelectorAll(".mapboxgl-canvas").length !== 1) {
          console.warn("Multiple Mapbox canvases detected");
        }
      });
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError("Failed to load map. Check token or network.");
      });

      // Calculate bounds to fit all client locations
      const bounds = new mapboxgl.LngLatBounds();
      let validLocations = 0;
      clientLocations.forEach((location) => {
        if (location.lat != null && location.lng != null && !isNaN(location.lat) && !isNaN(location.lng)) {
          bounds.extend([location.lng, location.lat]);
          validLocations++;
        } else {
          console.warn(`Invalid lat/lng for location: ${location.name}`, location);
        }
      });

      // Fit map to bounds or use fallback center
      if (validLocations > 0) {
        map.current.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 10,
          duration: 0, // Instant fit for initial render
        });
        console.log(`Map fitted to bounds with ${validLocations} locations`);
      } else {
        console.warn("No valid locations to fit bounds, using fallback center");
        map.current.setCenter([0, 20]);
        map.current.setZoom(1);
      }

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add markers with explicit size and visibility
      clientLocations.forEach((location) => {
        if (location.lat != null && location.lng != null && !isNaN(location.lat) && !isNaN(location.lng)) {
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`
            <div class="font-medium text-sm">${location.name}</div>
            <div class="text-xs text-gray-500">${location.projects} projects</div>
          `);

          const markerElement = document.createElement("div");
          markerElement.style.background = "#5B21B6"; // Purple marker
          markerElement.style.width = "20px"; // Larger for visibility
          markerElement.style.height = "20px";
          markerElement.style.borderRadius = "50%";
          markerElement.style.boxShadow = "0 0 8px rgba(0,0,0,0.3)";
          markerElement.style.cursor = "pointer";

          const marker = new mapboxgl.Marker({
            element: markerElement,
          })
            .setLngLat([location.lng, location.lat])
            .setPopup(popup)
            .addTo(map.current!);

          marker.getElement().addEventListener("mouseenter", () => {
            setHoveredPin(location.id);
            popup.addTo(map.current!);
          });
          marker.getElement().addEventListener("mouseleave", () => {
            setHoveredPin(null);
            popup.remove();
          });

          console.log(`Marker added for ${location.name} at [${location.lng}, ${location.lat}]`);
        }
      });
    } catch (error) {
      console.error("Mapbox initialization failed:", error);
      setMapError("Failed to initialize map. Check console for details.");
      isMapInitialized.current = false;
    }

    return () => {
      if (map.current) {
        console.log("Cleaning up Mapbox instance");
        map.current.remove();
        map.current = null;
        isMapInitialized.current = false;
      }
    };
  }, [clientLocations]);

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
          className="relative h-96 bg-gradient-to-br from-muted/30 to-muted/60 rounded-3xl border border-border/50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {mapError ? (
            <div className="w-full h-full flex items-center justify-center text-red-500">
              {mapError}
            </div>
          ) : process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? (
            <div
              ref={mapContainer}
              className="w-full h-full"
              style={{
                position: "relative",
                zIndex: 0,
                filter: "saturate(0.6)", // Muted colors
                backgroundRepeat: "no-repeat", // Prevent map tiling
              }}
            />
          ) : (
            <div className="relative w-full h-full bg-gray-100">
              <div
                className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 50%27%3E%3Cpath d=%27M10,25 Q30,15 50,25 T90,25%27 stroke=%27rgba(99,102,241,0.1)%27 stroke-width=%270.5%27 fill=%27none%27/%3E%3C/svg%3E')] bg-no-repeat bg-cover bg-center opacity-30"
              />
              {clientLocations.map(
                (location) =>
                  location.x != null &&
                  location.y != null && (
                    <motion.div
                      key={location.id}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: "translate(-50%, -50%)",
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
                      {hoveredPin === location.id && (
                        <motion.div
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-10"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="font-medium text-sm">${location.name}</div>
                          <div className="text-xs text-muted-foreground">${location.projects} projects</div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
              )}
            </div>
          )}
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