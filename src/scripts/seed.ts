// scripts/seed.ts
import mongoose from "mongoose";
import connectDB from "../lib/db";
import Testimonial, { ITestimonial } from "../lib/models/Testimonial";
import Project, { IProject } from "../lib/models/Project";
import CaseStudy, { ICaseStudy } from "../lib/models/CaseStudy";
import Lead, { ILead } from "../lib/models/Lead";

const sampleTestimonials: Partial<ITestimonial>[] = [
  {
    clientName: "Sarah Johnson",
    role: "CEO, Tech Solutions Inc.",
    quote:
      "The team delivered exceptional results that exceeded our expectations. Their attention to detail and professionalism is unmatched.",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b06e8f47?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    quote:
      "Working with this team was a game-changer for our project. They understood our vision and brought it to life perfectly.",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Emily Rodriguez",
    role: "Founder, StartupX",
    quote:
      "Their innovative approach and dedication to quality made all the difference. I highly recommend their services.",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "David Wilson",
    role: "CTO, Digital Dynamics",
    quote:
      "Outstanding technical expertise and project management. They delivered on time and within budget.",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Amanda Foster",
    role: "Marketing Director, GrowthCo",
    quote:
      "The creative solutions they provided helped us achieve our business goals faster than we anticipated.",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "James Thompson",
    role: "VP of Engineering, ScaleUp",
    quote:
      "Professional, reliable, and skilled. They became an integral part of our development process.",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const sampleLeads: Partial<ILead>[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Doe Enterprises",
    message: "Interested in web development services for my startup.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-01"),
  },
  {
    name: "Jane Smith",
    email: "jane.smith@company.com",
    company: "Smith Corp",
    message: "Requesting a quote for UI/UX design.",
    page: "Services",
    dateSubmitted: new Date("2025-07-05"),
  },
  {
    name: "Robert Johnson",
    email: "robert.j@startup.io",
    message: "Looking for UI/UX design services for our mobile app.",
    page: "Services",
    dateSubmitted: new Date("2025-07-10"),
  },
  {
    name: "Lisa Brown",
    email: "lisa.brown@enterprise.com",
    company: "Enterprise Solutions",
    message: "We require ongoing support for our existing application.",
    page: "Support",
    dateSubmitted: new Date("2025-07-12"),
  },
  {
    name: "Mark Davis",
    email: "mark.davis@techfirm.com",
    message: "Interested in custom software development.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-15"),
  },
  {
    name: "Rachel Green",
    email: "rachel.green@startup.com",
    company: "Startup Inc",
    message: "Need help with our product strategy and roadmap.",
    page: "Consulting",
    dateSubmitted: new Date("2025-07-16"),
  },
  {
    name: "Alex Turner",
    email: "alex.turner@agency.io",
    message: "We need a complete brand identity and website redesign.",
    page: "Services",
    dateSubmitted: new Date("2025-07-17"),
  },
  {
    name: "Sophie Miller",
    email: "sophie.miller@corp.com",
    company: "Corp Solutions",
    message: "Looking for technical support and maintenance.",
    page: "Support",
    dateSubmitted: new Date("2025-07-17"),
  },
];

const projects: Partial<IProject>[] = [
  {
    title: "E-Commerce Platform Revamp",
    summary: "Redesigned an e-commerce platform to improve UX and conversions.",
    tags: ["ecommerce", "ux", "web"],
    date: new Date("2024-06-15"),
    persona: "Online Retail Manager",
    service: "Web Development",
    industry: "Retail",
    metrics: {
      revenueImpact: 250000,
      timeSaved: "20% faster checkout",
      otherKPI: "15% increase in user retention",
    },
    testimonials: [
      {
        author: "Jane Doe",
        role: "CEO",
        quote: "The new platform doubled our conversions!",
      },
    ],
    videoUrl: "https://www.loom.com/share/ecommerce-demo",
    linkedInPostUrl: "https://www.linkedin.com/posts/ecommerce-revamp",
    mediumPostUrl: "https://medium.com/ecommerce-case-study",
  },
  {
    title: "SaaS Dashboard Optimization",
    summary: "Optimized a SaaS dashboard for better user engagement.",
    tags: ["saas", "ui", "dashboard"],
    date: new Date("2024-09-10"),
    persona: "Product Manager",
    service: "UI/UX Design",
    industry: "Technology",
    metrics: {
      revenueImpact: 150000,
      timeSaved: "30% reduction in onboarding time",
      otherKPI: "10% increase in user satisfaction",
    },
    testimonials: [
      {
        author: "John Smith",
        role: "CTO",
        quote: "The dashboard is now intuitive and fast!",
      },
    ],
    videoUrl: "https://www.loom.com/share/saas-demo",
    linkedInPostUrl: "https://www.linkedin.com/posts/saas-optimization",
    mediumPostUrl: "https://medium.com/saas-case-study",
  },
  {
    title: 'AI-Powered Support Dashboard',
    summary: 'Built a real-time internal OS for support teams with integrated AI workflows.',
    tags: ['AI', 'Internal Tools', 'Next.js'],
    date: new Date('2024-04-15'),
    persona: 'Ops Leader',
    service: 'Internal OS',
    industry: 'Customer Support',
    metrics: {
      revenueImpact: 15000,
      timeSaved: '20 hrs/month',
      otherKPI: 'NPS +20%',
    },
    testimonials: [
      {
        author: 'Sarah Lane',
        role: 'Head of Support Ops',
        quote: 'We launched in 10 days and saved weeks of manual work. Delpat nailed it!',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/support-demo.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/support-case-study',
    mediumPostUrl: 'https://medium.com/@delpat/support-os-launch',
    caseStudyIds: [], // to be filled after inserting CaseStudy
  },
  {
    title: 'StartupForge MVP Platform',
    summary: 'MVP delivery platform built for an early-stage startup to validate their product.',
    tags: ['MVP', 'Startups', 'Next.js', 'MongoDB'],
    date: new Date('2023-11-10'),
    persona: 'Founder',
    service: 'MVP Engine',
    industry: 'Tech Startups',
    metrics: {
      revenueImpact: 30000,
      timeSaved: '1 month',
      otherKPI: 'Pilot user growth x3',
    },
    testimonials: [
      {
        author: 'Ravi Mehta',
        role: 'Founder, StartupForge',
        quote: 'Best decision we made early on. Launched in weeks, validated fast.',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/startup-mvp.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/mvp-startup-forge',
    mediumPostUrl: 'https://medium.com/@delpat/startup-forge-case-study',
    caseStudyIds: [], // to be linked post-creation
  },
];

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Connect to database
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Lead.deleteMany({});
    await CaseStudy.deleteMany({});

    console.log("Cleared existing data");

    // Insert Projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Created ${insertedProjects.length} projects`);

    // Insert testimonials
    const testimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`Created ${testimonials.length} testimonials`);

    // Insert leads
    const leads = await Lead.insertMany(sampleLeads);
    console.log(`Created ${leads.length} leads`);

    const caseStudies: Partial<ICaseStudy>[] = [
      {
        title: "ShopEasy Checkout Optimization",
        summary: "Streamlined checkout process for ShopEasy Inc.",
        projectId: insertedProjects[0]._id,
        challenge: "High cart abandonment rates due to complex checkout.",
        solution:
          "Simplified UI, added one-click checkout, and optimized performance.",
        results: "Reduced abandonment by 25% and increased conversions by 20%.",
        founderVerified: true,
        videoTestimonialUrl: "https://www.loom.com/share/shopeasy-testimonial",
      },
      {
        title: "TechTrend User Onboarding",
        summary: "Improved onboarding for TechTrend’s SaaS platform.",
        projectId: insertedProjects[1]._id,
        challenge: "Users found onboarding confusing and time-consuming.",
        solution: "Redesigned onboarding flow with guided tutorials.",
        results:
          "Cut onboarding time by 30% and boosted user retention by 15%.",
        founderVerified: true,
        videoTestimonialUrl: "https://www.loom.com/share/techtrend-testimonial",
      },
      {
        title: "AI Dashboard for Support Ops",
        summary: "Streamlined workflows and increased NPS by 20%.",
        projectId: insertedProjects[2]._id,
        challenge: "Manual support escalations and poor visibility.",
        solution:
          "Built a dashboard integrated with internal CRM and OpenAI API.",
        results:
          "Increased team productivity by 30%. Reduced manual escalations by 40%.",
        founderVerified: true,
        videoTestimonialUrl: "https://videos.delpat.ai/testimonials/sarah.mp4",
      },
      {
        title: "Rapid MVP Launch for StartupForge",
        summary: "From idea to pilot-ready MVP in 21 days.",
        projectId: insertedProjects[3]._id,
        challenge: "Needed to test core functionality with early users fast.",
        solution: "Scoped lean MVP, built iteratively with feedback loops.",
        results: "Grew pilot list from 20 to 100 users. Secured angel round.",
        founderVerified: true,
        videoTestimonialUrl: "https://videos.delpat.ai/testimonials/ravi.mp4",
      },
    ];
    // Insert Case Studies
    const insertedCaseStudies = await CaseStudy.insertMany(caseStudies);
    console.log(`Created ${insertedCaseStudies.length} case studies`);

    // Update Projects with Case Study IDs
    await Project.updateOne(
      { _id: insertedProjects[0]._id },
      { $set: { caseStudyIds: [insertedCaseStudies[0]._id] } }
    );
    await Project.updateOne(
      { _id: insertedProjects[1]._id },
      { $set: { caseStudyIds: [insertedCaseStudies[1]._id] } }
    );
    console.log("Linked case studies to projects");

    console.log("Database seeding completed successfully!");

    // Log summary
    console.log("\n Summary:");
    console.log(`- Projects: ${insertedProjects.length}`);
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Leads: ${leads.length}`);
    console.log(`- Case Studies: ${insertedCaseStudies.length}`);
    console.log(
      `- Total records: ${
        testimonials.length +
        leads.length +
        insertedProjects.length +
        insertedCaseStudies.length
      }`
    );
  } catch (error) {
    console.error(
      " Error seeding database:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
