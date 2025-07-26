import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('legal/terms');

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 