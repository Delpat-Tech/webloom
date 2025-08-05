import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../lib/db';
import Project, { IProject } from '../../../lib/models/Project';
import CaseStudy from '../../../lib/models/CaseStudy';

// Register models to prevent "Schema hasn't been registered" error
if (!mongoose.models.Project) {
  mongoose.model('Project', Project.schema);
}
if (!mongoose.models.CaseStudy) {
  mongoose.model('CaseStudy', CaseStudy.schema);
}

// Define filter type for MongoDB query
interface Filter {
  persona?: { $regex: string; $options: string };
  service?: { $regex: string; $options: string };
  industry?: { $regex: string; $options: string };
}

// GET: Fetch all projects with optional filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    console.log('Database connected');

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const persona = searchParams.get('persona');
    const service = searchParams.get('service');
    const industry = searchParams.get('industry');

    // Build filter object
    const filter: Filter = {};
    if (persona) filter.persona = { $regex: persona, $options: 'i' };
    if (service) filter.service = { $regex: service, $options: 'i' };
    if (industry) filter.industry = { $regex: industry, $options: 'i' };

    // Fetch filtered projects with caseStudyIds populated
   const projects = await Project.find(filter).populate('caseStudyIds').lean();
    return NextResponse.json(projects, { status: 200 });
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

    await connectDB();
    console.log('Database connected');

    const project = new Project({
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

    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    // Handle unknown error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating project:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}