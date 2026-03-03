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
    const { utm, name, type, amountOfLanding, landingEvents, landing_page_url } = await req.json();

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

    // Flow 2: Forward visit to Delpat OS (fire-and-forget — never blocks response)
    const osUrl = process.env.DELPAT_OS_URL;
    const ingestKey = process.env.DELPAT_OS_INGEST_KEY;
    if (osUrl && ingestKey) {
      fetch(`${osUrl}/api/public/visit-ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-delpat-ingest-key': ingestKey,
        },
        body: JSON.stringify({
          utm_source: utm?.utm_source,
          utm_medium: utm?.utm_medium,
          utm_campaign: utm?.utm_campaign,
          utm_content: utm?.utm_content,
          utm_term: utm?.utm_term,
          session_id: landingEvents?.[0]?.id,
          visited_at: landingEvents?.[0]?.time ?? new Date().toISOString(),
          landing_page_url,
        }),
      }).catch((err) => {
        console.error('OS visit-ingest failed (non-critical):', err instanceof Error ? err.message : err);
      });
    }

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
