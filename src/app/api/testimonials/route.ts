import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({});
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching testimonials', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key');
    console.log('Received API Key:', apiKey);
    console.log('Expected API Key:', process.env.ADMIN_API_KEY);

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { clientName, role, quote, photoUrl } = await request.json();

    if (!clientName || !role || !quote) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const newTestimonial = await Testimonial.create({
      clientName,
      role,
      quote,
      photoUrl,
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating testimonial', error }, { status: 500 });
  }
}
// Note: Ensure that the Testimonial model is defined in src/lib/models/Testimonial.ts