import { NextResponse } from 'next/server';
   import connectDB from '../../../lib/db';
   import Project, { IProject } from '../../../lib/models/Project';

   export async function GET() {
     try {
       await connectDB();
       console.log('Database connected');
       const projectCount = await Project.countDocuments();
       if (projectCount === 0) {
         const sampleProjects: Partial<IProject>[] = [
           {
             title: 'E-Commerce Platform',
             summary: 'Developed a scalable e-commerce platform with payment integration.',
             tags: ['Web Development', 'React', 'Node.js'],
             date: new Date('2024-01-15'),
           },
           {
             title: 'Portfolio Website',
             summary: 'Designed a modern portfolio website for a client using Next.js.',
             tags: ['Next.js', 'TypeScript', 'MongoDB'],
             date: new Date('2024-06-20'),
           },
           {
             title: 'Task Management App',
             summary: 'Built a task management application with real-time updates.',
             tags: ['React', 'Firebase', 'TypeScript'],
             date: new Date('2023-11-10'),
           },
         ];
         await Project.insertMany(sampleProjects);
         console.log('Sample projects seeded');
       }
       const projects = await Project.find().lean();
       return NextResponse.json(projects);
     } catch (error) {
       console.error('Error fetching projects:', error);
       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
     }
   }

   export async function POST(request: Request) {
     try {
       // Check Content-Type
       const contentType = request.headers.get('content-type');
       if (!contentType || !contentType.includes('application/json')) {
         return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
       }

       // Parse JSON safely
       let body;
       try {
         body = await request.json();
       } catch (error) {
         console.error('Invalid JSON:', error);
         return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
       }

       const { title, summary, tags, date } = body;
       if (!title || !summary || !tags || !date) {
         return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
       }

       await connectDB();
       console.log('Database connected');

       const project = new Project({
         title,
         summary,
         tags,
         date: new Date(date),
       });

       await project.save();
       return NextResponse.json(project, { status: 201 });
     } catch (error) {
       console.error('Error creating project:', error);
       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
     }
   }