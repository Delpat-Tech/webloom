import mongoose, { Schema, Document } from 'mongoose';

type HeadlineMetricIcon = 'arrow-up' | 'arrow-down' | 'check';
type RelationshipStatus = 'First Project' | 'Follow-up' | 'Ongoing';
type Persona = 'Ankit' | 'Priya' | 'Karan' | 'Mixed';
type ServiceTrack = 'Product MVP' | 'Internal OS' | 'Automation MVP' | 'Custom' | 'R&D';

export interface IPortfolioProject extends Document {
  id: string;
  cardTitle: string;
  client: {
    name: string;
    location?: string;
    publiclyUsable: boolean;
  };
  relationship?: {
    status: RelationshipStatus;
    summary: string;
  };
  story: {
    problem: string;
    impact: {
      time?: string;
      money?: string;
      risk?: string;
    };
    previousSolution?: string;
  };
  execution: {
    coreMandate: string;
    smartMoment: string;
    features: string[];
  };
  outcome: {
    headlineMetric: {
      value: string;
      label: string;
      icon: HeadlineMetricIcon;
    };
    otherMetrics?: string[];
    qualitativeWins: string[];
    clientQuote?: {
      text: string;
      attribution: string;
    };
  };
  meta: {
    persona: Persona;
    serviceTrack: ServiceTrack;
    featured: boolean;
    tags?: string[];
    links: {
      live?: string;
      github?: string;
      caseStudy: string;
    };
  };
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    deployment?: string[];
    integrations?: string[];
    platforms?: string[];
  };
  hasGallery?: boolean;
  gallery?: string[];
}

const PortfolioProjectSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  cardTitle: { type: String, required: true },
  client: {
    name: { type: String, required: true },
    location: { type: String, required: false },
    publiclyUsable: { type: Boolean, required: true },
  },
  relationship: {
    status: {
      type: String,
      enum: ['First Project', 'Follow-up', 'Ongoing'],
      required: false,
    },
    summary: { type: String, required: false },
  },
  story: {
    problem: { type: String, required: true },
    impact: {
      time: { type: String, required: false },
      money: { type: String, required: false },
      risk: { type: String, required: false },
    },
    previousSolution: { type: String, required: false },
  },
  execution: {
    coreMandate: { type: String, required: true },
    smartMoment: { type: String, required: true },
    features: { type: [String], required: true },
  },
  outcome: {
    headlineMetric: {
      value: { type: String, required: true },
      label: { type: String, required: true },
      icon: {
        type: String,
        enum: ['arrow-up', 'arrow-down', 'check'],
        required: true,
      },
    },
    otherMetrics: { type: [String], required: false },
    qualitativeWins: { type: [String], required: true },
    clientQuote: {
      text: { type: String, required: false },
      attribution: { type: String, required: false },
    },
  },
  meta: {
    persona: {
      type: String,
      enum: ['Ankit', 'Priya', 'Karan', 'Mixed'],
      required: true,
    },
    serviceTrack: {
      type: String,
      enum: ['Product MVP', 'Internal OS', 'Automation MVP', 'Custom', 'R&D'],
      required: true,
    },
    featured: { type: Boolean, required: true },
    tags: { type: [String], required: false },
    links: {
      live: { type: String, required: false },
      github: { type: String, required: false },
      caseStudy: { type: String, required: true },
    },
  },
  techStack: {
    frontend: { type: [String], required: false },
    backend: { type: [String], required: false },
    database: { type: [String], required: false },
    deployment: { type: [String], required: false },
    integrations: { type: [String], required: false },
    platforms: { type: [String], required: false },
  },
  hasGallery: { type: Boolean, required: false },
  gallery: { type: [String], required: false },
});

export default mongoose.models.PortfolioProject || mongoose.model<IPortfolioProject>('PortfolioProject', PortfolioProjectSchema);
