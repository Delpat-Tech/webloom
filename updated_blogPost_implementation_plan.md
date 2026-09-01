# Blog Posts: Full Implementation Plan

## Overview

Five changes across two repos:
1. **Delpat OS** — `BlogPost` model, REST API, Blog Creator UI tab in admin sidebar.
2. **Webloom** — Proxy API, `useBlogPosts` hook, CTA on `SocialProof` cards, `BlogPostsSection` on Resources, full `[slug]` post reader.

---

## Decisions Locked In

| Decision | Choice |
|---|---|
| Auth Connection | Option A — OAuth `read:blog` scope |
| Body Format | Markdown + raw HTML (`rehype-raw` + `remark-gfm`) |
| CTA Label | Option 2 — **"Read the Playbook →"** on all principle cards |
| Author Attribution | `by` field on every post (Employee ObjectId + display name) |
| Cover Images | Optional field; see options below |
| Fallback Strategy | Static content in Webloom for all 5 cards until OS posts go live |

---

## Part 1 — Delpat OS: Data Model

### [NEW] `models/BlogPost.ts`

```typescript
{
  slug:         String  (unique, required, indexed)
  title:        String  (required)
  excerpt:      String  // Short summary shown in cards and meta description
  body:         String  // Markdown + raw HTML. Rendered by Webloom.

  // Attribution
  by: {
    name:  String  (required)  // Display name — denormalized for read speed
    role:  String              // e.g. "Founder", "Lead Engineer"
    employee: ObjectId → Employee  // Optional link for profile page later
  }

  tags:          [String]     // e.g. ["execution", "mvp", "automation"]
  status:        String  enum ['draft', 'published', 'archived']  default: 'draft'
  published_at:  Date         // Set automatically when status → 'published'

  cover_image_url:       String  // See cover image options below
  reading_time_minutes:  Number  // Estimated; can be auto-calculated from body length

  linked_projects: [{ type: ObjectId, ref: 'Project' }]  // Linked showcase projects

  timestamps: true
}
```

---

## Part 2 — Cover Image Options

> [!IMPORTANT]
> Choose **one** of the three options below. This affects one field in the model and zero Webloom rendering logic (it just renders whatever URL is stored).

---

### Option A — Google Drive Public Link *(Recommended for now)*

Store any publicly shared GDrive image URL in `cover_image_url`.

**How to get a direct image URL from GDrive:**
1. Upload image to GDrive → right click → **Share** → Anyone with the link → Copy link.
2. The share link looks like: `https://drive.google.com/file/d/<FILE_ID>/view`
3. Manually transform it to a direct embed URL: `https://drive.google.com/uc?export=view&id=<FILE_ID>`
4. Paste the transformed URL into the Blog Creator form.

**Pros:** Zero cost. No new infrastructure.  
**Cons:** GDrive URLs can expire or break if the sharing setting changes. Requires manual URL transformation (we can add a helper in the Blog Creator UI).

---

### Option B — Direct Public URL (Any CDN / Host)

Store any publicly accessible image URL — GDrive, Notion cover, Unsplash, Cloudinary, etc.

**How it works:** The Blog Creator has a plain text input for any valid image URL. Webloom renders it with `<img src={cover_image_url} />`. No processing.

**Pros:** Maximum flexibility. Supports any future image host.  
**Cons:** No validation or resizing. Broken URLs show a blank space (falls back to gradient).

---

### Option C — Cloudinary Free Tier *(Best long-term)*

Store a Cloudinary public ID. The Blog Creator has a file upload button that POSTs to a `/api/upload` route in OS, which uploads to Cloudinary and returns the URL.

**How it works:**
- OS adds `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` to `.env.local`.
- Admin uploads a file → OS uploads to Cloudinary → Webloom renders the CDN URL.

**Pros:** Persistent URLs. Free tier gives 25GB storage. Auto image optimization.  
**Cons:** Requires Cloudinary account + env vars. More setup.

---

> [!NOTE]
> **Recommendation:** Start with **Option B** (direct URL, maximum flexibility with zero overhead). Add a GDrive URL helper tooltip in the Blog Creator. Migrate to Cloudinary (Option C) later if needed.

---

## Part 3 — Delpat OS: API Routes

### `VALID_SCOPES` update — `lib/auth.ts`

```diff
export const VALID_SCOPES = [
  'read:leads', 'write:leads',
  'read:projects', 'write:projects',
  ...
+ 'read:blog', 'write:blog',
] as const;
```

### One-time DB Scope Grant

```js
db.oauthclients.updateOne(
  { clientId: "cli_p61oENHGkHGrieRBDlEndA" },
  { $push: { scopes: "read:blog" } }
)
```

### [NEW] `app/api/blog/route.ts`

```
GET  /api/blog
  Auth:     requireScope(req, 'read:blog')
  Query:    ?status=published&tag=mvp&limit=20&page=1
  Returns:  { ok, posts: BlogPost[], total }
  Note:     OAuth (Webloom) gets published only. Admin/employee gets all.

POST /api/blog
  Auth:     requireScope(req, 'write:blog') + isEmployeeAccountActive
  Body:     { slug, title, excerpt, body, by, tags, linked_projects, cover_image_url, reading_time_minutes }
  Returns:  created BlogPost
```

### [NEW] `app/api/blog/[slug]/route.ts`

```
GET   /api/blog/[slug]
  Auth:    requireScope(req, 'read:blog')
  Returns: single BlogPost with linked_projects populated

PATCH /api/blog/[slug]
  Auth:    requireScope(req, 'write:blog') + isEmployeeAccountActive
  Body:    Partial BlogPost fields
  Note:    Automatically sets published_at when status changes to 'published'

DELETE /api/blog/[slug]
  Auth:    requireScope(req, 'write:blog') + isEmployeeAccountActive
  Action:  Sets status = 'archived' (soft delete)
```

---

## Part 4 — Delpat OS: Blog Creator UI

### Admin Sidebar Changes — `app/admin/page.tsx`

**1. Add `'blog'` to the `AdminTab` type:**
```diff
type AdminTab = 'analytics' | 'projects' | 'leads' | 'team' | 'clients' | 'sources' | 
                'associates' | 'finance' | 'roles' | 'settings' | 'leave-requests' | 
                'meeting-reports' | 'mail-chain' | 'event-log' | 'vault' | 'hr-documents'
+               | 'blog';
```

**2. Add sidebar item under Workspace section:**
```tsx
// Positioned after "HR Documents", before the Configuration section
<SidebarItem
  label="Blog"
  icon={BookOpen}                   // from lucide-react
  active={activeTab === 'blog'}
  onClick={() => setActiveTab('blog')}
  count={blogPosts.filter(p => p.status === 'published').length || undefined}
  isCollapsed={isSidebarCollapsed}
/>
```

**3. Add state + data fetch:**
```tsx
const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);

// In refreshData():
fetch('/api/blog?status=all', opts)  // admin gets all statuses
// → if (blogRes.ok) setBlogPosts(await blogRes.json().then(r => r.posts));
```

**4. Add tab render in main content area:**
```tsx
{activeTab === 'blog' && (
  <BlogView
    posts={blogPosts}
    employees={employees}
    projects={projects}
    onRefresh={refreshData}
  />
)}
```

---

### [NEW] `components/views/BlogView.tsx`

This is the Blog Creator UI inside Delpat OS. It follows the same visual pattern as `ProjectsView`, `LeadsView`, etc.

**Layout — Two-panel design:**

```
┌──────────────────────────────────────────────────────────────────┐
│  Blog Posts                                  [+ New Post]        │
├──────────────────┬───────────────────────────────────────────────┤
│  POST LIST       │  POST EDITOR                                  │
│  (left column)   │  (right column, slide in on row click)        │
│                  │                                               │
│  🟢 Published 3  │  Title: [__________________________________]  │
│  🟡 Draft 2      │  Slug:  [__________________________________]  │
│  ─────────────── │                                               │
│  • Move at the   │  By:    Name [__________]  Role [_______]    │
│    Speed of...   │         Employee Link [dropdown optional]     │
│    Published     │                                               │
│  • Systems Over  │  Tags:  [execution ×] [mvp ×] [+ Add tag]   │
│    Chaos...      │                                               │
│    Draft         │  Cover Image URL:                             │
│  • ...           │  [__________________________________________]  │
│                  │  💡 GDrive tip: use uc?export=view&id=...    │
│                  │                                               │
│                  │  Linked Projects:                             │
│                  │  [Dropdown multiselect from OS projects]     │
│                  │                                               │
│                  │  Reading time: [4] min                        │
│                  │                                               │
│                  │  ─── Body (Markdown + HTML) ────────────────  │
│                  │  ┌──────────────────────────────────────────┐ │
│                  │  │ # Heading                                │ │
│                  │  │ **bold**, _italic_                       │ │
│                  │  │ <div class="callout">Custom HTML</div>   │ │
│                  │  │ ...                                      │ │
│                  │  └──────────────────────────────────────────┘ │
│                  │  (textarea, monospace, full height)           │
│                  │                                               │
│                  │  Excerpt:                                     │
│                  │  [__________________________________________]  │
│                  │  (auto-filled from first 160 chars of body)  │
│                  │                                               │
│                  │  Status: [Draft ▼]   [Save Draft] [Publish]  │
└──────────────────┴───────────────────────────────────────────────┘
```

**Key behaviours:**
- Slug is auto-generated from title on creation (kebab-case, user can override).
- Excerpt auto-fills from the first ~160 chars of body (user can override).
- `published_at` is set server-side when status transitions to `'published'`.
- GDrive URL helper tooltip shows the `uc?export=view&id=` transformation pattern.
- **Preview toggle** opens a read-only render of the body as it will appear on Webloom (using the same `react-markdown` + `rehype-raw` pipeline, embedded in OS in a side drawer or modal).

---

## Part 5 — Webloom: Data Layer

### [NEW] `src/app/api/blog/route.ts` — Webloom proxy

```typescript
// GET /api/blog              → returns list (published only)
// GET /api/blog?slug=<slug>  → returns single post

export const revalidate = 300; // 5-minute ISR cache

export async function GET(req: NextRequest) {
  const slug = new URL(req.url).searchParams.get('slug');

  const [result] = await Promise.allSettled([
    slug
      ? osRequest('GET', `/api/blog/${slug}`)
      : osRequest('GET', '/api/blog?status=published')
  ]);

  if (result.status === 'rejected') {
    return NextResponse.json({ ok: false, posts: [], post: null }, { status: 200 });
  }

  return NextResponse.json(result.value, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' }
  });
}
```

### [NEW] `src/hooks/useBlogPosts.ts`

```typescript
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  by: { name: string; role?: string; };
  tags: string[];
  cover_image_url?: string;
  reading_time_minutes?: number;
  published_at: string;
  linked_projects: { _id: string; identity: { title: string } }[];
}

// Hook: all published posts
export function useBlogPosts(): { posts: BlogPost[], loading: boolean, error: boolean }

// Hook: single post by slug
export function useBlogPost(slug: string): { post: BlogPost | null, loading: boolean, error: boolean }
```

---

## Part 6 — Webloom: UI Changes

### [MODIFY] `src/components/sections/SocialProof.tsx`

Each card object gets a `slug` field. The card inner content gets a bottom CTA footer:

**Card data objects:**
```typescript
const cards = [
  { title: "Move at the Speed of Insight.", body: "...", slug: "move-at-speed-of-insight" },
  { title: "Systems Over Chaos.",            body: "...", slug: "systems-over-chaos" },
  { title: "Your Success is the Only Metric.", body: "...", slug: "your-success-is-the-only-metric" },
  { title: "Reliable Tech Over Trendy Tech.", body: "...", slug: "reliable-tech-over-trendy-tech" },
  { title: "We Bridge the Execution Gap.",   body: "...", slug: "bridge-the-execution-gap" },
]
```

**Updated card inner layout** (inside the `motion.div`):
```diff
  <div className="relative z-10 h-full flex flex-col justify-between">
    <div>
      <motion.div className="w-10 h-1 bg-gradient-to-r ..." />
      <h3>{card.title}</h3>
    </div>
    <p className="text-muted-foreground ...">{card.body}</p>

+   {/* CTA footer */}
+   <div className="mt-5 pt-4 border-t border-border/20 flex items-center justify-between">
+     <Link href={`/resources/${card.slug}`}>
+       <motion.span
+         className="inline-flex items-center gap-2 text-sm font-medium text-primary
+                    hover:gap-3 transition-all duration-300"
+         whileHover={{ x: 4 }}
+       >
+         Read the Playbook
+         <ArrowRight className="w-4 h-4" />
+       </motion.span>
+     </Link>
+     {/* Optional reading time badge if live data is available */}
+   </div>
  </div>
```

---

### [NEW] `src/components/sections/BlogPostsSection.tsx`

Inserted between `<ToolsAndStack />` and `<FAQAccordion />` on the Resources page.

**Section structure:**
```
Section badge: "From Our Playbook"
Section heading: "Execution Insights" (gradient text)
Section subheading: "Essays, frameworks, and breakdowns from our delivery practice."

[Posts grid — 3 cols desktop / 1 col mobile]
  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
  │ Cover / Grad   │  │ Cover / Grad   │  │ Cover / Grad   │
  │                │  │                │  │                │
  │ tag  tag       │  │ tag            │  │ tag  tag  tag  │
  │ Post Title     │  │ Post Title     │  │ Post Title     │
  │ Excerpt text...│  │ Excerpt...     │  │ Excerpt...     │
  │                │  │                │  │                │
  │ By Om · 4 min  │  │ By Om · 6 min  │  │ By Om · 3 min  │
  │ Read the Plybk→│  │ Read the Plybk→│  │ Read the Plybk→│
  └────────────────┘  └────────────────┘  └────────────────┘

[Empty state when no posts published yet]
  Elegant card: "Insights incoming. Subscribe to get notified."
  → scroll to newsletter section
```

---

### [MODIFY] `src/app/resources/page.tsx`

```diff
  {/* TOOLS & STACK SECTION */}
  <ToolsAndStack />

+ {/* BLOG POSTS SECTION */}
+ <BlogPostsSection />
+ {/* anchor: id="blog" for nav pill */}

  {/* FAQ SECTION */}
  <FAQAccordion ... />
```

Also update the quick nav pills:
```diff
  { label: 'How We Think', icon: <Brain />, href: '#thinking' },
  { label: 'Tech Stack',   icon: <Code />,  href: '#stack' },
+ { label: 'Playbook',     icon: <BookOpen />, href: '#blog' },
  { label: 'FAQ',          icon: <HelpCircle />, href: '#faq' }
```

---

### [NEW] `src/app/resources/[slug]/page.tsx`

**Packages to install (Webloom):**
```bash
npm install react-markdown remark-gfm rehype-raw
```

**Page behaviour:**
- `fetch('/api/blog?slug=<slug>')` server-side via `generateStaticParams` for ISR, or client-side for dynamic.
- If post not found → renders inline "Not found" state (styled, no redirect to 404).
- `by.name` and `by.role` are displayed prominently below the title.
- `linked_projects` shown as mini cards at bottom.
- Related posts (same tag) shown as a horizontal 3-card strip at the very bottom.

**Page layout:**
```
[Back arrow] ← Resources / Blog

  ┌──────────────────────────────────────────────┐
  │  tag  tag                    4 min · Aug 2026 │
  │                                               │
  │  Move at the Speed of Insight.               │
  │  (h1, large, gradient accent)                │
  │                                               │
  │  By Om Mahesh · Founder                      │
  │  (subtle, muted, below h1)                   │
  ├───────────────────────────────────────────────┤
  │  [Cover image or gradient band (16:9)]       │
  ├───────────────────────────────────────────────┤
  │                                               │
  │  [Rendered Markdown + HTML body]             │
  │  (prose styling: h2, h3, p, ul, code, hr)   │
  │  (raw HTML: divs, iframes, videos work too)  │
  │                                               │
  ├──── LINKED PROJECTS ─────────────────────────┤
  │  [Mini project cards — slug → /portfolios]   │
  ├──── RELATED POSTS ───────────────────────────┤
  │  [3-card horizontal strip by tag match]      │
  └──────────────────────────────────────────────┘
```

---

## Part 7 — Files Summary

| File | Repo | Action |
|---|---|---|
| `lib/auth.ts` | **delpat_os** | **MODIFY** — add `'read:blog', 'write:blog'` to `VALID_SCOPES` |
| `models/BlogPost.ts` | **delpat_os** | **NEW** — Mongoose schema with `by`, `tags`, `linked_projects`, `cover_image_url` |
| `app/api/blog/route.ts` | **delpat_os** | **NEW** — GET list + POST create |
| `app/api/blog/[slug]/route.ts` | **delpat_os** | **NEW** — GET single + PATCH edit + DELETE (soft) |
| `app/admin/page.tsx` | **delpat_os** | **MODIFY** — add `'blog'` to `AdminTab` type, add `<SidebarItem>`, add `BlogView` tab render |
| `components/views/BlogView.tsx` | **delpat_os** | **NEW** — Blog Creator: list + editor two-panel UI |
| `src/app/api/blog/route.ts` | **webloom** | **NEW** — Proxy + 5-min ISR cache |
| `src/hooks/useBlogPosts.ts` | **webloom** | **NEW** — `useBlogPosts()` + `useBlogPost(slug)` hooks |
| `src/components/sections/SocialProof.tsx` | **webloom** | **MODIFY** — add `slug` field + "Read the Playbook →" CTA footer |
| `src/components/sections/BlogPostsSection.tsx` | **webloom** | **NEW** — Post grid section for Resources page |
| `src/app/resources/page.tsx` | **webloom** | **MODIFY** — insert `<BlogPostsSection id="blog" />`, add nav pill |
| `src/app/resources/[slug]/page.tsx` | **webloom** | **NEW** — Full post reader with Markdown + HTML rendering |

---

## Implementation Sequence

```
Phase 1 — OS Backend
  Step 1: models/BlogPost.ts
  Step 2: lib/auth.ts — add read:blog / write:blog scopes
  Step 3: app/api/blog/route.ts (GET list + POST)
  Step 4: app/api/blog/[slug]/route.ts (GET + PATCH + soft DELETE)
  Step 5: One-time DB scope grant (updateOne on OAuthClient)

Phase 2 — OS Frontend (Blog Creator)
  Step 6: components/views/BlogView.tsx
  Step 7: app/admin/page.tsx — wire in BlogView tab + sidebar item

Phase 3 — Webloom Integration
  Step 8:  npm install react-markdown remark-gfm rehype-raw
  Step 9:  src/app/api/blog/route.ts (proxy)
  Step 10: src/hooks/useBlogPosts.ts
  Step 11: src/components/sections/SocialProof.tsx — slugs + CTA
  Step 12: src/components/sections/BlogPostsSection.tsx
  Step 13: src/app/resources/page.tsx — insert section + nav pill
  Step 14: src/app/resources/[slug]/page.tsx — full reader

Phase 4 — Seed + Verify
  Step 15: Create the 5 principle posts in OS Blog Creator
  Step 16: Publish → verify on Webloom at /resources/<slug>
  Step 17: Verify SocialProof CTA links resolve correctly
```
