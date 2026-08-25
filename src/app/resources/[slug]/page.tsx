'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, ExternalLink, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useBlogPost } from '@/hooks/useBlogPosts';

// Tag gradient mapping (mirrors BlogPostsSection)
const TAG_GRADIENTS: Record<string, string> = {
  execution:   'from-primary/60 to-secondary/60',
  mvp:         'from-secondary/60 to-pink-500/60',
  automation:  'from-accent/60 to-emerald-500/60',
  systems:     'from-blue-500/60 to-primary/60',
  startup:     'from-orange-400/60 to-primary/60',
  product:     'from-violet-500/60 to-secondary/60',
  operations:  'from-teal-500/60 to-accent/60',
  engineering: 'from-primary/60 to-blue-400/60',
  strategy:    'from-secondary/60 to-accent/60',
  growth:      'from-green-400/60 to-secondary/60',
};

function getGradient(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_GRADIENTS[tag.toLowerCase()]) return TAG_GRADIENTS[tag.toLowerCase()];
  }
  return 'from-primary/50 to-secondary/50';
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });
  } catch { return ''; }
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse space-y-6">
      <div className="h-4 bg-muted/40 rounded w-32" />
      <div className="h-8 bg-muted/40 rounded w-3/4" />
      <div className="h-4 bg-muted/40 rounded w-1/4" />
      <div className="h-56 bg-muted/40 rounded-2xl" />
      <div className="space-y-3 pt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`h-4 bg-muted/40 rounded ${i % 3 === 2 ? 'w-3/5' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Not found state ──────────────────────────────────────────────────────────
function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto text-center py-32"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-primary/50" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        This essay hasn&apos;t been published yet, or the URL might have changed. Check back soon.
      </p>
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-secondary transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const { post, loading, error } = useBlogPost(slug);

  return (
    <div className="relative min-h-screen">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/8 w-72 h-72 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/8 w-96 h-96 bg-gradient-to-r from-accent/8 to-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/playbook"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Playbook
          </Link>
        </motion.div>

        {loading && <LoadingSkeleton />}
        {!loading && (error || !post) && <NotFound />}

        {!loading && post && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                {post.reading_time_minutes && (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    {post.reading_time_minutes} min read
                  </>
                )}
                {post.published_at && (
                  <>
                    <span className="mx-1">·</span>
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.published_at)}
                  </>
                )}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                {post.by?.name?.[0]?.toUpperCase() ?? 'D'}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.by?.name}</p>
                {post.by?.role && (
                  <p className="text-xs text-muted-foreground">{post.by.role}</p>
                )}
              </div>
            </div>

            {/* Cover image / gradient band */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-12">
              {post.cover_image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${getGradient(post.tags)} flex items-center justify-center`}>
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>
              )}
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>

            {/* Body — Markdown + raw HTML */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground prose-headings:leading-tight
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-secondary
              prose-strong:text-foreground prose-em:text-foreground/80
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-hr:border-border/30
              prose-img:rounded-xl prose-img:border prose-img:border-border/30
              prose-table:text-sm
              prose-th:text-foreground prose-th:font-semibold
              prose-td:text-muted-foreground
              dark:prose-invert
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {post.body}
              </ReactMarkdown>
            </div>

            {/* Linked Projects */}
            {post.linked_projects && post.linked_projects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-16 pt-10 border-t border-border/30"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.linked_projects.map((proj) => {
                    const title = typeof proj === 'object' ? proj.identity?.title : String(proj);
                    const projSlug = typeof proj === 'object' ? proj.slug : undefined;
                    const industries = typeof proj === 'object' ? proj.industries : [];
                    return (
                      <motion.div
                        key={typeof proj === 'object' ? proj._id : String(proj)}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        className="group flex flex-col p-5 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                            {title}
                          </p>
                          {projSlug && (
                            <Link href={`/portfolios#${projSlug}`} className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                        {industries && industries.length > 0 && (
                          <p className="text-xs text-muted-foreground">{industries.join(' · ')}</p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* Footer nav */}
            <div className="mt-16 pt-10 border-t border-border/30 flex items-center justify-between">
              <Link
                href="/playbook"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                All Playbook Posts
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-secondary transition-colors duration-300"
              >
                Work With Us
              </Link>
            </div>
          </motion.article>
        )}
      </div>
    </div>
  );
}
