import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      title: "StartupForge Ravi (Founders)",
      headline: "For the Founder with a Vision",
      painPoints: [
        "You have a validated idea, Figma designs, and a small budget.",
        "You need a working web app in 6 weeks to show to your first 100 users and 3 angel investors.",
        "Freelance platforms are a gamble you can't afford.",
      ],
      solutions: [
        "We provide a fixed-scope, reliable path to launch so you can focus on your customers.",
      ],
      ctaLabel: "Explore MVP Engine",
      ctaLink: "/services/mvp-engine",
      iconName: "Rocket",
    },
    {
      title: "OpsPilot Sarah (Operations Leaders)",
      headline: "For the Ops Leader Battling Chaos",
      painPoints: [
        "Your 5-person support team spends 3 hours a day manually copying data between tools.",
        "Errors are common and cost you ~$5k/month in churn and wasted time.",
        "You've tried freelancers with unreliable results.",
      ],
      solutions: [
        "We build the custom tools and dashboards that bring order and efficiency to your operations.",
      ],
      ctaLabel: "Explore Internal OS",
      ctaLink: "/services/internal-os",
      iconName: "Settings",
    },
    {
      title: "Professional Client-Facing Persona",
      headline: "For the Business Needing a Polished Tool",
      painPoints: [
        "You need a professional, client-facing application or dashboard that works flawlessly and reflects your brand's quality.",
      ],
      solutions: [
        "We build robust, impressive tools that you can proudly deliver to your own clients.",
      ],
      ctaLabel: "Request a Custom Scope",
      ctaLink: "/contact",
      iconName: "Briefcase",
    },
    {
      title: "Quick MVP Hungry Ideators",
      headline: "For the Ideator Who Needs to Validate, Now",
      painPoints: [
        "You have a brilliant idea but need a live product to test it.",
      ],
      solutions: [
        "We offer a rapid, streamlined process to build a functional prototype or 'Lite' MVP to prove your concept in the real world.",
      ],
      ctaLabel: "Build a Lite MVP",
      ctaLink: "/services/lite-mvp",
      iconName: "Zap",
    },
  ]);
} 