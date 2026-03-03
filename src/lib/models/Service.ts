import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startingPrice: string;
  timeline: string;
  outcome: string;
}

const ServiceSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: String, required: true },
  timeline: { type: String, required: true },
  outcome: { type: String, required: true },
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
