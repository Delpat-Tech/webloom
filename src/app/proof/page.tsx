import { DatabaseService } from '@/lib/api';
import ProofPageClient, { ProofTestimonial } from './ProofPageClient';

export default async function ProofPage() {
  let testimonials: ProofTestimonial[] = [];

  try {
    const raw = await DatabaseService.getTestimonials();
    // JSON round-trip strips ObjectId/Buffer instances so Next.js can pass
    // the plain objects from this Server Component to ProofPageClient
    const plain = JSON.parse(JSON.stringify(raw)) as ProofTestimonial[];
    testimonials = plain.filter((t) => !t.source || t.source === 'proof');
  } catch {
    // Graceful degradation — show page without testimonials if DB is unreachable
  }

  return <ProofPageClient testimonials={testimonials} />;
}
