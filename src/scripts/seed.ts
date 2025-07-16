// scripts/seed.ts
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
    phone: '+1 (555) 123-4567',
    message: 'I am interested in your web development services for my startup. We need a modern, responsive website with e-commerce capabilities.',
    service: 'development',
    status: 'new',
    source: 'website'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    message: 'We need consulting services for our digital transformation project. Looking for expertise in cloud migration and process optimization.',
    service: 'consulting',
    status: 'contacted',
    source: 'referral'
  },
  {
    name: 'Robert Johnson',
    email: 'robert.j@startup.io',
    phone: '+1 (555) 456-7890',
    message: 'Looking for UI/UX design services for our mobile app. We have wireframes ready and need professional design work.',
    service: 'design',
    status: 'qualified',
    source: 'social'
  },
  {
    name: 'Lisa Brown',
    email: 'lisa.brown@enterprise.com',
    message: 'We require ongoing support for our existing application. Need maintenance, updates, and bug fixes.',
    service: 'support',
    status: 'converted',
    source: 'website'
  },
  {
    name: 'Mark Davis',
    email: 'mark.davis@techfirm.com',
    phone: '+1 (555) 234-5678',
    message: 'Interested in custom software development. We need a CRM system built from scratch.',
    service: 'development',
    status: 'new',
    source: 'website'
  },
  {
    name: 'Rachel Green',
    email: 'rachel.green@startup.com',
    phone: '+1 (555) 345-6789',
    message: 'Need help with our product strategy and roadmap. Looking for experienced consultants.',
    service: 'consulting',
    status: 'contacted',
    source: 'referral'
  },
  {
    name: 'Alex Turner',
    email: 'alex.turner@agency.io',
    phone: '+1 (555) 567-8901',
    message: 'We need a complete brand identity and website redesign for our creative agency.',
    service: 'design',
    status: 'qualified',
    source: 'social'
  },
  {
    name: 'Sophie Miller',
    email: 'sophie.miller@corp.com',
    message: 'Looking for technical support and maintenance for our enterprise applications.',
    service: 'support',
    status: 'new',
    source: 'website'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Testimonial.deleteMany({});
    await Lead.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert testimonials
    const testimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`📝 Created ${testimonials.length} testimonials`);

    // Insert leads
    const leads = await Lead.insertMany(sampleLeads);
    console.log(`👥 Created ${leads.length} leads`);

    console.log('🎉 Database seeding completed successfully!');
    
    // Log summary
    console.log('\n📊 Summary:');
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Leads: ${leads.length}`);
    console.log(`- Total records: ${testimonials.length + leads.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();