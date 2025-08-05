import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata('portfolio-item');

export default function PortfolioItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 