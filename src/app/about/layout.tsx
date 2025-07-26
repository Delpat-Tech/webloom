import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('about');

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 