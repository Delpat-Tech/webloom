import Button from "@/components/ui/Button";

interface CTASectionProps {
  text?: string;
  cta?: { label: string; href: string };
}

export default function CTASection({
  text = "Ready to bridge your execution gap? Get your free roadmap today.",
  cta = { label: "Book a Discovery Call", href: "/collaborate" },
}: CTASectionProps) {
  return (
    <section className="w-full py-10 bg-gradient-to-r from-primary to-secondary flex flex-col items-center justify-center px-4">
      <div className="text-white text-2xl font-bold mb-4 text-center max-w-2xl">{text}</div>
      <Button variant="accent" className="w-full sm:w-auto" onClick={() => (window.location.href = cta.href)}>
        {cta.label}
      </Button>
    </section>
  );
} 