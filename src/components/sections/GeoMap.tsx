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
    <h2 className="text-2xl font-semibold mb-2">{headline}</h2>
    <p className="mb-4">{description}</p>
    <div className="bg-gray-100 h-48 flex items-center justify-center mb-4">Map Placeholder ({pins.length} locations)</div>
    <button className="btn btn-link">{cta}</button>
  </section>
);

export default GeoMap; 