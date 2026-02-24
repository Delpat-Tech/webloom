import mongoose, { Schema, Document } from 'mongoose';

export interface IUTMModel {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface ILandingEvent {
  id: string;
  time: Date;
}

export interface ILandingTracking extends Document {
  utm: IUTMModel;
  name: string;
  type: string;
  amountOfLanding: number;
  landingEvents: ILandingEvent[];
}

const UTMModelSchema = new Schema<IUTMModel>(
  {
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    utm_content: { type: String },
    utm_term: { type: String },
  },
  { _id: false }
);

const LandingEventSchema = new Schema<ILandingEvent>(
  {
    id: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now },
  },
  { _id: false }
);

const LandingTrackingSchema: Schema = new Schema(
  {
    utm: { type: UTMModelSchema, default: {} },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    amountOfLanding: { type: Number, required: true, default: 0, min: 0 },
    landingEvents: { type: [LandingEventSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default
  mongoose.models.LandingTracking ||
  mongoose.model<ILandingTracking>('LandingTracking', LandingTrackingSchema);
