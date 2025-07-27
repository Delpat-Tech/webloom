import { NextResponse, NextRequest } from 'next/server';
import { DatabaseService } from '@/lib/api';
import { IProject } from '@/lib/models/Project';

// GET: Fetch all projects with optional filtering
export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const persona = searchParams.get('persona');
    const service = searchParams.get('service');
    const industry = searchParams.get('industry');

    // Build filter object
    const filters: { persona?: string; service?: string; industry?: string } = {};
    if (persona) filters.persona = persona;
    if (service) filters.service = service;
    if (industry) filters.industry = industry;

    // Fetch filtered projects using the database service
    const projects = await DatabaseService.getProjects(filters);
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

    // Validate body fields
    const { title, summary, tags, date, persona, service, industry, metrics, testimonials, videoUrl, linkedInPostUrl, mediumPostUrl } = body as Partial<IProject>;

    if (!title || !summary || !tags || !Array.isArray(tags) || !date) {
      return NextResponse.json({ error: 'Missing or invalid required fields: title, summary, tags, date' }, { status: 400 });
    }

    // Validate date format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Create project using the database service
    const project = await DatabaseService.createProject({
      title,
      summary,
      tags,
      date: parsedDate,
      persona,
      service,
      industry,
      metrics,
      testimonials,
      videoUrl,
      linkedInPostUrl,
      mediumPostUrl,
    });

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