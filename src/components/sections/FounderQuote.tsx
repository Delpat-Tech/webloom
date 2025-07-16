import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

interface FounderQuoteProps {
  headline?: string;
  quote?: string;
  cta?: { label: string; href: string };
}

export default function FounderQuote({
  headline = "From Our Founder",
  quote = "We ship. We don’t ghost.",
  cta = { label: "Read Our Ethos", href: "/about" },
}: FounderQuoteProps) {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-background px-4">
      <Heading level={2} color="primary" className="mb-4 text-center">
        {headline}
      </Heading>
      <blockquote className="italic text-xl text-muted-foreground max-w-2xl text-center mb-6 border-l-4 border-primary pl-4">
        “{quote}”
      </blockquote>
      <Button variant="primary" className="w-full sm:w-auto" onClick={() => (window.location.href = cta.href)}>
        {cta.label}
      </Button>
    </section>
  );
} 