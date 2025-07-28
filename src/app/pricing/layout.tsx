import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('pricing');

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 