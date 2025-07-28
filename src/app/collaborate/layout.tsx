import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('collaborate');

export default function CollaborateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 