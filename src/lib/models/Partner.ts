import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  projectType: string;
  timeline?: string;
  budget?: string;
  description: string;
  portfolio?: string;
  dateSubmitted: Date;
}

const PartnerSchema = new Schema<IPartner>({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  contactName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    trim: true,
  },
  timeline: {
    type: String,
    trim: true,
  },
  budget: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  portfolio: {
    type: String,
    trim: true,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema); 