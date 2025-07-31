import { NextResponse, NextRequest } from 'next/server';

// Service categories data
const serviceCategories = [
  {
    id: 'mvp-engine',
    title: 'MVP Engine',
    subtitle: 'Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams.',
    description: 'Go from idea to live product in 6 weeks. Fixed timeline, fixed cost, zero surprises.',
    startingPrice: '₹40,000',
    timeline: '6 weeks',
    outcome: 'A fully functional MVP ready for real users and investor demos',
    slug: 'mvp-engine'
  },
  {
    id: 'internal-os',
    title: 'Internal OS',
    subtitle: 'Core systems, dashboards, and digital infrastructure for operations and scalability.',
    description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
    startingPrice: '₹20,000',
    timeline: '4-5 weeks',
    outcome: 'Streamlined operations saving 20+ hours weekly',
    slug: 'internal-os'
  },
  {
    id: 'automation-hub',
    title: 'Automation Hub',
    subtitle: 'Workflow automation, integrations, and process optimization for scaling businesses.',
    description: 'Automate repetitive tasks, integrate systems, and scale operations without adding headcount.',
    startingPrice: '₹15,000',
    timeline: '3-4 weeks',
    outcome: 'Automated workflows saving time and reducing errors',
    slug: 'automation-hub'
  }
];

// GET: Fetch all services
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Return specific service
      const service = serviceCategories.find(s => s.id === id);
      if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json(service, { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      });
    }
    
    // Return all services
    return NextResponse.json(serviceCategories, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching services:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
} 