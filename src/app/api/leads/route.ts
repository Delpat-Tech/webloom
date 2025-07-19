import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Lead from '@/lib/models/Lead';

// GET handler
export async function GET() {
  await connectDB();
  const leads = await Lead.find({});
  return NextResponse.json(leads, { status: 200 });
}

// POST handler
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { name, email, company, message, page } = await req.json();

    if (!name || !email || !page) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, or page' },
        { status: 400 }
      );
    }

    const lead = await Lead.create({
      name,
      email,
      company,
      message,
      page,
      dateSubmitted: new Date(),
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to create lead', error: err },
      { status: 500 }
    );
  }
}