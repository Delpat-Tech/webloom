// scripts/seed.ts
import mongoose from 'mongoose';
import  connectDB  from '../lib/db';
import Testimonial from '../lib/models/Testimonial';
import Lead from '../lib/models/Lead';

const sampleTestimonials = [
  {
    clientName: 'Sarah Johnson',
    role: 'CEO, Tech Solutions Inc.',
    quote: 'The team delivered exceptional results that exceeded our expectations. Their attention to detail and professionalism is unmatched.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b06e8f47?w=150&h=150&fit=crop&crop=face'
  },
  {
    clientName: 'Michael Chen',
    role: 'Product Manager, InnovateCorp',
    quote: 'Working with this team was a game-changer for our project. They understood our vision and brought it to life perfectly.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    clientName: 'Emily Rodriguez',
    role: 'Founder, StartupX',
    quote: 'Their innovative approach and dedication to quality made all the difference. I highly recommend their services.',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    clientName: 'David Wilson',
    role: 'CTO, Digital Dynamics',
    quote: 'Outstanding technical expertise and project management. They delivered on time and within budget.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    clientName: 'Amanda Foster',
    role: 'Marketing Director, GrowthCo',
    quote: 'The creative solutions they provided helped us achieve our business goals faster than we anticipated.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    clientName: 'James Thompson',
    role: 'VP of Engineering, ScaleUp',
    quote: 'Professional, reliable, and skilled. They became an integral part of our development process.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
];

const sampleLeads = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Doe Enterprises',
    message: 'Interested in web development services for my startup.',
    page: 'Contact',
    dateSubmitted: new Date('2025-07-01'),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    company: 'Smith Corp',
    message: 'Requesting a quote for UI/UX design.',
    page: 'Services',
    dateSubmitted: new Date('2025-07-05'),
  },
  {
    name: 'Robert Johnson',
    email: 'robert.j@startup.io',
    message: 'Looking for UI/UX design services for our mobile app.',
    page: 'Services',
    dateSubmitted: new Date('2025-07-10'),
  },
  {
    name: 'Lisa Brown',
    email: 'lisa.brown@enterprise.com',
    company: 'Enterprise Solutions',
    message: 'We require ongoing support for our existing application.',
    page: 'Support',
    dateSubmitted: new Date('2025-07-12'),
  },
  {
    name: 'Mark Davis',
    email: 'mark.davis@techfirm.com',
    message: 'Interested in custom software development.',
    page: 'Contact',
    dateSubmitted: new Date('2025-07-15'),
  },
  {
    name: 'Rachel Green',
    email: 'rachel.green@startup.com',
    company: 'Startup Inc',
    message: 'Need help with our product strategy and roadmap.',
    page: 'Consulting',
    dateSubmitted: new Date('2025-07-16'),
  },
  {
    name: 'Alex Turner',
    email: 'alex.turner@agency.io',
    message: 'We need a complete brand identity and website redesign.',
    page: 'Services',
    dateSubmitted: new Date('2025-07-17'),
  },
  {
    name: 'Sophie Miller',
    email: 'sophie.miller@corp.com',
    company: 'Corp Solutions',
    message: 'Looking for technical support and maintenance.',
    page: 'Support',
    dateSubmitted: new Date('2025-07-17'),
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Testimonial.deleteMany({});
    await Lead.deleteMany({});
    console.log('Cleared existing data');

    // Insert testimonials
    const testimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`Created ${testimonials.length} testimonials`);

    // Insert leads
    const leads = await Lead.insertMany(sampleLeads);
    console.log(`Created ${leads.length} leads`);

    console.log('Database seeding completed successfully!');
    
    // Log summary
    console.log('\n Summary:');
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Leads: ${leads.length}`);
    console.log(`- Total records: ${testimonials.length + leads.length}`);
    
  } catch (error) {
    console.error(' Error seeding database:',error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();