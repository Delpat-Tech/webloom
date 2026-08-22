# Principle Cards → Blog Posts: Implementation Plan

## Overview

Each ScrollStack principle card in `SocialProof.tsx` gets a **"Learn More →"** CTA. Clicking it routes to `/resources/[slug]` — a rich blog post page. The Resources page gets a new **Blog Posts** section inserted above the FAQ. Blog posts are authored and managed in **Delpat OS** and pulled into Webloom via OAuth.

---

## Part 1 — Delpat OS: `BlogPost` Model + API

### Architecture: `read:blog` OAuth Scope ✅ Confirmed

Webloom connects to Delpat OS using the existing OAuth 2.0 client credentials flow — the exact same pattern used for the `/api/metrics` integration.

**What changes:**
1. Add `'read:blog', 'write:blog'` to `VALID_SCOPES` in OS `lib/auth.ts`
2. Run a one-time DB update to grant Webloom's existing OAuth client the `read:blog` scope:
   ```js
   db.oauthclients.updateOne(
     { clientId: "cli_p61oENHGkHGrieRBDlEndA" },
     { $push: { scopes: "read:blog" } }
   )
   ```
3. The new OS `/api/blog` route is gated with `requireScope(req, 'read:blog')`
4. Webloom fetches via the existing `osRequest('GET', '/api/blog')` — **no new auth plumbing**

The Webloom OAuth client token already gets refreshed automatically by `osRequest`, so no changes are needed to `src/lib/os-client.ts`.


---

### [NEW] `models/BlogPost.ts` — Delpat OS

```typescript
// Mongoose schema for blog posts authored in OS
{
  slug:        String (unique, required)   // URL key, e.g. "move-at-speed-of-insight"
  title:       String (required)
  body:        String (required)           // Markdown / rich text
  excerpt:     String                      // Short summary for cards
  tags:        [String]                    // e.g. ["execution", "mvp", "startup"]
  status:      String enum ['draft', 'published', 'archived']  default: 'draft'
  author:      ObjectId → Employee
  linked_projects: [ObjectId → Project]   // Linked OS projects
  cover_image_url: String
  reading_time_minutes: Number
  published_at: Date
  timestamps: true
}
```

### [NEW] `app/api/blog/route.ts` — Delpat OS (GET + POST)

```
GET /api/blog           → requireScope(req, 'read:blog')
                          Returns: published posts only
                          Supports: ?status=published&tag=mvp&limit=20&page=1

GET /api/blog/[slug]    → requireScope(req, 'read:blog')
                          Returns: single post with linked_projects populated

POST /api/blog          → requireScope(req, 'write:blog') + isEmployeeAccountActive
                          Creates a new post (admin/employee only)

PATCH /api/blog/[slug]  → requireScope(req, 'write:blog') + isEmployeeAccountActive
                          Updates post (publish/draft toggle, edit body, etc.)
```

**Response shape for GET `/api/blog`:**
```json
{
  "ok": true,
  "posts": [
    {
      "_id": "...",
      "slug": "move-at-speed-of-insight",
      "title": "Move at the Speed of Insight.",
      "excerpt": "For a founder, the most valuable asset is time...",
      "tags": ["execution", "mvp", "speed"],
      "cover_image_url": null,
      "reading_time_minutes": 4,
      "published_at": "2026-08-21T00:00:00.000Z",
      "linked_projects": [{ "_id": "...", "identity.title": "..." }]
    }
  ],
  "total": 5
}
```

### Required OS DB Change (Option A only)

```js
// One-time MongoDB shell command — add read:blog scope to Webloom client
db.oauthclients.updateOne(
  { clientId: "cli_p61oENHGkHGrieRBDlEndA" },
  { $push: { scopes: "read:blog" } }
)
```

---

## Part 2 — Webloom: Data Layer

### [MODIFY] `src/lib/os-client.ts`

No changes needed — `osRequest()` already handles generic typed requests.

### [NEW] `src/app/api/blog/route.ts` — Webloom proxy

```typescript
// Server route that proxies OS blog data to Webloom's client
GET /api/blog?slug=...&tag=...

→ osRequest('GET', '/api/blog')
← NextResponse.json({ posts }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } })
```

Uses `Promise.allSettled` pattern — OS outage returns empty posts array, site never breaks.

### [NEW] `src/hooks/useBlogPosts.ts`

```typescript
// Client hook: fetch all published posts
export function useBlogPosts(): { posts: BlogPost[], loading: boolean, error: boolean }

// Client hook: fetch single post by slug  
export function useBlogPost(slug: string): { post: BlogPost | null, loading: boolean }
```

---

## Part 3 — Webloom: UI Changes

### [MODIFY] `src/components/sections/SocialProof.tsx`

Each principle card data object gets a `slug` field linking to the blog post:

```typescript
{
  title: "Move at the Speed of Insight.",
  body: "For a founder...",
  slug: "move-at-speed-of-insight",   // ← NEW
}
```

The card content area gets a **"Learn More →"** CTA button at the bottom:

```tsx
// Added at the bottom of each card's flex column, after <p>
<div className="mt-4 pt-4 border-t border-border/20">
  <Link href={`/resources/${card.slug}`}>
    <motion.span
      className="inline-flex items-center gap-2 text-sm font-medium text-primary 
                 hover:gap-3 transition-all duration-300"
      whileHover={{ x: 4 }}
    >
      Learn more
      <ArrowRight className="w-4 h-4" />
    </motion.span>
  </Link>
</div>
```

---

### [MODIFY] `src/app/resources/page.tsx`

Add a **Blog Posts** section between `<ToolsAndStack />` and `<FAQAccordion />`:

```tsx
{/* BLOG POSTS SECTION */}
<BlogPostsSection />   // ← NEW section, see below
id="blog"              // Anchor link from header nav

{/* FAQ SECTION */}
<FAQAccordion ... />
```

Also update the quick navigation pills to include a `Blog` link:
```tsx
{ label: 'Blog', icon: <BookOpen className="w-4 h-4" />, href: '#blog' }
```

---

### [NEW] `src/components/sections/BlogPostsSection.tsx`

A grid of blog post cards. Each card shows: cover (gradient fallback), title, excerpt, tags, reading time, and a "Read Post →" link.

**Layout:**
```
Section Header: "From Our Playbook"
                "Execution Insights" (gradient text)

Grid (3-col desktop, 1-col mobile):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ [Cover / Grad]  │  │ [Cover / Grad]  │  │ [Cover / Grad]  │
│                 │  │                 │  │                 │
│ Tag  Tag  Tag   │  │ Tag  Tag        │  │ Tag  Tag  Tag   │
│ Title of Post   │  │ Title of Post   │  │ Title of Post   │
│ Excerpt text... │  │ Excerpt text... │  │ Excerpt text... │
│ 4 min read      │  │ 6 min read      │  │ 3 min read      │
│ Read Post →     │  │ Read Post →     │  │ Read Post →     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

When no posts are published yet → elegant "Coming Soon" empty state (preserving the current HowWeThink style).

---

### [NEW] `src/app/resources/[slug]/page.tsx`

The individual blog post page. Fetches by slug from `/api/blog?slug=<slug>`.

**Page layout:**
```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Resources                                    │
│                                                         │
│  Tag  Tag  Tag          4 min read · Aug 21, 2026       │
│                                                         │
│  Move at the Speed of Insight.                          │
│  (large h1, gradient text)                              │
│                                                         │
│  [Cover image or gradient band]                         │
│                                                         │
│  ─────────── BODY (rendered markdown) ─────────────     │
│                                                         │
│  ─────────── LINKED PROJECTS ──────────────────────     │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ Project Card │  │ Project Card │                    │
│  │ (mini)       │  │ (mini)       │                    │
│  └──────────────┘  └──────────────┘                    │
│                                                         │
│  ─────────── RELATED POSTS ────────────────────────     │
│  (other posts with overlapping tags)                    │
└─────────────────────────────────────────────────────────┘
```

Markdown is rendered with a library like `react-markdown` + `remark-gfm`.

**Fallback:** If slug is not found (post unpublished or OS down), renders a 404-styled page consistent with the site's design system rather than Next.js default 404.

---

## Part 4 — Files Summary

| File | Repo | Action |
|---|---|---|
| `lib/auth.ts` | **delpat_os** | **MODIFY** — add `'read:blog', 'write:blog'` to `VALID_SCOPES` |
| `models/BlogPost.ts` | **delpat_os** | **NEW** — Mongoose schema |
| `app/api/blog/route.ts` | **delpat_os** | **NEW** — GET (published posts list) + POST (create) |
| `app/api/blog/[slug]/route.ts` | **delpat_os** | **NEW** — GET (single post) + PATCH (edit/publish) |
| `src/app/api/blog/route.ts` | **webloom** | **NEW** — Proxy + cache layer |
| `src/hooks/useBlogPosts.ts` | **webloom** | **NEW** — Client data hooks |
| `src/components/sections/SocialProof.tsx` | **webloom** | **MODIFY** — add `slug` field + CTA button to each card |
| `src/components/sections/BlogPostsSection.tsx` | **webloom** | **NEW** — Grid of post cards |
| `src/app/resources/page.tsx` | **webloom** | **MODIFY** — insert `<BlogPostsSection />` + add Blog nav pill |
| `src/app/resources/[slug]/page.tsx` | **webloom** | **NEW** — Full blog post render page |

---

## Open Questions

> [!IMPORTANT]
> **1. Principle card slugs:** The 5 principle cards need a `slug` assigned to each. Should these be created as pre-seeded blog posts in OS, or should they be hardcoded in Webloom as static fallback posts that are *overridable* from OS?

> [!IMPORTANT]
> **2. Body format:** Should `body` be stored as **Markdown** (rendered with `react-markdown` on Webloom) or **plain text / rich text JSON** (e.g. Tiptap/ProseMirror format)? Markdown is simpler to implement; rich text allows richer admin UX later.

> [!NOTE]
> **3. Cover images:** No image hosting is planned. Posts will use a gradient banner generated from the post's primary tag colour — same aesthetic as the existing portfolio cards. Confirm if that's acceptable or if you want image URL support.

---

## Implementation Sequence

```
Phase 1 — Delpat OS (backend):
  Step 1: Add 'read:blog' / 'write:blog' to VALID_SCOPES
  Step 2: Create models/BlogPost.ts
  Step 3: Create app/api/blog/route.ts (list + create)
  Step 4: Create app/api/blog/[slug]/route.ts (get + patch)
  Step 5: Grant read:blog scope to Webloom client (DB update)
  Step 6: Seed the 5 principle posts in OS admin / MongoDB

Phase 2 — Webloom (integration + UI):
  Step 7: Create src/app/api/blog/route.ts (proxy)
  Step 8: Create src/hooks/useBlogPosts.ts
  Step 9: Modify SocialProof.tsx — add slug + CTA buttons
  Step 10: Create BlogPostsSection.tsx
  Step 11: Modify resources/page.tsx — insert section
  Step 12: Create resources/[slug]/page.tsx
  Step 13: Smoke test: live post → card → full post render
```
