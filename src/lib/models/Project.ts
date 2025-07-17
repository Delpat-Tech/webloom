import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  summary: string;
  tags: string[];
  date: Date;
  persona: string;
  service: string;
  industry: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true },
  persona: { type: String, required: false },
  service: { type: String, required: false },
  industry: { type: String, required: false },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);