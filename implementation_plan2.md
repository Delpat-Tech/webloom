# Live Insights from Delpat OS → Webloom (Final Plan)

Pull real-time metrics (total projects, active clients, wins, team size) from Delpat OS using the **existing OAuth 2.0 connection** and display them as live animated counters on the Webloom public website.

---

## Confirmed State (from live DB query)

| What | Status |
|---|---|
| `DELPAT_OS_URL`, `DELPAT_OS_CLIENT_ID`, `DELPAT_OS_CLIENT_SECRET` | ✅ Set in Webloom `.env.local` |
| `osRequest()` in `os-client.ts` | ✅ Working — used by leads & visit ingest |
| Webloom client scopes in DB | ✅ **`read:projects`, `read:clients`, `read:dashboard`** (+ leads) |
| `/api/metrics` endpoint in Delpat OS | ❌ Does not exist yet — **needs to be created** |
| `/api/projects` (OS) | ⚠️ Has `isEmployeeAccountActive()` guard — rejects OAuth, can't use directly |
| `/api/dashboard` (OS) | ⚠️ `requireAdmin` only — rejects OAuth, can't use directly |

> [!IMPORTANT]
> **No scope changes or DB updates are required.** The Webloom client already has `read:projects`. We simply gate the new `/api/metrics` endpoint with `requireScope(req, 'read:projects')` — zero extra configuration.

---

## What Needs to Be Built

Two things, across two repos:

1. **Delpat OS** → 1 new file: `app/api/metrics/route.ts`
2. **Webloom** → 4 new/modified files + wire into 5 UI surfaces

---

## Proposed Changes

### Component 1 — Delpat OS: New Metrics Endpoint

#### [NEW] `app/api/metrics/route.ts`

An OAuth-protected endpoint that accepts any token with `read:projects` scope. Returns only safe, aggregated integer counts — no PII, no names, no documents.

```typescript
// app/api/metrics/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { requireScope } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Client } from '@/models/Client';
import { Lead } from '@/models/Lead';
import { Employee } from '@/models/Employee';

const ACTIVE_PROJECT_STATUSES = ['active', 'in_progress', 'in progress', 'ongoing'];
const ACTIVE_CLIENT_STATUSES  = ['active', 'prospect'];

export const revalidate = 60; // Next.js ISR: recompute at most once per 60s

export async function GET(req: NextRequest) {
  // Webloom already has read:projects — no DB changes needed
  const payload = requireScope(req, 'read:projects');
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await dbConnect();

    const [
      projectsShipped,
      activeProjects,
      totalClients,
      activeClients,
      pipelineWins,
      teamSize,
    ] = await Promise.all([
      Project.countDocuments({}),
      Project.countDocuments({ 'status.current': { $in: ACTIVE_PROJECT_STATUSES } }),
      Client.countDocuments({}),
      Client.countDocuments({ status: { $in: ACTIVE_CLIENT_STATUSES } }),
      Lead.countDocuments({ status: 'won' }),
      Employee.countDocuments({ 'profile.status': 'active' }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        metrics: {
          projects_shipped: projectsShipped,
          active_projects:  activeProjects,
          total_clients:    totalClients,
          active_clients:   activeClients,
          pipeline_wins:    pipelineWins,
          team_size:        teamSize,
        },
        cached_at: new Date().toISOString(),
      },
      {
        headers: { 'Cache-Control': 'private, s-maxage=60, stale-while-revalidate=30' },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
```

**Response shape:**
```json
{
  "ok": true,
  "metrics": {
    "projects_shipped": 42,
    "active_projects": 12,
    "total_clients": 38,
    "active_clients": 22,
    "pipeline_wins": 35,
    "team_size": 8
  },
  "cached_at": "2025-01-01T00:00:00.000Z"
}
```

---

### Component 2 — Webloom: Extend `/api/stats` to Call OS

#### [MODIFY] [`src/app/api/stats/route.ts`](file:///d:/Delpat/webloom/src/app/api/stats/route.ts)

Call `osRequest('GET', '/api/metrics')` in parallel with the existing seeded DB stats fetch. Uses `Promise.allSettled` so a Delpat OS outage never breaks Webloom's own stats API.

```typescript
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
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || undefined;

  const [dbResult, osResult] = await Promise.allSettled([
    DatabaseService.getStats(page),
    osRequest<OSMetricsResponse>('GET', '/api/metrics'),
  ]);

  const dbStats   = dbResult.status  === 'fulfilled' ? dbResult.value  : [];
  const osMetrics = osResult.status  === 'fulfilled' ? osResult.value?.metrics ?? null : null;
  const cachedAt  = osResult.status  === 'fulfilled' ? osResult.value?.cached_at ?? null : null;

  return NextResponse.json(
    { dbStats, osMetrics, cachedAt },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } }
  );
}
```

---

### Component 3 — Webloom: Animated Counter Component

#### [NEW] `src/components/ui/LiveCounter.tsx`

Scroll-triggered animated counter using `IntersectionObserver`. Falls back silently to the `fallback` string when `value` is `null` (OS unreachable or still loading).

```typescript
'use client';
import { useEffect, useRef, useState } from 'react';

interface LiveCounterProps {
  value: number | null;
  fallback: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function LiveCounter({
  value, fallback, suffix = '', prefix = '', duration = 1500, className,
}: LiveCounterProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const [displayed, setDisplayed] = useState<string | null>(null);

  useEffect(() => {
    if (value === null || animated.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animated.current = true;
      const startTs = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplayed(`${prefix}${Math.round(eased * value)}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {displayed ?? (value === null ? fallback : `${prefix}0${suffix}`)}
    </span>
  );
}
```

---

### Component 4 — Webloom: `useLiveMetrics` Hook

#### [NEW] `src/hooks/useLiveMetrics.ts`

Client-side hook that fetches from `/api/stats` and exposes typed, structured OS metric fields. Returns `null` for each metric when OS is unreachable — components fall back gracefully.

```typescript
'use client';
import { useEffect, useState } from 'react';

export interface LiveMetrics {
  projectsShipped: number | null;
  activeProjects:  number | null;
  totalClients:    number | null;
  activeClients:   number | null;
  pipelineWins:    number | null;
  teamSize:        number | null;
  loading: boolean;
  error:   boolean;
}

const INITIAL: LiveMetrics = {
  projectsShipped: null, activeProjects: null, totalClients: null,
  activeClients:   null, pipelineWins:   null, teamSize:     null,
  loading: true, error: false,
};

export function useLiveMetrics(): LiveMetrics {
  const [state, setState] = useState<LiveMetrics>(INITIAL);

  useEffect(() => {
    let mounted = true;
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const m = data?.osMetrics;
        setState({
          projectsShipped: m?.projects_shipped ?? null,
          activeProjects:  m?.active_projects  ?? null,
          totalClients:    m?.total_clients    ?? null,
          activeClients:   m?.active_clients   ?? null,
          pipelineWins:    m?.pipeline_wins    ?? null,
          teamSize:        m?.team_size        ?? null,
          loading: false, error: false,
        });
      })
      .catch(() => {
        if (mounted) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => { mounted = false; };
  }, []);

  return state;
}
```

---

### Component 5 — Webloom: Wire into 5 UI Surfaces

Replace hardcoded stat strings with `<LiveCounter>` backed by `useLiveMetrics()`. All other stats (95%, Zero, 5000+ hours) stay static — no corresponding OS model tracks them.

#### [MODIFY] Hero — `src/app/home/page.tsx`
```diff
+ const metrics = useLiveMetrics();
  ...
- <span>50+ projects shipped</span>
+ <LiveCounter value={metrics.projectsShipped} fallback="50+" suffix="+" />
+ <span> projects shipped</span>
```

#### [MODIFY] Portfolio stats — `src/app/portfolios/page.tsx`
```diff
- { number: '50+', label: 'Projects Shipped' }
+ // Render with: <LiveCounter value={metrics.projectsShipped} fallback="50+" suffix="+" />
```

#### [MODIFY] Proof page — `src/app/proof/ProofPageClient.tsx`
Same as portfolios — replace the `projects_shipped` counter only.

#### [MODIFY] Who-We-Help — `src/app/who-we-help/page.tsx`
Already fetches `/api/stats`. Update to read from the new merged response shape (`data.osMetrics`). Map `total_clients` → the founders/clients-helped stat card.

#### [MODIFY] Service badge — `src/components/sections/ServiceLandingPage.tsx`
```diff
- "50+ projects shipped"
+ <LiveCounter value={metrics.projectsShipped} fallback="50+" suffix="+" />
+ " projects shipped"
```

---

## Verification Plan

### Curl Tests

```bash
# 1. Get an OAuth token (confirm scope is included in response)
curl -X POST http://localhost:3000/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"client_credentials","client_id":"cli_p61oENHGkHGrieRBDlEndA","client_secret":"sec_FZiZM7rzEM61BVMoOrGedOyXJ0JmqOtwc0ysGoNrw38"}'

# Copy access_token, then:

# 2. Hit the new /api/metrics endpoint directly
curl http://localhost:3000/api/metrics \
  -H "Authorization: Bearer <access_token>"
# Expected: { ok: true, metrics: { projects_shipped: N, ... } }

# 3. Hit the Webloom merged /api/stats
curl http://localhost:3001/api/stats
# Expected: { dbStats: [...], osMetrics: { projects_shipped: N, ... }, cachedAt: "..." }
```

### Manual QA
1. Start both dev servers (`npm run dev` in each repo)
2. Open Webloom home → hero stat pill counts up to the live value from OS
3. Visit `/portfolios` → "Projects Shipped" shows live count
4. **Resilience**: Kill Delpat OS → Webloom `/api/stats` returns `osMetrics: null`, UI falls back to `"50+"` — no errors thrown
5. **Live update**: Create a new Project in Delpat OS admin → within 60s, Webloom counter updates

---

## Files Summary

| File | Repo | Action |
|---|---|---|
| `app/api/metrics/route.ts` | **delpat_os** | **NEW** — OAuth-protected, returns aggregate counts |
| `src/app/api/stats/route.ts` | **webloom** | **MODIFY** — add `osRequest('GET', '/api/metrics')` call |
| `src/components/ui/LiveCounter.tsx` | **webloom** | **NEW** |
| `src/hooks/useLiveMetrics.ts` | **webloom** | **NEW** |
| `src/app/home/page.tsx` | **webloom** | **MODIFY** — hero pills |
| `src/app/portfolios/page.tsx` | **webloom** | **MODIFY** — stats grid |
| `src/app/proof/ProofPageClient.tsx` | **webloom** | **MODIFY** — stats grid |
| `src/app/who-we-help/page.tsx` | **webloom** | **MODIFY** — stats section |
| `src/components/sections/ServiceLandingPage.tsx` | **webloom** | **MODIFY** — trust badge |

> [!NOTE]
> **No scope or DB changes required.** The Webloom client (`cli_p61oENHGkHGrieRBDlEndA`) already has `read:projects` in its registered scopes. The new endpoint is gated on that existing scope.

---

## Implementation Sequence

```
Phase 1 — Delpat OS (1 file, ~40 lines):
  Step 1: Create app/api/metrics/route.ts
  Step 2: Test with curl — confirm counts are correct

Phase 2 — Webloom (integration + UI):
  Step 3: Modify src/app/api/stats/route.ts
  Step 4: Create src/components/ui/LiveCounter.tsx
  Step 5: Create src/hooks/useLiveMetrics.ts
  Step 6: Wire into 5 UI surfaces
  Step 7: Smoke test (live data + graceful fallback)
```
