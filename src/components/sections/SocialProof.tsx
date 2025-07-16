import Heading from "@/components/ui/Heading";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface SocialProofProps {
  headline?: string;
  description?: string;
  caption?: string;
  logos?: string[];
  testimonials?: Testimonial[];
}

const defaultLogos: string[] = [
  "/images/logo.svg",
  "/vercel.svg",
  "/next.svg",
  "/window.svg",
  "/file.svg",
];

const defaultTestimonials: Testimonial[] = [
  {
    name: "Ravi S.",
    role: "Founder, StartupForge",
    quote: "Delpat helped us launch our MVP in weeks, not months. Their speed and clarity are unmatched.",
  },
  {
    name: "Sarah P.",
    role: "Ops Lead, ScaleOps",
    quote: "We needed custom automations fast. Delpat delivered exactly what we needed, on time and on budget.",
  },
  {
    name: "Amit K.",
    role: "Product Manager, FinEdge",
    quote: "The team at Delpat is realistic, smart, and truly understands execution. Highly recommended!",
  },
];

export default function SocialProof({
  headline = "Trusted by Startups Worldwide",
  description = "100+ ambitious teams have shipped faster with Delpat.",
  caption = "Trusted by startups worldwide",
  logos = defaultLogos,
  testimonials = [],
}: SocialProofProps) {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-background px-4">
      <Heading level={2} color="primary" className="mb-4 text-center">
        {headline}
      </Heading>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-xl">{description}</p>
      {logos && logos.length > 0 && (
        <>
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-center mb-4 w-full">
            {logos.map((logo, i) => (
              <div key={i} className="flex justify-center w-1/2 sm:w-auto mb-2 sm:mb-0">
                <Image
                  src={logo}
                  alt={`Client logo ${i + 1}`}
                  width={80}
                  height={40}
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="text-accent font-semibold text-base mb-8">{caption}</div>
        </>
      )}
      {testimonials && testimonials.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center w-full">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg shadow-md p-6 max-w-xs w-full sm:w-auto text-left"
            >
              <p className="text-base mb-4">“{t.quote}”</p>
              <div className="font-semibold text-primary">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 
