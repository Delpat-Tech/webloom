import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('who-we-help');

export default function WhoWeHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 