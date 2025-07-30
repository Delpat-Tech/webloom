import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata('portfolios');

export default function PortfoliosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 