// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import  connectDB  from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';

// GET /api/testimonials
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const testimonials = await Testimonial.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Testimonial.countDocuments();

    return NextResponse.json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch testimonials' 
      },
      { status: 500 }
    );
  }
}

// POST /api/testimonials
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { clientName, role, quote, photoUrl } = body;

    // Validation
    if (!clientName || !role || !quote) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Client name, role, and quote are required' 
        },
        { status: 400 }
      );
    }

    const testimonial = new Testimonial({
      clientName,
      role,
      quote,
      photoUrl
    });

    const savedTestimonial = await testimonial.save();

    return NextResponse.json({
      success: true,
      data: savedTestimonial,
      message: 'Testimonial created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create testimonial' 
      },
      { status: 500 }
    );
  }
}

// Sample data fallback (if database is not connected)
const sampleTestimonials = [
  {
    _id: '1',
    clientName: 'Sarah Johnson',
    role: 'CEO, Tech Solutions Inc.',
    quote: 'The team delivered exceptional results that exceeded our expectations. Their attention to detail and professionalism is unmatched.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b06e8f47?w=150&h=150&fit=crop&crop=face'
  },
  {
    _id: '2',
    clientName: 'Michael Chen',
    role: 'Product Manager, InnovateCorp',
    quote: 'Working with this team was a game-changer for our project. They understood our vision and brought it to life perfectly.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    _id: '3',
    clientName: 'Emily Rodriguez',
    role: 'Founder, StartupX',
    quote: 'Their innovative approach and dedication to quality made all the difference. I highly recommend their services.',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];