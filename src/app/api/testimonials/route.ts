import { NextResponse, NextRequest } from 'next/server';
import { DatabaseService } from '@/lib/api';

export async function GET() {
  try {
    const testimonials = await DatabaseService.getTestimonials();
    return NextResponse.json(testimonials, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching testimonials', error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key');
    console.log('Received API Key:', apiKey);
    console.log('Expected API Key:', process.env.ADMIN_API_KEY);

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { clientName, role, quote, photoUrl } = await req.json();

    if (!clientName || !role || !quote) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create testimonial using the database service
    const newTestimonial = await DatabaseService.createTestimonial({
      clientName,
      role,
      quote,
      photoUrl,
    });

    return NextResponse.json(newTestimonial, { 
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating testimonial', error }, { status: 500 });
  }
}