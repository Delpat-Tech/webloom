import { generateDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return generateDynamicMetadata('resources', params);
}

export default function ResourceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 