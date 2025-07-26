import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('resources');

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 