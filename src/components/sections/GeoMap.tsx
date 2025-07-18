import React from "react";

type Pin = { lat: number; lng: number; label: string };
type GeoMapProps = {
  headline: string;
  description: string;
  pins: Pin[];
  cta: string;
};

const GeoMap: React.FC<GeoMapProps> = ({ headline, description, pins, cta }) => (
  <section className="text-center py-8">
    <h2 className="text-3xl sm:text-4xl font-heading font-extrabold section-title text-center mb-4">{headline}</h2>
    <p className="text-lg sm:text-xl text-[var(--foreground)] mb-6">{description}</p>
    <div className="bg-muted text-muted-foreground h-48 flex items-center justify-center mb-4 rounded-xl">Map Placeholder ({pins.length} locations)</div>
    <button className="btn btn-link">{cta}</button>
  </section>
);

export default GeoMap; 