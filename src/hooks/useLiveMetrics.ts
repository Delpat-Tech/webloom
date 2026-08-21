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
  projectsShipped: null,
  activeProjects:  null,
  totalClients:    null,
  activeClients:   null,
  pipelineWins:    null,
  teamSize:        null,
  loading: true,
  error:   false,
};

/**
 * Client-side hook that fetches from /api/stats and returns typed,
 * structured OS metric fields.
 *
 * Returns null for each metric when Delpat OS is unreachable — components
 * fall back to their static strings gracefully.
 */
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
          loading: false,
          error:   false,
        });
      })
      .catch(() => {
        if (mounted) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => { mounted = false; };
  }, []);

  return state;
}
