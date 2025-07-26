import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('legal/privacy');

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 