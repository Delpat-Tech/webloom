// src/app/api/blog/route.ts
// Server-side proxy: fetches blog posts from Delpat OS via OAuth.
// Merges with built-in principle posts so the site works immediately,
// with full real-time override whenever posts are created/published in OS.
import { NextRequest, NextResponse } from 'next/server';
import { osRequest } from '@/lib/os-client';
import { FALLBACK_BLOG_POSTS } from '@/lib/blog-fallbacks';

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  by: { name: string; role?: string };
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  cover_image_url?: string;
  reading_time_minutes?: number;
  linked_projects: {
    _id: string;
    slug?: string;
    identity?: { title: string };
    showcase?: { metrics: { value: string; label: string }[] };
    industries?: string[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

interface OSBlogListResponse { ok: boolean; posts: BlogPost[]; total: number }
interface OSBlogSingleResponse { ok: boolean; post: BlogPost }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const tag  = searchParams.get('tag');

  if (slug) {
    const [result] = await Promise.allSettled([
      osRequest<OSBlogSingleResponse>('GET', `/api/blog/${slug}`),
    ]);

    let post: BlogPost | null = null;
    if (result.status === 'fulfilled' && result.value?.ok && result.value?.post) {
      post = result.value.post;
    } else if (FALLBACK_BLOG_POSTS[slug]) {
      post = FALLBACK_BLOG_POSTS[slug];
    }

    return NextResponse.json(
      { ok: !!post, post },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=30' },
      }
    );
  }

  // Listing all posts
  const [result] = await Promise.allSettled([
    osRequest<OSBlogListResponse>('GET', `/api/blog?status=published${tag ? `&tag=${tag}` : ''}`),
  ]);

  const osPosts: BlogPost[] =
    result.status === 'fulfilled' && result.value?.ok && Array.isArray(result.value?.posts)
      ? result.value.posts
      : [];

  // Merge OS posts with fallbacks, prioritizing OS posts for duplicate slugs
  const osSlugs = new Set(osPosts.map(p => p.slug));
  const fallbackList = Object.values(FALLBACK_BLOG_POSTS).filter(
    p => !osSlugs.has(p.slug) && (!tag || p.tags.includes(tag.toLowerCase()))
  );

  const combinedPosts = [...osPosts, ...fallbackList];

  return NextResponse.json(
    { ok: true, posts: combinedPosts, total: combinedPosts.length },
    {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    }
  );
}
