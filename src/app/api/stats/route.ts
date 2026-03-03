import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || undefined;

    const stats = await DatabaseService.getStats(page);

    return NextResponse.json(stats, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching stats:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
