// seed-services.ts — Seeds the 3 Delpat service offerings into MongoDB
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose from 'mongoose';
import connectDB from '../lib/db';
import Service from '../lib/models/Service';

const services = [
  {
    slug: 'mvp-engine',
    title: 'MVP Engine',
    subtitle: 'Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams.',
    description: 'Go from idea to live product in an average of 6 weeks. Fixed timeline, fixed cost, zero surprises.',
    startingPrice: '₹40,000',
    timeline: '6 weeks',
    outcome: 'A fully functional MVP ready for real users and investor demos',
  },
  {
    slug: 'internal-os',
    title: 'Internal OS',
    subtitle: 'Core systems, dashboards, and digital infrastructure for operations and scalability.',
    description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
    startingPrice: '₹20,000',
    timeline: '4-5 weeks',
    outcome: 'Streamlined operations saving 20+ hours weekly',
  },
  {
    slug: 'automation-hub',
    title: 'Automation Hub',
    subtitle: 'Workflow automation, integrations, and process optimization for scaling businesses.',
    description: 'Automate repetitive tasks, integrate systems, and scale operations without adding headcount.',
    startingPrice: '₹15,000',
    timeline: '3-4 weeks',
    outcome: 'Automated workflows saving time and reducing errors',
  },
];

async function seedServices() {
  try {
    console.log('Seeding services...');
    await connectDB();

    let created = 0;
    let skipped = 0;

    for (const service of services) {
      const exists = await Service.findOne({ slug: service.slug });
      if (exists) {
        skipped++;
        console.log(`  Skipped (already exists): ${service.title}`);
        continue;
      }
      await Service.create(service);
      created++;
      console.log(`  Created: ${service.title}`);
    }

    const total = await Service.countDocuments();
    console.log(`\nDone — created: ${created}, skipped: ${skipped}, total in DB: ${total}`);
  } catch (error) {
    console.error('Error seeding services:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedServices();
