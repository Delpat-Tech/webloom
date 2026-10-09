import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('real-estate-crm');

export default function RealEstateCrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
