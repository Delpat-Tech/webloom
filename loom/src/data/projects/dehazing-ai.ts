import { PortfolioItem } from '../portfolio-types';

export const dehazingAi: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'dehazing-ai',
  cardTitle: 'R&D: Real-Time Video Dehazing on Edge Devices',
  client: {
    name: 'Research Project',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Real-time video processing is computationally expensive. The challenge was to create a dehazing model that was both accurate and efficient enough to run on low-power edge devices like a Raspberry Pi.',
    impact: {},
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an end-to-end system for real-time image dehazing, with model inference happening on a self-hosted API and video processed on an edge device.',
    smartMoment: 'We architected a distributed system where the Raspberry Pi handled lightweight video capture and streaming, while a more powerful GPU machine handled the heavy lifting of model inference. This separation of concerns made real-time performance possible on cheap hardware.',
    features: [
      'Custom deep learning model for image dehazing',
      'Self-hosted API for optimized model inference',
      'Real-time video processing on a Raspberry Pi via WebSockets',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '15 FPS',
      label: 'Real-Time Video Processing on a Raspberry Pi 4',
      icon: 'check',
    },
    otherMetrics: [
      'Improved image clarity by 75% on a benchmark dataset',
    ],
    qualitativeWins: [
      'Proved capability in building complex, end-to-end AI systems that span from cloud infrastructure to edge computing.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'R&D',
    featured: false,
    links: {
      github: 'https://github.com/delpat/dehazing-ai', // NOTE: Placeholder URL
      caseStudy: '/proof/dehazing-ai',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['TensorFlow', 'OpenCV'],
    deployment: ['Raspberry Pi'],
    integrations: ['WebSocket'],
  },
};
