// .next/types/app/api/projects/[id]/route.ts (This file is generated, you don't edit it directly)
// You need to fix the source file `src/app/api/projects/[id]/route.ts`
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import CaseStudy from '@/lib/models/CaseStudy';

// Ensure models are registered, ideally once globally or robustly here.
// Adding checks prevents re-registration errors during hot-reloads in development.
if (!mongoose.models.Project) {``
  mongoose.model('Project', Project.schema);
}
if (!mongoose.models.CaseStudy) {
  mongoose.model('CaseStudy', CaseStudy.schema);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    console.log('Database connected');

    const { id } = await params;
    const project = await Project.findById(id).populate('caseStudyIds').lean();
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(project, {  status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching project:', errorMessage);
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}