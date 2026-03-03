import mongoose from 'mongoose';
import connectDB from '../lib/db';
import Stat, { IStat } from '../lib/models/Stat';

const stats: Partial<IStat>[] = [
  {
    key: 'mvp-delivery-weeks',
    number: 5,
    label: 'Average MVP delivery (weeks)',
    icon: 'zap',
    page: ['home', 'who-we-help'],
    order: 1,
  },
  {
    key: 'mvp-success-rate',
    number: 100,
    label: 'Success rate on MVPs (%)',
    icon: 'target',
    page: ['home', 'who-we-help'],
    order: 2,
  },
  {
    key: 'founders-helped',
    number: 50,
    label: 'Founders helped',
    icon: 'users',
    page: ['home', 'who-we-help'],
    order: 3,
  },
  {
    key: 'client-funding-musd',
    number: 2,
    label: 'Funding raised by clients (M USD)',
    icon: 'trending-up',
    page: ['home', 'who-we-help'],
    order: 4,
  },
];

async function seedStats() {
  try {
    console.log('Starting stats seeding...');
    await connectDB();

    let created = 0;
    let skipped = 0;

    for (const stat of stats) {
      const exists = await Stat.findOne({ key: stat.key });
      if (exists) {
        skipped++;
        console.log(`  Skipped (already exists): ${stat.key}`);
        continue;
      }
      await Stat.create(stat);
      created++;
      console.log(`  Created: ${stat.key}`);
    }

    const total = await Stat.countDocuments();
    console.log(`\nDone — created: ${created}, skipped: ${skipped}, total in DB: ${total}`);
    console.log('Stats seeding completed successfully');
  } catch (error) {
    console.error('Error seeding stats:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

seedStats();
