import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('proof');

export default function ProofLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 