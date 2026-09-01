import { notFound } from 'next/navigation';
import { DatabaseService } from '@/lib/api';
import PortfolioDetailClient from '@/components/sections/PortfolioDetailClient';
import type { PortfolioItem } from '@/data/portfolio-types';

export default async function ProofCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await DatabaseService.getPortfolioProjectBySlug(id);

  if (!project) {
    notFound();
  }

  // Strip Mongoose BSON/ObjectId types before passing to client component
  const plainProject = JSON.parse(JSON.stringify(project)) as PortfolioItem;

  return <PortfolioDetailClient portfolioData={plainProject} />;
}