import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/api';

// GET handler
export async function GET() {
  try {
    const trackingData = await DatabaseService.getLandingTrackings();
    return NextResponse.json(trackingData, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error fetching landing tracking data:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to fetch landing tracking data', error: errorMessage },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { utm, name, type, amountOfLanding, landingEvents } = await req.json();

    if (!name || !type) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
          details: 'name and type are required',
        },
        { status: 400 }
      );
    }

    const trackingRecord = await DatabaseService.createLandingTracking({
      utm,
      name,
      type,
      amountOfLanding,
      landingEvents,
    });

    return NextResponse.json(trackingRecord, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error creating landing tracking record:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to create landing tracking record', error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(req: NextRequest) {
  try {
    const { id, utm, name, type, amountOfLanding, landingEvents, landingEvent } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: 'Missing required field',
          details: 'id is required for update',
        },
        { status: 400 }
      );
    }

    const hasUpdateField =
      utm !== undefined ||
      name !== undefined ||
      type !== undefined ||
      amountOfLanding !== undefined ||
      landingEvents !== undefined ||
      landingEvent !== undefined;

    if (!hasUpdateField) {
      return NextResponse.json(
        {
          message: 'No update fields provided',
          details:
            'Provide at least one field: utm, name, type, amountOfLanding, landingEvents, or landingEvent',
        },
        { status: 400 }
      );
    }

    const updatedRecord = await DatabaseService.updateLandingTracking(id, {
      utm,
      name,
      type,
      amountOfLanding,
      landingEvents,
      landingEvent,
    });

    if (!updatedRecord) {
      return NextResponse.json(
        { message: 'Landing tracking record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRecord, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error updating landing tracking record:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to update landing tracking record', error: errorMessage },
      { status: 500 }
    );
  }
}
