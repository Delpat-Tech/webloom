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
  const [mapError, setMapError] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isMapInitialized = useRef<boolean>(false); // Track map initialization

  useEffect(() => {
    // Wait for the next tick to ensure the container is rendered
    const timer = setTimeout(() => {
      if (!mapContainer.current) {
        console.error("Map container not found - container element is null");
        setMapError("Map container failed to initialize. Please refresh the page.");
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
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
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
            <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md">
                  To view the interactive map, please add your Mapbox access token to the environment variables.
                </p>
                <div className="space-y-2">
                  {clientLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{location.name}</span>
                    </div>
                  ))}
                </div>
              </div>
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