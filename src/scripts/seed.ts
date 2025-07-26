// scripts/seed.ts
import mongoose from "mongoose";
import connectDB from "../lib/db";
import Testimonial, { ITestimonial } from "../lib/models/Testimonial";
import Project, { IProject } from "../lib/models/Project";
import CaseStudy, { ICaseStudy } from "../lib/models/CaseStudy";
import Lead, { ILead } from "../lib/models/Lead";

const sampleTestimonials: Partial<ITestimonial>[] = [
  {
    clientName: "Sarah Chen",
    role: "CEO, TechFlow",
    quote: "Delpat delivered our MVP in 5 weeks when our internal team estimated 4 months. Game changer. We shipped, they didn't ghost.",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b06e8f47?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Mike Rodriguez",
    role: "Founder, HealthTrack",
    quote: "We went from idea to 10K users in just 8 weeks. The MVP they built became the foundation for our ₹2M funding round.",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Priya Sharma",
    role: "Operations Lead, GrowthCo",
    quote: "Our internal dashboard went from chaos to clarity in 3 weeks. ROI was immediate - we saved 20+ hours per week.",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Ravi Mehta",
    role: "Founder, StartupForge",
    quote: "Best decision we made early on. Launched in weeks, validated fast. They think like founders, not just developers.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Sarah Lane",
    role: "Head of Support Ops, SupportFlow",
    quote: "We launched in 10 days and saved weeks of manual work. Delpat nailed it - fixed scope, fixed timeline, zero surprises.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    clientName: "Alex Johnson",
    role: "CTO, ScaleUp",
    quote: "Finally, developers who understand business outcomes. They built exactly what we needed, not what we asked for.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const sampleLeads: Partial<ILead>[] = [
  {
    name: "John Doe",
    email: "john.doe@startup.io",
    company: "StartupForge",
    message: "Need an MVP built in 6 weeks for investor demo. Have validated idea and small budget.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-01"),
  },
  {
    name: "Jane Smith",
    email: "jane.smith@ops.co",
    company: "OpsFlow",
    message: "Our 5-person team spends 3 hours daily on manual data entry. Need automation solution.",
    page: "Services",
    dateSubmitted: new Date("2025-07-05"),
  },
  {
    name: "Robert Johnson",
    email: "robert.j@agency.io",
    message: "Need professional client-facing dashboard for our agency. Must reflect our brand quality.",
    page: "Services",
    dateSubmitted: new Date("2025-07-10"),
  },
  {
    name: "Lisa Brown",
    email: "lisa.brown@healthtech.com",
    company: "HealthTech Solutions",
    message: "HIPAA-compliant patient management system needed. Timeline critical for compliance.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-12"),
  },
  {
    name: "Mark Davis",
    email: "mark.davis@ecommerce.com",
    message: "Marketplace MVP needed to validate concept. Budget ₹40k, timeline 6 weeks.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-15"),
  },
  {
    name: "Rachel Green",
    email: "rachel.green@saas.io",
    company: "SaaS Startup",
    message: "Internal dashboard for sales team. Need to eliminate manual reporting processes.",
    page: "Services",
    dateSubmitted: new Date("2025-07-16"),
  },
  {
    name: "Alex Turner",
    email: "alex.turner@automation.co",
    message: "AI workflow automation for data processing. Save ₹5k monthly in operational costs.",
    page: "Services",
    dateSubmitted: new Date("2025-07-17"),
  },
  {
    name: "Sophie Miller",
    email: "sophie.miller@founder.io",
    company: "Founder Studio",
    message: "Quick MVP to test idea with 100 users. Need validation before raising funds.",
    page: "Contact",
    dateSubmitted: new Date("2025-07-17"),
  },
];

const projects: Partial<IProject>[] = [
  {
    title: "Revenue Dashboard for TechFlow",
    summary: "Real-time analytics platform that increased decision-making speed by 300% and tracked ₹2M+ in revenue.",
    tags: ["internal-tools", "dashboard", "analytics", "saas"],
    date: new Date("2024-06-15"),
    persona: "Founders",
    service: "Internal OS",
    industry: "SaaS",
    metrics: {
      revenueImpact: 2000000,
      timeSaved: "300% faster decisions",
      otherKPI: "15+ integrations",
    },
    testimonials: [
      {
        author: "Sarah Chen",
        role: "CEO, TechFlow",
        quote: "This dashboard changed how we run our business. We can see everything in real-time.",
      },
    ],
    videoUrl: "https://videos.delpat.ai/techflow-demo.mp4",
    linkedInPostUrl: "https://linkedin.com/posts/delpat/techflow-revenue-dashboard",
    mediumPostUrl: "https://medium.com/@delpat/techflow-case-study",
  },
  {
    title: "E-commerce Automation for ShopEasy",
    summary: "Inventory management system that reduced manual work by 80% and eliminated ₹5k monthly in errors.",
    tags: ["automation", "ecommerce", "inventory", "workflow"],
    date: new Date("2024-09-10"),
    persona: "Ops Leaders",
    service: "Automation MVP",
    industry: "E-commerce",
    metrics: {
      revenueImpact: 60000,
      timeSaved: "80% less manual work",
      otherKPI: "99.9% accuracy",
    },
    testimonials: [
      {
        author: "Mike Rodriguez",
        role: "Operations Director, ShopEasy",
        quote: "We saved 20 hours per week and eliminated costly human errors.",
      },
    ],
    videoUrl: "https://videos.delpat.ai/shopeasy-automation.mp4",
    linkedInPostUrl: "https://linkedin.com/posts/delpat/shopeasy-automation",
    mediumPostUrl: "https://medium.com/@delpat/shopeasy-case-study",
  },
  {
    title: 'HealthTrack MVP Platform',
    summary: 'Patient monitoring app that reached 10K users in first month and secured ₹2M funding.',
    tags: ['mvp', 'healthtech', 'mobile', 'validation'],
    date: new Date('2024-04-15'),
    persona: 'Founders',
    service: 'MVP Engine',
    industry: 'Health-tech',
    metrics: {
      revenueImpact: 2000000,
      timeSaved: "8 weeks to launch",
      otherKPI: "10K users month 1",
    },
    testimonials: [
      {
        author: 'Mike Rodriguez',
        role: 'Founder, HealthTrack',
        quote: 'The MVP validated our entire business model. We raised ₹2M based on these results.',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/healthtrack-mvp.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/healthtrack-mvp',
    mediumPostUrl: 'https://medium.com/@delpat/healthtrack-case-study',
  },
  {
    title: 'Agency CRM for CreativeFlow',
    summary: 'Client management platform that improved team productivity by 200% and serves 50+ agencies.',
    tags: ['internal-tools', 'crm', 'agency', 'productivity'],
    date: new Date('2023-11-10'),
    persona: 'Agencies',
    service: 'Internal OS',
    industry: 'SaaS',
    metrics: {
      revenueImpact: 500000,
      timeSaved: "200% productivity boost",
      otherKPI: "50+ agencies using",
    },
    testimonials: [
      {
        author: 'Alex Johnson',
        role: 'CTO, CreativeFlow',
        quote: 'Our team is 2x more productive. This tool pays for itself every month.',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/creativeflow-crm.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/creativeflow-crm',
    mediumPostUrl: 'https://medium.com/@delpat/creativeflow-case-study',
  },
  {
    title: 'Medical Records System for HealthCare Plus',
    summary: 'HIPAA-compliant platform serving 5,000+ patients with 40% faster workflows.',
    tags: ['internal-tools', 'healthcare', 'hipaa', 'compliance'],
    date: new Date('2024-02-20'),
    persona: 'Ops Leaders',
    service: 'Internal OS',
    industry: 'Health-tech',
    metrics: {
      revenueImpact: 300000,
      timeSaved: "40% faster workflows",
      otherKPI: "5,000+ patients",
    },
    testimonials: [
      {
        author: 'Dr. Sarah Lane',
        role: 'Medical Practice Manager, HealthCare Plus',
        quote: 'Patient data is now secure and accessible. Our workflows are 40% faster.',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/healthcare-records.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/healthcare-records',
    mediumPostUrl: 'https://medium.com/@delpat/healthcare-case-study',
  },
  {
    title: 'Marketplace MVP for TradeHub',
    summary: 'E-commerce marketplace that generated ₹100K in first quarter with 500+ sellers.',
    tags: ['mvp', 'ecommerce', 'marketplace', 'validation'],
    date: new Date('2024-01-15'),
    persona: 'Founders',
    service: 'MVP Engine',
    industry: 'E-commerce',
    metrics: {
      revenueImpact: 100000,
      timeSaved: "9 weeks to launch",
      otherKPI: "500+ sellers",
    },
    testimonials: [
      {
        author: 'Ravi Mehta',
        role: 'Founder, TradeHub',
        quote: 'We hit ₹100K revenue in Q1. The platform scales beautifully.',
      },
    ],
    videoUrl: 'https://videos.delpat.ai/tradehub-marketplace.mp4',
    linkedInPostUrl: 'https://linkedin.com/posts/delpat/tradehub-marketplace',
    mediumPostUrl: 'https://medium.com/@delpat/tradehub-case-study',
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
        title: "Revenue Dashboard for TechFlow",
        summary: "Real-time analytics platform that increased decision-making speed by 300%.",
        projectId: insertedProjects[0]._id,
        challenge: "Manual reporting processes taking 3+ hours daily, delayed decision-making.",
        solution: "Built real-time dashboard with 15+ integrations and automated reporting.",
        results: "300% faster decisions, tracked ₹2M+ revenue, eliminated manual work.",
        founderVerified: true,
        videoTestimonialUrl: "https://videos.delpat.ai/testimonials/sarah-chen.mp4",
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
        title: "HealthTrack MVP Platform",
        summary: "Patient monitoring app that reached 10K users in first month.",
        projectId: insertedProjects[2]._id,
        challenge: "Needed to validate healthtech concept with real users quickly.",
        solution: "Built MVP with core monitoring features and user feedback loops.",
        results: "10K users month 1, secured ₹2M funding, validated business model.",
        founderVerified: true,
        videoTestimonialUrl: "https://videos.delpat.ai/testimonials/mike-healthtrack.mp4",
      },
      {
        title: "Agency CRM for CreativeFlow",
        summary: "Client management platform that improved team productivity by 200%.",
        projectId: insertedProjects[3]._id,
        challenge: "Manual client management processes slowing down 50+ agencies.",
        solution: "Built centralized CRM with automated workflows and reporting.",
        results: "200% productivity boost, 50+ agencies using, 99% uptime.",
        founderVerified: true,
        videoTestimonialUrl: "https://videos.delpat.ai/testimonials/alex-johnson.mp4",
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