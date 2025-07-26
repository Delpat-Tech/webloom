import { generateDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return generateDynamicMetadata('proof', params);
}

export default function ProofIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 