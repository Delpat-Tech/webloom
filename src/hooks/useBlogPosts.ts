'use client';
import { useState, useEffect } from 'react';
import type { BlogPost } from '@/app/api/blog/route';

export type { BlogPost };

export function useBlogPosts(tag?: string): {
  posts: BlogPost[];
  loading: boolean;
  error: boolean;
} {
  const [posts, setPosts]     = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    const url = `/api/blog${tag ? `?tag=${tag}` : ''}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setPosts(data.posts ?? []);
        setError(!data.ok && !data.posts);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [tag]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string): {
  post: BlogPost | null;
  loading: boolean;
  error: boolean;
} {
  const [post, setPost]       = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => {
        setPost(data.post ?? null);
        setError(!data.post);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
