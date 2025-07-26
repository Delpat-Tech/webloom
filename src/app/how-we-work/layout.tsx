import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('how-we-work');

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 