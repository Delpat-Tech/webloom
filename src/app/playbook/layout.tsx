import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('playbook');

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
