import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
  socialProof?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  visualSrc?: string;
}

function handleCtaClick(href: string) {
  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }
  window.location.href = href;
}

export default function Hero({
  title = "The Execution Engine for Founders & Teams",
  subtitle = "We build MVPs, internal tools, and automations fast.",
  socialProof = "Trusted by 100+ founders and ops leaders who needed to ship fast",
  primaryCTA = { label: "Book a Discovery Call", href: "/collaborate" },
  secondaryCTA = { label: "Explore Our Work", href: "/proof" },
  visualSrc = "/globe.svg",
}: HeroProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-6 py-10 sm:py-16 text-center bg-background px-4">
      <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
        <Heading level={1} variant="gradient" className="mb-2">
          {title}
        </Heading>
        <p className="text-lg md:text-xl text-muted-foreground font-body mb-2">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 w-full">
          <Button variant="primary" className="w-full sm:w-auto" onClick={() => handleCtaClick(primaryCTA.href)}>
            {primaryCTA.label}
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto" onClick={() => handleCtaClick(secondaryCTA.href)}>
            {secondaryCTA.label}
          </Button>
        </div>
        <div className="mt-6 text-accent font-semibold text-base">{socialProof}</div>
      </div>
      <div className="mt-8 flex justify-center">
        <Image src={visualSrc} alt="Hero Visual" width={120} height={120} className="rounded-full shadow-lg sm:w-[160px] sm:h-[160px] w-[120px] h-[120px]" />
      </div>
    </section>
  );
} 