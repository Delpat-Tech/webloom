import mongoose from 'mongoose';
import connectDB from '../lib/db';
import PortfolioProject, { IPortfolioProject } from '../lib/models/PortfolioProject';
import { portfolioItems } from '../data/portfolio-data';

async function seedPortfolioProjects() {
  try {
    console.log('Starting portfolio seeding...');
    await connectDB();

    let created = 0;
    let skipped = 0;

    for (const item of portfolioItems as Partial<IPortfolioProject>[]) {
      const exists = await PortfolioProject.findOne({ id: item.id });
      if (exists) {
        skipped++;
        console.log(`  Skipped (already exists): ${item.id}`);
        continue;
      }
      await PortfolioProject.create(item);
      created++;
      console.log(`  Created: ${item.id}`);
    }

    const total = await PortfolioProject.countDocuments();
    console.log(`\nDone — created: ${created}, skipped: ${skipped}, total in DB: ${total}`);
    console.log('Portfolio seeding completed successfully');
  } catch (error) {
    console.error('Error seeding portfolio projects:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

seedPortfolioProjects();
