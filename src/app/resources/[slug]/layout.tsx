import { generateDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateDynamicMetadata('resources', { slug });
}

export default function ResourceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 