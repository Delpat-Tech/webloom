// seed-testimonials.ts — Seeds testimonials from the proof page and partner-with-us page
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose from 'mongoose';
import connectDB from '../lib/db';
import Testimonial from '../lib/models/Testimonial';

const testimonials = [
  // --- Proof page testimonials (source: 'proof') ---
  {
    clientName: 'Sarah Chen',
    role: 'CEO, TechFlow',
    company: 'SaaS Startup',
    quote: "Delpat delivered our MVP in 5 weeks when our internal team estimated 4 months. Game changer. We shipped, they didn't ghost.",
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b06e8f47?w=150&h=150&fit=crop&crop=face',
    context: '5-week MVP delivery · 4-month original estimate · Zero ghosting',
    source: 'proof',
  },
  {
    clientName: 'Mike Rodriguez',
    role: 'Founder, HealthTrack',
    company: 'HealthTech Startup',
    quote: 'We went from idea to 10K users in just 8 weeks. The MVP they built became the foundation for our ₹2M funding round.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    context: 'Idea to 10K users · 8-week delivery · Validated business model',
    source: 'proof',
  },
  // --- Partner page testimonials (source: 'partner') ---
  {
    clientName: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Pixel Perfect Studio',
    quote: 'Delpat has become our secret weapon. Our clients get enterprise-quality development while we focus on what we do best - design and strategy.',
    context: '12+ projects together',
    source: 'partner',
  },
  {
    clientName: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'Brand Builders Agency',
    quote: 'The white-label approach is flawless. Our clients think we have a team of 20 developers when it\'s just us + Delpat behind the scenes.',
    context: '8-month partnership',
    source: 'partner',
  },
];

async function seedTestimonials() {
  try {
    console.log('Seeding testimonials...');
    await connectDB();

    let created = 0;
    let skipped = 0;

    for (const t of testimonials) {
      const exists = await Testimonial.findOne({
        clientName: t.clientName,
        source: t.source,
      });
      if (exists) {
        skipped++;
        console.log(`  Skipped (already exists): ${t.clientName} [${t.source}]`);
        continue;
      }
      await Testimonial.create(t);
      created++;
      console.log(`  Created: ${t.clientName} [${t.source}]`);
    }

    const total = await Testimonial.countDocuments();
    console.log(`\nDone — created: ${created}, skipped: ${skipped}, total in DB: ${total}`);
  } catch (error) {
    console.error('Error seeding testimonials:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedTestimonials();
