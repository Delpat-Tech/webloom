import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const testimonials = await Testimonial.find({});
    res.status(200).json(testimonials);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


// app/api/leads/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Lead from '@/lib/models/Lead';

// // GET /api/leads
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const limit = parseInt(searchParams.get('limit') || '10');
//     const page = parseInt(searchParams.get('page') || '1');
//     const status = searchParams.get('status');
//     const source = searchParams.get('source');
//     const skip = (page - 1) * limit;

//     // Build query
//     const query: any = {};
//     if (status) query.status = status;
//     if (source) query.source = source;

//     const leads = await Lead.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Lead.countDocuments(query);

//     return NextResponse.json({
//       success: true,
//       data: leads,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//         hasMore: page * limit < total
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching leads:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to fetch leads' 
//       },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/leads
// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const body = await request.json();
//     const { name, email, phone, message, service, source } = body;

//     // Validation
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'Name, email, and message are required' 
//         },
//         { status: 400 }
//       );
//     }

//     // Check for duplicate email
//     const existingLead = await Lead.findOne({ email });
//     if (existingLead) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'A lead with this email already exists' 
//         },
//         { status: 409 }
//       );
//     }

//     const lead = new Lead({
//       name,
//       email,
//       phone,
//       message,
//       service,
//       source: source || 'website'
//     });

//     const savedLead = await lead.save();

//     return NextResponse.json({
//       success: true,
//       data: savedLead,
//       message: 'Lead created successfully'
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating lead:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to create lead' 
//       },
//       { status: 500 }
//     );
//   }
// }

// // Sample data fallback (if database is not connected)
// const sampleLeads = [
//   {
//     _id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '+1 (555) 123-4567',
//     message: 'I am interested in your web development services for my startup.',
//     service: 'development',
//     status: 'new',
//     source: 'website',
//     createdAt: new Date('2024-01-15T10:30:00Z'),
//     updatedAt: new Date('2024-01-15T10:30:00Z')
//   },
//   {
//     _id: '2',
//     name: 'Jane Smith',
//     email: 'jane.smith@company.com',
//     phone: '+1 (555) 987-6543',
//     message: 'We need consulting services for our digital transformation project.',
//     service: 'consulting',
//     status: 'contacted',
//     source: 'referral',
//     createdAt: new Date('2024-01-14T14:15:00Z'),
//     updatedAt: new Date('2024-01-14T16:20:00Z')
//   },
//   {
//     _id: '3',
//     name: 'Robert Johnson',
//     email: 'robert.j@startup.io',
//     phone: '+1 (555) 456-7890',
//     message: 'Looking for UI/UX design services for our mobile app.',
//     service: 'design',
//     status: 'qualified',
//     source: 'social',
//     createdAt: new Date('2024-01-13T09:45:00Z'),
//     updatedAt: new Date('2024-01-13T11:30:00Z')
//   },
//   {
//     _id: '4',
//     name: 'Lisa Brown',
//     email: 'lisa.brown@enterprise.com',
//     message: 'We require ongoing support for our existing application.',
//     service: 'support',
//     status: 'converted',
//     source: 'website',
//     createdAt: new Date('2024-01-12T13:20:00Z'),
//     updatedAt: new Date('2024-01-12T15:45:00Z')
//   }
// ];