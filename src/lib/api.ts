import connectDB from './db';
import Lead from './models/Lead';
import Project from './models/Project';
import Testimonial from './models/Testimonial';
import CaseStudy from './models/CaseStudy';

// Database service functions (server-side only)
export class DatabaseService {
  // Lead operations
  static async createLead(leadData: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    page: string;
  }) {
    await connectDB();
    return await Lead.create({
      ...leadData,
      dateSubmitted: new Date(),
    });
  }

  static async getLeads() {
    await connectDB();
    return await Lead.find({}).lean();
  }

  // Project operations
  static async getProjects(filters?: {
    persona?: string;
    service?: string;
    industry?: string;
  }) {
    await connectDB();
    
    const filter: any = {};
    if (filters?.persona) filter.persona = { $regex: filters.persona, $options: 'i' };
    if (filters?.service) filter.service = { $regex: filters.service, $options: 'i' };
    if (filters?.industry) filter.industry = { $regex: filters.industry, $options: 'i' };
    
    return await Project.find(filter).populate('caseStudyIds').lean();
  }

  static async getProjectById(id: string) {
    await connectDB();
    return await Project.findById(id).populate('caseStudyIds').lean();
  }

  static async createProject(projectData: any) {
    await connectDB();
    return await Project.create(projectData);
  }

  // Testimonial operations
  static async getTestimonials() {
    await connectDB();
    return await Testimonial.find({}).lean();
  }

  static async createTestimonial(testimonialData: {
    clientName: string;
    role: string;
    quote: string;
    photoUrl?: string;
  }) {
    await connectDB();
    return await Testimonial.create(testimonialData);
  }

  // Case Study operations
  static async getCaseStudies() {
    await connectDB();
    return await CaseStudy.find({}).lean();
  }

  static async getCaseStudyById(id: string) {
    await connectDB();
    return await CaseStudy.findById(id).lean();
  }
}

// Export types for better type safety
export type { ILead } from './models/Lead';
export type { IProject } from './models/Project';
export type { ITestimonial } from './models/Testimonial';
export type { ICaseStudy } from './models/CaseStudy'; 