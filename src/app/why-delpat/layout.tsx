import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('why-delpat');

export default function WhyDelpatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 