import mongoose from 'mongoose';
import connectDB from '../lib/db';
import PortfolioProject, { IPortfolioProject } from '../lib/models/PortfolioProject';
import { portfolioItems } from '../data/portfolio-data';

async function seedPortfolioProjects() {
  try {
    console.log('Starting portfolio seeding...');
    await connectDB();

    await PortfolioProject.deleteMany({});
    const inserted = await PortfolioProject.insertMany(portfolioItems as Partial<IPortfolioProject>[]);

    console.log(`Created ${inserted.length} portfolio projects`);
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
