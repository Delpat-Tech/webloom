import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('test-analytics');

export default function TestAnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 