import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('what-we-do');

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 