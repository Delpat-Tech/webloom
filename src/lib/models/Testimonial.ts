import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  role: string;
  quote: string;
  photoUrl?: string;
  createdAt: Date; 
}

const TestimonialSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  photoUrl: { type: String },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);