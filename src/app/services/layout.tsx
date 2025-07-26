import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('services');

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 