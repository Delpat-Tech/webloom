'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { useBlogPosts } from '@/hooks/useBlogPosts';

// Tag-to-gradient colour mapping for the cover banner fallback
const TAG_GRADIENTS: Record<string, string> = {
  execution:   'from-primary/80 to-secondary/80',
  mvp:         'from-secondary/80 to-pink-500/80',
  automation:  'from-accent/80 to-emerald-500/80',
  systems:     'from-blue-500/80 to-primary/80',
  startup:     'from-orange-400/80 to-primary/80',
  product:     'from-violet-500/80 to-secondary/80',
  operations:  'from-teal-500/80 to-accent/80',
  engineering: 'from-primary/80 to-blue-400/80',
  strategy:    'from-secondary/80 to-accent/80',
  growth:      'from-green-400/80 to-secondary/80',
};

function getGradient(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_GRADIENTS[tag.toLowerCase()]) return TAG_GRADIENTS[tag.toLowerCase()];
  }
  return 'from-primary/70 to-secondary/70';
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return '';
  }
}

// ─── Skeleton card shown while loading ───────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 overflow-hidden animate-pulse">
      <div className="h-40 bg-muted/40" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-muted/40 rounded-full w-1/3" />
        <div className="h-5 bg-muted/40 rounded-full w-4/5" />
        <div className="h-3 bg-muted/40 rounded-full w-full" />
        <div className="h-3 bg-muted/40 rounded-full w-2/3" />
      </div>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-primary/60" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">Insights Incoming</h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
        We&apos;re writing essays and frameworks from our delivery practice. Subscribe to get notified when we publish.
      </p>
      <motion.button
        onClick={() => {
          const el = document.getElementById('newsletter');
          if (!el) return;
          const lenis = (globalThis as unknown as { lenis?: { scrollTo: (el: Element | number, opts?: { duration?: number; offset?: number }) => void } }).lenis;
          if (lenis) lenis.scrollTo(el, { duration: 1.8 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        Get notified
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BlogPostsSection() {
  const { posts, loading } = useBlogPosts();

  return (
    <section id="blog" className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-20 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span>From Our Playbook</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Execution{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Essays, frameworks, and breakdowns from our delivery practice.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loading && posts.length === 0 && <EmptyState />}

          {!loading && posts.map((post, index) => {
            const gradient = getGradient(post.tags);
            return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Link href={`/resources/${post.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col">
                    {/* Cover: image or gradient fallback */}
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      {post.cover_image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}>
                          <BookOpen className="w-12 h-12 text-white/40" />
                        </div>
                      )}
                      {/* Reading time badge */}
                      {post.reading_time_minutes && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                          <Clock className="w-3 h-3" />
                          {post.reading_time_minutes} min
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-6 flex flex-col">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/8 text-primary rounded-md text-xs font-medium"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Footer: author + CTA */}
                      <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            By {post.by?.name}
                          </p>
                          {post.published_at && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {formatDate(post.published_at)}
                            </p>
                          )}
                        </div>
                        <motion.span
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all duration-300"
                          whileHover={{ x: 3 }}
                        >
                          Read the Playbook
                          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
