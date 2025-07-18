import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import CaseStudy from '@/lib/models/CaseStudy';

// Explicitly register models to ensure Mongoose recognizes them
mongoose.model('Project', Project.schema);
mongoose.model('CaseStudy', CaseStudy.schema);


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    console.log('Database connected');

    const project = await Project.findById(params.id).populate('caseStudyIds').lean();
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching project:', errorMessage);
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}