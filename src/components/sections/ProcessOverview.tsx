import React from 'react';
import {
  MessageSquare,
  FileText,
  CheckCircle,
  Users,
  Code,
  Eye,
  Rocket
} from 'lucide-react';
import Timeline from '@/components/ui/Timeline';
import { TimelineStep } from '@/types';

const steps: TimelineStep[] = [
  {
    id: 1,
    title: 'Initial Contact',
    subtitle: 'The spark begins',
    description: 'Reach out via any channel. We respond within 24 hours with a clear next step - no automated responses, no ghosting.',
    icon: <MessageSquare className="w-8 h-8" />,
    duration: '24 hours',
    deliverables: ['Personal response', 'Discovery call scheduled', 'Initial requirements gathered'],
    color: 'from-primary to-accent',
  },
  {
    id: 2,
    title: 'Discovery & Scoping',
    subtitle: 'Understanding your vision',
    description: 'Deep dive into your goals, technical requirements, and constraints. We document everything in a shared workspace.',
    icon: <FileText className="w-8 h-8" />,
    duration: '2-3 days',
    deliverables: ['Detailed project scope', 'Technical architecture plan', 'Timeline & milestones', 'Fixed-price proposal'],
    color: 'from-primary to-accent',
  },
  {
    id: 3,
    title: 'Proposal & Agreement',
    subtitle: 'Clarity before commitment',
    description: "We present a clear, fixed-price proposal with all deliverables, timelines, and terms. You review, ask questions, and sign off only when you're 100% confident.",
    icon: <CheckCircle className="w-8 h-8" />,
    duration: '1-2 days',
    deliverables: ['Transparent proposal', 'No hidden fees', 'Mutual agreement'],
    color: 'from-accent to-primary',
  },
  {
    id: 4,
    title: 'Kickoff & Planning',
    subtitle: 'Setting the stage',
    description: "We align on communication channels, project tools, and key milestones. You'll meet your team and get access to your project dashboard.",
    icon: <Users className="w-8 h-8" />,
    duration: '1 day',
    deliverables: ['Kickoff call', 'Project dashboard access', 'Milestone calendar'],
    color: 'from-secondary to-accent',
  },
  {
    id: 5,
    title: 'Development Sprint',
    subtitle: 'Building your solution',
    description: "Rapid development with daily updates. You'll see progress in real-time through our shared project dashboard.",
    icon: <Code className="w-8 h-8" />,
    duration: '4-6 weeks',
    deliverables: ['Daily progress updates', 'Weekly demo sessions', 'Code reviews', 'Testing reports'],
    color: 'from-primary to-accent',
  },
  {
    id: 6,
    title: 'Review & QA',
    subtitle: 'Polish and perfection',
    description: 'We conduct thorough testing and review sessions with you. Feedback is implemented rapidly, ensuring everything meets your expectations.',
    icon: <Eye className="w-8 h-8" />,
    duration: '3-5 days',
    deliverables: ['Comprehensive QA', 'Client review sessions', 'Final adjustments'],
    color: 'from-accent to-secondary',
  },
  {
    id: 7,
    title: 'Launch & Handover',
    subtitle: 'Your success, delivered',
    description: "Seamless deployment with complete documentation. We don't disappear - ongoing support is always available.",
    icon: <Rocket className="w-8 h-8" />,
    duration: '1 week',
    deliverables: ['Production deployment', 'Complete documentation', 'Team training', '30-day support included'],
    color: 'from-primary to-accent',
  },
];

const ProcessOverview = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          How We Work: <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our 7-Step Process</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
          A proven async-first approach that delivers exceptional results through clear communication and systematic execution
        </p>
      </div>
      <Timeline steps={steps} />
    </div>
  );
};

export default ProcessOverview;