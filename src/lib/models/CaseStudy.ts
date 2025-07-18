import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  summary: string;
  projectId: mongoose.Types.ObjectId;
  challenge: string;
  solution: string;
  results: string;
  founderVerified: boolean;
  videoTestimonialUrl?: string;
}

const CaseStudySchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: { type: String, required: true },
  founderVerified: { type: Boolean, default: false },
  videoTestimonialUrl: { type: String, required: false },
});

export default mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);