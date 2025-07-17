import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Project, { IProject } from '../../../lib/models/Project';

// Define filter type for MongoDB query
interface Filter {
  persona?: { $regex: string; $options: string };
  service?: { $regex: string; $options: string };
  industry?: { $regex: string; $options: string };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    console.log('Database connected');

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const persona = searchParams.get('persona');
    const service = searchParams.get('service');
    const industry = searchParams.get('industry');

    // Build filter object
    const filter: Filter = {};
    if (persona) filter.persona = { $regex: persona, $options: 'i' };
    if (service) filter.service = { $regex: service, $options: 'i' };
    if (industry) filter.industry = { $regex: industry, $options: 'i' };

    // Seed sample projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const sampleProjects: Partial<IProject>[] = [
        {
          title: 'E-Commerce Platform',
          summary: 'Developed a scalable e-commerce platform with payment integration.',
          tags: ['Web Development', 'React', 'Node.js'],
          date: new Date('2024-01-15'),
          persona: 'Developer',
          service: 'Web Development',
          industry: 'E-Commerce',
        },
        {
          title: 'Portfolio Website',
          summary: 'Designed a modern portfolio website for a client using Next.js.',
          tags: ['Next.js', 'TypeScript', 'MongoDB'],
          date: new Date('2024-06-20'),
          persona: 'Designer',
          service: 'UI/UX Design',
          industry: 'Personal Branding',
        },
        {
          title: 'Task Management App',
          summary: 'Built a task management application with real-time updates.',
          tags: ['React', 'Firebase', 'TypeScript'],
          date: new Date('2023-11-10'),
          persona: 'Project Manager',
          service: 'App Development',
          industry: 'Productivity',
        },
      ];
      await Project.insertMany(sampleProjects);
      console.log('Sample projects seeded');
    }

    // Fetch filtered projects
    const projects = await Project.find(filter).lean();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    // Handle unknown error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching projects:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Invalid JSON:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    // Validate body fields
    const { title, summary, tags, date, persona, service, industry } = body as {
      title?: string;
      summary?: string;
      tags?: string[];
      date?: string;
      persona?: string;
      service?: string;
      industry?: string;
    };

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