import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  summary: string;
  tags: string[];
  date: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);