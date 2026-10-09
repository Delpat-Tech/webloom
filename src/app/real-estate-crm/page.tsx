'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Bell, Building2, Check, FileText, Inbox, Languages, LineChart, MapPin,
  PhoneCall, Play, Smartphone, Upload, Users,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import CTASection from '@/components/sections/CTASection';

// The product page for the real estate CRM. Every claim below is something the
// product does today; the screens and the video are the real app, on a demo
// firm whose names and numbers are all invented.

const CONTACT = '/contact?service=real-estate-crm';
const IMG = '/real-estate-crm';

function Shot({ src, alt, w, h, priority = false, className = '' }: {
  src: string; alt: string; w: number; h: number; priority?: boolean; className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary/25 via-secondary/10 to-accent/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <Image src={`${IMG}/${src}`} alt={alt} width={w} height={h} priority={priority}
          sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
      </div>
    </div>
  );
}

function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-2xl ${className}`}>
      <Image src={`${IMG}/${src}`} alt={alt} width={780} height={1688} sizes="240px" className="h-auto w-full" />
    </div>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{children}</p>;
}

const FEATURES = [
  {
    eyebrow: 'Leads and follow-ups',
    title: 'Nobody waits for a call back.',
    points: [
      'Portal and website enquiries become leads and go to your agents in turn.',
      'Lists that need action today: not contacted, going cold, follow-up overdue.',
      'A buyer who enquires again is added to their existing lead, not created twice.',
      'Every call, message, remark and site visit stays on the lead.',
    ],
    img: { src: 'leads.webp', w: 1968, h: 1050, alt: 'The leads list: requirement, budget, stage, source, agent and next follow-up for each lead' },
  },
  {
    eyebrow: 'Calling owners',
    title: 'Win listings project by project.',
    points: [
      'A calling list of property owners, grouped by project and tower.',
      'Call outcomes such as not received, switched off, interested and key received.',
      'Callbacks come back on the agent’s list when they are due.',
      'Hand a whole project to an agent in one step.',
    ],
    img: { src: 'calling.webp', w: 1968, h: 1050, alt: 'The owner calling list grouped by project, with owners left to call and the agent on each' },
  },
  {
    eyebrow: 'Listings',
    title: 'Send a flat on WhatsApp in one tap.',
    points: [
      'Flats, offices, shops and warehouses, for sale or rent, by project, tower and unit.',
      'Photos and videos carry your firm’s logo and name.',
      'One photo link per listing. It shows the photos only: no price, flat number or owner.',
      'Each lead shows the listings that match what they asked for.',
    ],
    img: { src: 'listing.webp', w: 1968, h: 1050, alt: 'A listing with its photos, each marked with the firm’s name, and a Copy photo link button' },
  },
  {
    eyebrow: 'For the owner',
    title: 'See who is working the book.',
    points: [
      'Each agent’s calls, pickups and status changes, for today, 7 or 30 days.',
      'Missed follow-ups and uncalled leads, counted per agent.',
      'Move someone’s work to a colleague when they are away or leave.',
      'Agents see only their own leads. Owners and managers see everything.',
    ],
    img: { src: 'performance.webp', w: 1968, h: 1050, alt: 'Team performance: people contacted, calls, pickups and missed follow-ups per agent' },
  },
];

const ALSO = [
  { icon: MapPin, title: 'Site visits with proof', text: 'Logged with a selfie and the phone’s location.' },
  { icon: FileText, title: 'Rent and sale deals', text: 'Agreements with documents, and a reminder 30 days before a rent ends.' },
  { icon: Bell, title: 'Notifications', text: 'A new lead, a follow-up due, a visit coming up, a buyer enquiring again.' },
  { icon: Languages, title: 'English and Marathi', text: 'WhatsApp messages written for your agents, in either language.' },
  { icon: Upload, title: 'Import from Excel', text: 'Checked before anything is saved, with a reason for every row left out, and undo.' },
  { icon: Users, title: 'Roles', text: 'Owner, manager and agent, each with their own home screen.' },
];

const SOURCES = [
  { name: '99acres', text: 'Enquiries arrive as leads, assigned to an agent.' },
  { name: 'MagicBricks', text: 'Enquiries arrive as leads, assigned to an agent.' },
  { name: 'Housing.com', text: 'Enquiries arrive as leads, assigned to an agent.' },
  { name: 'Your website', text: 'Any form that can send to a web address (a webhook).' },
  { name: 'Excel and CSV', text: 'Bring in the leads, owners and listings you already have.' },
  { name: 'WhatsApp and calls', text: 'Open on the agent’s own phone, with the message ready.' },
];

export default function RealEstateCrmPage() {
  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" /> Product · Real Estate CRM
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
              Every enquiry, call and listing,{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">in one place.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Portal enquiries arrive on their own and go to an agent. Agents see who to call next and record what
              happened. You see, per agent, what was done and what was missed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={CONTACT} variant="gradient-monotone"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold">
                Book a demo <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="#demo" variant="tertiary"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-7 py-4 text-base font-medium">
                <Play className="h-4 w-4" /> Watch the demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">For brokers, channel partners and developers’ sales teams in India.</p>
          </Reveal>
          <Reveal className="relative">
            <Shot src="dashboard.webp" w={3200} h={1800} priority
              alt="The owner’s dashboard: leads not contacted, follow-ups overdue, leads by source and the calling queue" />
            <Phone src="phone-today.webp" alt="An agent’s day on the phone: overdue follow-ups, each with a call button"
              className="absolute -bottom-10 -right-2 hidden w-[30%] max-w-[200px] sm:block md:-right-6" />
          </Reveal>
        </div>
      </section>

      {/* The problem */}
      <section className="border-y border-border bg-card/30 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold text-foreground md:text-3xl">Most firms run on four inboxes and a notebook.</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: Inbox, title: 'Leads are everywhere', text: 'Portal dashboards, WhatsApp, calls, walk-ins and spreadsheets. Some enquiries are never called.' },
              { icon: PhoneCall, title: 'Follow-ups depend on memory', text: 'A promised call back lives in a diary. When it is missed, nobody finds out until the buyer has moved on.' },
              { icon: LineChart, title: 'The owner can’t see the work', text: 'Who called whom, what came of it, and which leads nobody has touched takes a round of phone calls to find out.' },
            ].map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Demo video */}
      <section id="demo" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Eyebrow>Demo</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">See it working.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              One minute: an overdue follow-up, a call recorded, a listing and the team’s day, on a demo firm.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-br from-primary/25 via-secondary/10 to-accent/25 blur-2xl" />
              <video className="relative w-full rounded-2xl border border-border bg-black shadow-2xl"
                controls preload="metadata" playsInline poster={`${IMG}/demo-poster.jpg`}>
                <source src={`${IMG}/demo.mp4`} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 pb-8 md:px-8">
        <div className="mx-auto max-w-6xl space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <Eyebrow>{f.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">{f.title}</h2>
                <ul className="mt-6 space-y-3">
                  {f.points.map(p => (
                    <li key={p} className="flex gap-3 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 flex-none text-accent" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className={i % 2 ? 'lg:order-1' : ''}>
                <Shot src={f.img.src} w={f.img.w} h={f.img.h} alt={f.img.alt} />
              </Reveal>
            </div>
          ))}

          {/* On the phone */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>On the phone</Eyebrow>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Built for agents between calls.</h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Installs on Android and iPhone from the browser. No app store.',
                  'The day as one list: overdue first, then what is due today.',
                  'One tap to call, then record what happened and when to call next.',
                ].map(p => (
                  <li key={p} className="flex gap-3 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 flex-none text-accent" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="flex justify-center">
              <Phone src="phone-today.webp" alt="An agent’s Today screen on a phone, listing overdue follow-ups with a call button on each"
                className="w-full max-w-[280px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Also included */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal><h2 className="text-2xl font-bold text-foreground md:text-3xl">Also included</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALSO.map(({ icon: Icon, title, text }) => (
              <Reveal key={title} className="rounded-2xl border border-border bg-card/50 p-6">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead sources */}
      <section className="border-y border-border bg-card/30 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Lead sources</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Where your leads come from.</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Each source gets its own key, and every enquiry is stored the moment it arrives.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOURCES.map(s => (
              <Reveal key={s.name} className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* White-label */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>White-label</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Your firm’s name on every screen.</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Your name, logo and colour in the app and on your own sign-in page.',
                'The app installs on phones with your logo as its icon.',
                'Listing photos and shared photo links carry your brand.',
                'Each firm’s data is kept separate. Delpat appears only as a small “Powered by”.',
              ].map(p => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 flex-none text-accent" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <Shot src="signin.webp" w={3200} h={1800} alt="The firm’s own sign-in page, with its name and logo" />
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal><h2 className="text-2xl font-bold text-foreground md:text-3xl">Who it’s for</h2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Building2, title: 'Brokers and agencies', text: 'Resale and rentals, residential and commercial: portal leads, owner calling, listings and rent agreements.' },
              { icon: Users, title: 'Channel partners', text: 'Many projects and towers at once, with leads and inventory grouped by project.' },
              { icon: Smartphone, title: 'Developers’ sales teams', text: 'Portal and website enquiries shared across the team, with follow-ups and visits visible per person.' },
            ].map(({ icon: Icon, title, text }) => (
              <Reveal key={title} className="rounded-2xl border border-border bg-card/50 p-6">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="See it with your own leads."
        subtitle="We’ll walk you through it and answer how it would fit your team."
        buttonText="Book a demo"
        href={CONTACT}
      />
    </main>
  );
}
