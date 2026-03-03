import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
  key: string;
  number: number;
  label: string;
  icon: string;
  page: string[];
  order: number;
}

const StatSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, index: true },
  number: { type: Number, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  page: { type: [String], required: true },
  order: { type: Number, required: true },
});

export default mongoose.models.Stat || mongoose.model<IStat>('Stat', StatSchema);
