import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/api';
import { osRequest } from '@/lib/os-client';

interface OSMetricsResponse {
  ok: boolean;
  metrics: {
    projects_shipped: number;
    active_projects:  number;
    total_clients:    number;
    active_clients:   number;
    pipeline_wins:    number;
    team_size:        number;
  };
  cached_at: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || undefined;

    // Run DB stats and OS metrics fetch in parallel.
    // Promise.allSettled ensures a Delpat OS outage never breaks Webloom's own stats API.
    const [dbResult, osResult] = await Promise.allSettled([
      DatabaseService.getStats(page),
      osRequest<OSMetricsResponse>('GET', '/api/metrics'),
    ]);

    const dbStats   = dbResult.status === 'fulfilled' ? dbResult.value  : [];
    const osMetrics = osResult.status === 'fulfilled' ? osResult.value?.metrics ?? null : null;
    const cachedAt  = osResult.status === 'fulfilled' ? osResult.value?.cached_at ?? null : null;

    return NextResponse.json(
      { dbStats, osMetrics, cachedAt },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching stats:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
