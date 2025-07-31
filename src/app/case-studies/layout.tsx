import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata('case-studies');

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 