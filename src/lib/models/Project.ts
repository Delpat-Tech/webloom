import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  summary: string;
  tags: string[];
  date: Date;
  persona: string;
  service: string;
  serviceId: string; // Add service ID for better linking
  industry: string;
   metrics: {
    revenueImpact?: number;
    timeSaved?: string;
    otherKPI?: string;
  };
  testimonials: {
    author: string;
    role: string;
    quote: string;
  }[];
  videoUrl?: string;
  linkedInPostUrl?: string;
  mediumPostUrl?: string;
  caseStudyIds: mongoose.Types.ObjectId[];
  hasCaseStudy: boolean; // Flag to indicate if case study exists
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true },
  persona: { type: String, required: false },
  service: { type: String, required: false },
  serviceId: { type: String, required: false },
  industry: { type: String, required: false },
metrics: {
    revenueImpact: { type: Number, required: false },
    timeSaved: { type: String, required: false },
    otherKPI: { type: String, required: false },
  },
  testimonials: [{
    author: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
  }],
  videoUrl: { type: String, required: false },
  linkedInPostUrl: { type: String, required: false },
  mediumPostUrl: { type: String, required: false },
  caseStudyIds: [{ type: Schema.Types.ObjectId, ref: 'CaseStudy', required: false }],
  hasCaseStudy: { type: Boolean, default: false },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);