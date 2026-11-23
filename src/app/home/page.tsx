'use client';

import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Target,
  Play,
  Rocket,
  Settings,
  Zap,
  Hammer,
  Search,
  Send,
  LifeBuoy,
  Puzzle,
  UserX,
  Timer,
  MousePointerClick,
} from 'lucide-react';
import LiveCounter from '@/components/ui/LiveCounter';
import { useLiveMetrics } from '@/hooks/useLiveMetrics';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import PageBackdrop from '@/components/ui/PageBackdrop';
import SocialProofSection from '@/components/sections/SocialProof';
import EnhancedTestimonialsCarousel from '@/components/sections/EnhancedTestimonialsCarousel';
import { machine } from '@/components/three/machineStore';
import MachineHUD from '@/components/three/MachineHUD';
import { testAnalytics } from '@/utils/testAnalytics';

// One WebGL canvas for the whole page, loaded client-side only.
const MachineCanvas = dynamic(() => import('@/components/three/MachineCanvas'), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const PAIN = [
  { icon: Puzzle, title: 'No-code hit its ceiling', body: 'Zaps and sheets got you this far. Now they are the thing slowing you down.' },
  { icon: UserX, title: 'Developers are out of reach', body: 'Hiring takes months and agencies disappear. You need builders who ship.' },
  { icon: Timer, title: 'The clock is running', body: 'Every week without a working product is a week your competitors are not waiting.' },
];

const ENGINES = [
  { icon: Rocket, tag: 'MVP Engine', title: 'Idea to live product', body: 'A revenue-ready product in an average of 6 weeks, with a fixed scope and no surprises.', href: '/what-we-do/mvp-engine' },
  { icon: Settings, tag: 'Internal OS', title: 'Systems that run the business', body: 'Custom CRMs, dashboards and tools that save 20+ hours of manual work every week.', href: '/what-we-do/internal-os' },
  { icon: Zap, tag: 'Automation MVP', title: 'Workflows that never sleep', body: 'AI-powered automation that removes operational bottlenecks and runs 24/7.', href: '/what-we-do/automation-mvp' },
];

const STEPS = [
  { icon: Search, title: 'Discover', body: 'A free call to map the problem, scope and timeline.' },
  { icon: Hammer, title: 'Build', body: 'Async-first sprints with a working demo every week.' },
  { icon: Send, title: 'Ship', body: 'Launch on a stack that grows with you, IP fully yours.' },
  { icon: LifeBuoy, title: 'Support', body: 'Dedicated post-launch support so nothing breaks quietly.' },
];

const HomePage: NextPage = () => {
  const metrics = useLiveMetrics();
  const [showLoader, setShowLoader] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    // Show the loader only on the first visit or a refresh
    const isFirstVisit = sessionStorage.getItem('homePageVisited') === null;
    const isPageRefresh =
      !sessionStorage.getItem('navigationType') ||
      sessionStorage.getItem('navigationType') === 'refresh' ||
      (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';

    if (isFirstVisit || isPageRefresh) {
      setShowLoader(true);
      setLoaderGone(false);
      const timer = setTimeout(() => setShowLoader(false), 1500);
      sessionStorage.setItem('homePageVisited', 'true');
      sessionStorage.setItem('navigationType', 'refresh');
      return () => clearTimeout(timer);
    }
    setShowLoader(false);
    setLoaderGone(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('homePageVisited')) {
      sessionStorage.setItem('navigationType', 'navigation');
    }
  }, []);

  const handleFadeOut = useCallback(() => setLoaderGone(true), []);

  useEffect(() => {
    if (loaderGone) return;
    const failSafeTimer = setTimeout(() => setLoaderGone(true), 2500);
    return () => clearTimeout(failSafeTimer);
  }, [loaderGone]);

  const prefersReducedMotion = useReducedMotion();
  // Keep first paint deterministic and visible; enable motion only after mount.
  const shouldReduceMotion = !hasMounted || Boolean(prefersReducedMotion);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const t = setTimeout(() => testAnalytics(), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  // Header reads this flag to stay hidden behind the loader
  useEffect(() => {
    document.documentElement.setAttribute('data-loader-active', 'true');
  }, []);
  useEffect(() => {
    if (showLoader) document.documentElement.setAttribute('data-loader-active', 'true');
    else document.documentElement.removeAttribute('data-loader-active');
  }, [showLoader]);

  // Clear any service highlight when leaving the page
  useEffect(() => () => machine.setHover(-1), []);

  // phones have no hover: the engine card swiped to the middle of the row drives the machine
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const row = document.querySelector<HTMLElement>('[data-engine-row]');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-engine]'));
    if (!row || !cards.length) return;
    machine.setHover(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) machine.setHover(Number((e.target as HTMLElement).dataset.engine));
        }
      },
      { root: row, rootMargin: '0px -45% 0px -45%' }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        };

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.6, delay },
        };

  const eyebrow = 'text-halo text-sm font-semibold uppercase tracking-widest text-primary mb-3';
  const h2 = 'text-halo text-3xl md:text-5xl font-bold tracking-tight text-foreground';
  const grad = 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent';

  return (
    <div className="relative overflow-x-clip">
      {!loaderGone && <Loader show={showLoader} onFadeOut={handleFadeOut} />}
      <div className={loaderGone ? 'animate-fade-in' : 'opacity-0 pointer-events-none select-none'}>
        <PageBackdrop />
        {webgl && loaderGone && <MachineCanvas />}
        {webgl && loaderGone && <MachineHUD />}

        {/* STAGE 0: HERO. The machine is a whole core. */}
        <section
          data-stage="0"
          className="relative flex min-h-[100svh] items-start md:items-center px-6 md:px-12 lg:px-20 pt-0 md:pt-28 pb-16"
        >
          <div className="w-full max-w-7xl mx-auto">
            {/* phones: an empty band where the 3D planet sits as the hero visual */}
            {webgl && <div aria-hidden className="h-[34svh] md:hidden" />}
            <div className="max-w-2xl">
              <motion.div
                {...fadeUp(0)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs md:text-sm text-muted-foreground backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <LiveCounter value={metrics.projectsShipped} fallback="50+" suffix="+" /> projects shipped
              </motion.div>

              <motion.h1
                {...fadeUp(0.1)}
                className="text-halo mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
              >
                The operating system for <span className={grad}>startup execution</span>
              </motion.h1>

              <motion.p {...fadeUp(0.2)} className="text-halo mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                We bridge the execution gap for ambitious founders and teams, turning ideas into custom tools
                when no-code fails, devs are out of reach, or time is running out.
              </motion.p>

              <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  href="/contact"
                  variant="gradient-monotone"
                  className="px-7 py-4 text-base font-semibold rounded-2xl inline-flex items-center justify-center gap-2.5"
                >
                  <Target className="w-5 h-5" />
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  href="/proof"
                  variant="tertiary"
                  className="px-7 py-4 text-base font-medium rounded-2xl border border-border text-foreground hover:bg-muted inline-flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Explore our work
                </Button>
              </motion.div>

              <motion.dl {...fadeUp(0.4)} className="mt-12 grid grid-cols-3 gap-6 max-w-xl border-t border-border pt-6">
                {[
                  ['6 wks', 'Average time to MVP'],
                  ['100+', 'Founders served'],
                  ['24/7', 'Post-launch support'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="text-2xl md:text-3xl font-bold text-foreground">{value}</dt>
                    <dd className="mt-1 text-xs md:text-sm text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </motion.dl>

              {webgl && (
                <motion.p
                  {...fadeUp(0.6)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  <MousePointerClick className="w-3.5 h-3.5 text-primary" />
                  <span className="md:hidden">Tap for a shockwave. Press and hold for a surprise.</span>
                  <span className="hidden md:inline">Click for a shockwave. Press and hold for a surprise.</span>
                </motion.p>
              )}
            </div>
          </div>
        </section>

        {/* STAGE 1: THE PROBLEM. The core breaks apart. */}
        <section data-stage="1" className="relative flex min-h-[110svh] items-center px-6 md:px-12 lg:px-20 py-24">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div {...reveal()} className="max-w-3xl mx-auto text-center">
              <p className={eyebrow}>The problem</p>
              <h2 className={h2}>
                You have the idea. <span className={grad}>The execution is what&apos;s breaking.</span>
              </h2>
            </motion.div>
            <div className="mt-[28vh] grid md:grid-cols-3 gap-4 md:gap-6">
              {PAIN.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  {...reveal(i * 0.1)}
                  className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md"
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STAGE 2: THREE ENGINES. The shards snap into three machines. */}
        <section data-stage="2" className="relative flex min-h-[115svh] items-center px-6 md:px-12 lg:px-20 py-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[85svh]">
            <motion.div {...reveal()} className="max-w-3xl mx-auto text-center">
              <p className={eyebrow}>What we do</p>
              <h2 className={h2}>
                Three engines. <span className={grad}>One operating system.</span>
              </h2>
              <p className="text-halo mt-4 text-muted-foreground md:text-lg">
                A cube that ships, a gyroscope that runs the business, a loop that never stops.{' '}
                <span className="md:hidden">Swipe the cards to switch engines.</span>
                <span className="hidden md:inline">Hover a card to power up its engine.</span>
              </p>
            </motion.div>

            {/* phones: a swipe row, so the engine above stays in view while the cards change it */}
            <div
              data-engine-row
              className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 mt-[30vh] md:mt-[24vh] -mx-6 px-6 md:mx-0 md:px-0 pt-1 pb-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {ENGINES.map(({ icon: Icon, tag, title, body, href }, i) => (
                <a
                  key={tag}
                  href={href}
                  data-engine={i}
                  onMouseEnter={() => machine.setHover(i)}
                  onMouseLeave={() => machine.setHover(-1)}
                  onFocus={() => machine.setHover(i)}
                  onBlur={() => machine.setHover(-1)}
                  className="group w-[82%] shrink-0 snap-center md:w-auto rounded-2xl border border-border bg-card/75 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-primary">
                    0{i + 1} · {tag}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-foreground">{title}</span>
                  <span className="mt-2 block text-sm text-muted-foreground leading-relaxed">{body}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* STAGE 3: HOW IT WORKS. The engines become a pipeline. */}
        <section data-stage="3" className="relative flex min-h-[110svh] items-center px-6 md:px-12 lg:px-20 py-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80svh]">
            <motion.div {...reveal()} className="max-w-3xl mx-auto text-center">
              <p className={eyebrow}>How it works</p>
              <h2 className={h2}>
                From first call to <span className={grad}>live product</span>
              </h2>
            </motion.div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-[26vh]">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <motion.li
                  key={title}
                  {...reveal(i * 0.08)}
                  className="ml-12 sm:ml-0 rounded-2xl border border-border bg-card/75 p-6 backdrop-blur-md"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground">0{i + 1}</span>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROOF: existing sections, unchanged */}
        <SocialProofSection />
        <EnhancedTestimonialsCarousel />

        {/* STAGE 4: CTA. Everything converges back into the core. */}
        <section
          data-stage="4"
          className="relative flex min-h-[100svh] items-end justify-center px-6 md:px-12 lg:px-20 pt-24 pb-24"
        >
          <motion.div
            {...reveal()}
            className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/70 p-8 md:p-14 backdrop-blur-md"
          >
            <h2 className={h2}>
              Ready to <span className={grad}>execute your vision?</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Stop planning. Start building. Let&apos;s turn your idea into a tool that drives growth.
            </p>
            <Button
              href="/contact"
              variant="gradient-monotone"
              className="mt-8 px-8 py-4 text-base md:text-lg font-semibold rounded-2xl inline-flex items-center gap-3"
            >
              Get your free execution roadmap
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
