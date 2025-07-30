'use client';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ServiceTrack } from '@/types';
import { Send, Settings, Zap, CheckCircle, Clock, Target, Award } from 'react-feather';

const serviceTracks: ServiceTrack[] = [
  {
    id: 'mvp-engine',
    title: 'The MVP Engine',
    description: 'Go from idea to live product in 6 weeks. Fixed timeline, fixed cost, zero surprises.',
    startingPrice: '₹40,000',
    benefits: [
      'Deploy to production in 6 weeks',
      'Fixed scope, no surprises',
      'Ready for users and investors'
    ],
    icon: <Send className="w-8 h-8" />, // icon color handled by ServiceCard
    gradient: 'from-primary to-accent',
    features: [
      'Complete MVP development',
      'User authentication system',
      'Database design & setup',
      'API development',
      'Basic UI/UX design',
      'Deployment & hosting setup',
      'Testing & QA',
      '4 weeks post-launch support'
    ],
    timeline: '6 weeks',
    outcome: 'A fully functional MVP ready for real users and investor demos'
  },
  {
    id: 'internal-os',
    title: 'The Internal OS',
    description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
    startingPrice: '₹20,000',
    benefits: [
      'Custom dashboards and workflows',
      'API integrations that actually work',
      'Role-based access control'
    ],
    icon: <Settings className="w-8 h-8" />, // icon color handled by ServiceCard
    gradient: 'from-secondary to-primary',
    features: [
      'Custom internal dashboards',
      'Workflow automation',
      'API integrations',
      'User role management',
      'Data synchronization',
      'Reporting & analytics',
      'Training & documentation',
      '6 weeks ongoing support'
    ],
    timeline: '4-5 weeks',
    outcome: 'Streamlined operations saving 20+ hours weekly'
  },
  {
    id: 'automation-mvp',
    title: 'The Automation MVP',
    description: 'Save ₹5k+ monthly in operational costs. AI-powered workflows that work 24/7.',
    startingPrice: '₹8,000',
    benefits: [
      'AI agents for data processing',
      'Complex n8n/Make.com pipelines',
      'Error handling and monitoring'
    ],
    icon: <Zap className="w-8 h-8" />, // icon color handled by ServiceCard
    gradient: 'from-accent to-primary',
    features: [
      'AI workflow automation',
      'Data processing pipelines',
      'Error handling & monitoring',
      'Integration with existing tools',
      'Performance optimization',
      'Automated reporting',
      'Alert systems',
      '3 months monitoring'
    ],
    timeline: '2-3 weeks',
    outcome: 'Automated workflows saving ₹5k+ monthly'
  }
];

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = await params;
  const service = serviceTracks.find((s) => s.id === slug);
  if (!service) return notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 dark:opacity-40 blur-sm scale-110`}></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${service.gradient} text-primary-foreground mb-6 shadow-2xl border-4 border-border/30 dark:border-border/60`}>
              {service.icon}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Price Card */}
          <div className="max-w-md mx-auto bg-card border-2 border-accent/30 dark:border-accent/50 rounded-2xl p-8 shadow-xl backdrop-blur-md">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-medium text-accent uppercase tracking-wide">Starting at</span>
              </div>
              <div className="text-4xl font-bold text-primary mb-4">{service.startingPrice}</div>
              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Features Section */}
          <div className="h-full flex flex-col">
            <div className="bg-card border-2 border-primary/10 dark:border-primary/30 rounded-2xl p-8 shadow-md h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">What's Included</h2>
              </div>
              <div className="grid gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted/30 hover:bg-muted/70 dark:hover:bg-muted/50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline & Outcome */}
          <div className="h-full flex flex-col gap-8">
            {/* Timeline Card */}
            <div className="bg-card border-2 border-accent/20 dark:border-accent/40 rounded-2xl p-8 shadow-md flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Timeline</h2>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${service.gradient} text-primary-foreground text-2xl font-bold mb-4 shadow-lg border-4 border-border/40 dark:border-border/60`}>
                  {service.timeline.split(' ')[0]}
                </div>
                <p className="text-lg text-muted-foreground font-medium">{service.timeline}</p>
              </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-card border-2 border-primary/10 dark:border-primary/30 rounded-2xl p-8 shadow-md flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Expected Outcome</h2>
              </div>
              <div className="relative p-6 rounded-xl bg-muted/60 dark:bg-muted/40 border border-accent/20 dark:border-accent/40 shadow-sm">
                <p className="text-foreground font-medium text-lg leading-relaxed">
                  {service.outcome.replace("don't", "don&apos;t").replace("doesn't", "doesn&apos;t").replace("it's", "it&apos;s").replace("Let's", "Let&apos;s").replace("won't", "won&apos;t").replace("can't", "can&apos;t").replace("you're", "you&apos;re").replace("we're", "we&apos;re").replace("they're", "they&apos;re").replace("isn't", "isn&apos;t").replace("aren't", "aren&apos;t").replace("hasn't", "hasn&apos;t").replace("haven't", "haven&apos;t").replace("hadn't", "hadn&apos;t").replace("wouldn't", "wouldn&apos;t").replace("shouldn't", "shouldn&apos;t").replace("couldn't", "couldn&apos;t").replace("mustn't", "mustn&apos;t").replace("mightn't", "mightn&apos;t").replace("needn't", "needn&apos;t").replace("I'll", "I&apos;ll").replace("you'll", "you&apos;ll").replace("he'll", "he&apos;ll").replace("she'll", "she&apos;ll").replace("we'll", "we&apos;ll").replace("they'll", "they&apos;ll").replace("it'll", "it&apos;ll").replace("who'll", "who&apos;ll").replace("that'll", "that&apos;ll").replace("there's", "there&apos;s").replace("here's", "here&apos;s").replace("what's", "what&apos;s").replace("where's", "where&apos;s").replace("who's", "who&apos;s").replace("how's", "how&apos;s").replace("let's", "let&apos;s")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className={`inline-block p-8 rounded-3xl bg-gradient-to-r ${service.gradient} from-accent to-primary shadow-xl border-2 border-accent/30 dark:border-accent/50`}>
            <h3 className="text-2xl font-bold text-primary-foreground mb-4 drop-shadow">Ready to get started?</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Let&apos;s discuss your project and create a custom solution that fits your needs perfectly.
            </p>
            <button
              className={`inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-primary text-accent-foreground font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border-2 border-border/20 dark:border-border/40`}
              onClick={() => router.push('/contact')}
            >
              <Send className="w-5 h-5" />
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}