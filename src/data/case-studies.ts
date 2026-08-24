import { PortfolioItem } from './portfolio-types';
import { portfolioItems } from './portfolio-data';
import type { IPortfolioProject } from '@/lib/models/PortfolioProject';

// Convert portfolio items to case studies format for backward compatibility
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  client: string;
  timeline: string;
  teamSize: string;
  budget: string;
  results: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenge: string;
  solution: string;
  process: string[];
  projectId?: string;
  serviceId?: string;
  metrics: {
    label: string;
    value: string;
    icon: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
  gallery: string[];
}

// Convert IPortfolioProject to CaseStudy format
export function convertPortfolioItemToCaseStudy(item: IPortfolioProject): CaseStudy {
  // Split cardTitle into title and subtitle
  const titleParts = (item.cardTitle || '').split(': ');
  const title = titleParts[0] || item.id;
  const subtitle = titleParts[1] || (item.story?.problem ? item.story.problem.substring(0, 100) + '...' : '');

  return {
    id: item.id,
    title: title,
    subtitle: subtitle,
    description: item.execution?.coreMandate || '',
    category: (item.meta?.serviceTrack || 'custom').toLowerCase().replace(' ', '-'),
    tags: item.meta?.tags || [],
    image: '/api/placeholder/1200/600',
    client: item.client?.name || 'Client',
    timeline: '2-3 months', // Default timeline
    teamSize: '2-3 developers', // Default team size
    budget: '$50,000', // Default budget
    results: item.outcome?.qualitativeWins || [],
    technologies: [
      ...(item.techStack?.frontend || []),
      ...(item.techStack?.backend || []),
      ...(item.techStack?.database || []),
      ...(item.techStack?.deployment || []),
      ...(item.techStack?.integrations || []),
      ...(item.techStack?.platforms || [])
    ],
    liveUrl: item.meta?.links?.live,
    githubUrl: item.meta?.links?.github,
    featured: Boolean(item.meta?.featured),
    challenge: item.story?.problem || '',
    solution: item.execution?.coreMandate || '',
    process: item.execution?.features || [],
    projectId: item.id,
    serviceId: (item.meta?.serviceTrack || 'custom').toLowerCase().replace(' ', '-'),
    metrics: [
      ...(item.outcome?.headlineMetric ? [{
        label: item.outcome.headlineMetric.label || 'Outcome',
        value: item.outcome.headlineMetric.value || '100%',
        icon: item.outcome.headlineMetric.icon || 'check'
      }] : []),
      ...(item.outcome?.otherMetrics?.map(metric => ({
        label: metric.split(' by ')[0] || metric,
        value: metric.split(' by ')[1] || metric,
        icon: 'TrendingUp'
      })) || [])
    ],
    testimonials: item.outcome?.clientQuote ? [
      {
        quote: item.outcome.clientQuote.text || '',
        author: item.outcome.clientQuote.attribution?.split(',')[0] || 'Client',
        role: item.outcome.clientQuote.attribution?.split(',')[1]?.trim() || 'Client',
        company: item.client?.name || 'Client'
      }
    ] : [],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  };
}

// Create case studies from portfolio items
export const caseStudies: CaseStudy[] = (portfolioItems as unknown as IPortfolioProject[]).map(convertPortfolioItemToCaseStudy);

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter(study => study.featured);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(study => study.id === id);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter(study => study.category === category);
} 

// Export the PortfolioItem type for direct access
export type { PortfolioItem } from './portfolio-types';
export { portfolioItems } from './portfolio-data'; 