import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  company?: string;
  // phone?: string;
  // role?: string;
  // projectType?: string;
  // timeline?: string;
  // budget?: string;
  message?: string;
  page: string;
  dateSubmitted: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  // phone: { type: String },
  // role: { type: String },
  // projectType: { type: String },
  // timeline: { type: String },
  // budget: { type: String },
  message: { type: String },
  page: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
