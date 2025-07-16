import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

interface Pin {
  label: string;
  x: number; // percent left
  y: number; // percent top
}

interface GeoMapProps {
  headline?: string;
  description?: string;
  cta?: { label: string; href: string };
  visualSrc?: string;
  pins?: Pin[];
}

const defaultPins: Pin[] = [
  { label: "Pune, India", x: 60, y: 70 },
  { label: "London, UK", x: 35, y: 30 },
  { label: "San Francisco, USA", x: 10, y: 50 },
];

export default function GeoMap({
  headline = "Trusted from Pune to Global",
  description = "A visual showcase of our global client base and successful projects",
  cta = { label: "Explore Our Projects", href: "/proof" },
  visualSrc = "/globe.svg",
  pins = defaultPins,
}: GeoMapProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="w-full py-16 flex flex-col items-center bg-muted px-4">
      <Heading level={2} color="primary" className="mb-4 text-center">
        {headline}
      </Heading>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-xl">{description}</p>
      <div className="relative mb-8 flex justify-center w-40 h-40 sm:w-[240px] sm:h-[240px]">
        <Image src={visualSrc} alt="Geo Map" width={240} height={240} className="rounded-full shadow-lg w-40 h-40 sm:w-[240px] sm:h-[240px]" />
        {pins.map((pin, i) => (
          <div
            key={i}
            className="absolute z-10 cursor-pointer"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-3 h-3 bg-accent rounded-full border-2 border-white shadow" />
            {hovered === i && (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-popover text-popover-foreground px-2 py-1 rounded shadow text-xs whitespace-nowrap mt-[-8px]">
                {pin.label}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button variant="accent" onClick={() => (window.location.href = cta.href)}>
        {cta.label}
      </Button>
    </section>
  );
} 