import { notFound } from 'next/navigation';
import { DatabaseService } from '@/lib/api';
import PortfolioDetailClient from '@/components/sections/PortfolioDetailClient';
import type { PortfolioItem } from '@/data/portfolio-types';

export default async function PortfolioItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const portfolioData = await DatabaseService.getPortfolioProjectBySlug(id);

  if (!portfolioData) {
    notFound();
  }

  return <PortfolioDetailClient portfolioData={portfolioData as unknown as PortfolioItem} />;
}