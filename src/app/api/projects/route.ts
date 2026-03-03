import { NextResponse, NextRequest } from 'next/server';
import { DatabaseService } from '@/lib/api';
import { IPortfolioProject } from '@/lib/models/PortfolioProject';

// GET: Fetch all projects with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const persona = searchParams.get('persona');
    const serviceTrack = searchParams.get('serviceTrack');
    const featuredParam = searchParams.get('featured');
    const featured = featuredParam === null ? undefined : featuredParam === 'true';

    const filters: { persona?: string; serviceTrack?: string; featured?: boolean } = {};
    if (persona) filters.persona = persona;
    if (serviceTrack) filters.serviceTrack = serviceTrack;
    if (featured !== undefined) filters.featured = featured;

    const projects = await DatabaseService.getPortfolioProjects(filters);
    return NextResponse.json(projects, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching projects:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Invalid JSON:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const payload = body as Partial<IPortfolioProject>;

    if (!payload.id || !payload.cardTitle) {
      return NextResponse.json({ error: 'Missing required fields: id, cardTitle' }, { status: 400 });
    }

    if (!payload.client?.name || typeof payload.client.publiclyUsable !== 'boolean') {
      return NextResponse.json({ error: 'Missing required client fields: client.name, client.publiclyUsable' }, { status: 400 });
    }

    if (!payload.story?.problem) {
      return NextResponse.json({ error: 'Missing required field: story.problem' }, { status: 400 });
    }

    if (!payload.execution?.coreMandate || !payload.execution?.smartMoment || !Array.isArray(payload.execution?.features)) {
      return NextResponse.json({ error: 'Missing required execution fields: coreMandate, smartMoment, features[]' }, { status: 400 });
    }

    if (!payload.outcome?.headlineMetric?.value || !payload.outcome?.headlineMetric?.label || !payload.outcome?.headlineMetric?.icon || !Array.isArray(payload.outcome?.qualitativeWins)) {
      return NextResponse.json({ error: 'Missing required outcome fields: headlineMetric.{value,label,icon}, qualitativeWins[]' }, { status: 400 });
    }

    if (!payload.meta?.persona || !payload.meta?.serviceTrack || typeof payload.meta?.featured !== 'boolean' || !payload.meta?.links?.caseStudy) {
      return NextResponse.json({ error: 'Missing required meta fields: persona, serviceTrack, featured, links.caseStudy' }, { status: 400 });
    }

    const project = await DatabaseService.createPortfolioProject(payload);

    return NextResponse.json(project, { 
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating project:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}