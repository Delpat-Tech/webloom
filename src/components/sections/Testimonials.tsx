import Heading from "@/components/ui/Heading";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsProps {
  headline?: string;
  testimonials?: Testimonial[];
}

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

export default function Testimonials({
  headline = "What Our Clients Say",
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-background px-4">
      <Heading level={2} color="primary" className="mb-4 text-center">
        {headline}
      </Heading>
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center w-full">
        {testimonials.slice(0, 3).map((t, i) => (
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
    </section>
  );
} 