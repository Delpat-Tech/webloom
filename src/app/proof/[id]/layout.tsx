import { generateDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return generateDynamicMetadata('proof', { id });
}

export default function ProofIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 