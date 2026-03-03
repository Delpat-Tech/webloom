import { DatabaseService } from '@/lib/api';
import PartnerPageClient, { PartnerTestimonial } from './PartnerPageClient';

export default async function CollaboratePage() {
  let testimonials: PartnerTestimonial[] = [];

  try {
    const raw = await DatabaseService.getTestimonials();
    // JSON round-trip strips ObjectId/Buffer instances so Next.js can pass
    // the plain objects from this Server Component to PartnerPageClient
    const plain = JSON.parse(JSON.stringify(raw)) as PartnerTestimonial[];
    testimonials = plain.filter((t) => (t as { source?: string }).source === 'partner');
  } catch {
    // Graceful degradation — show page without testimonials if DB is unreachable
  }

  return <PartnerPageClient testimonials={testimonials} />;
}
