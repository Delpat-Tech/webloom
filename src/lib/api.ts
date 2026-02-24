import connectDB from './db';
import Lead from './models/Lead';
import Project from './models/Project';
import Testimonial from './models/Testimonial';
import CaseStudy from './models/CaseStudy';
import Partner from './models/Partner';
import LandingTracking from './models/LandingTracking';

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

  // Partner operations
  static async createPartner(partnerData: {
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
  }) {
    await connectDB();
    return await Partner.create({
      ...partnerData,
      dateSubmitted: new Date(),
    });
  }

  static async getPartners() {
    await connectDB();
    return await Partner.find({}).lean();
  }

  // Landing Tracking operations
  static async createLandingTracking(trackingData: {
    utm?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
      utm_term?: string;
    };
    name: string;
    type: string;
    amountOfLanding?: number;
    landingEvents?: Array<{
      id: string;
      time?: Date;
    }>;
  }) {
    await connectDB();
    return await LandingTracking.create({
      ...trackingData,
      amountOfLanding: trackingData.amountOfLanding ?? 0,
      landingEvents:
        trackingData.landingEvents?.map((event) => ({
          id: event.id,
          time: event.time ?? new Date(),
        })) ?? [],
    });
  }

  static async getLandingTrackings() {
    await connectDB();
    return await LandingTracking.find({}).sort({ createdAt: -1 }).lean();
  }

  static async updateLandingTracking(
    id: string,
    updateData: {
      utm?: {
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_content?: string;
        utm_term?: string;
      };
      name?: string;
      type?: string;
      amountOfLanding?: number;
      landingEvents?: Array<{
        id: string;
        time?: Date;
      }>;
      landingEvent?: {
        id: string;
        time?: Date;
      };
    }
  ) {
    await connectDB();

    const updateOps: Record<string, unknown> = {};

    if (updateData.utm) updateOps.utm = updateData.utm;
    if (updateData.name !== undefined) updateOps.name = updateData.name;
    if (updateData.type !== undefined) updateOps.type = updateData.type;
    if (updateData.amountOfLanding !== undefined) {
      updateOps.amountOfLanding = updateData.amountOfLanding;
    }

    if (updateData.landingEvents) {
      updateOps.landingEvents = updateData.landingEvents.map((event) => ({
        id: event.id,
        time: event.time ?? new Date(),
      }));
    }

    if (updateData.landingEvent) {
      updateOps.$push = {
        landingEvents: {
          id: updateData.landingEvent.id,
          time: updateData.landingEvent.time ?? new Date(),
        },
      };
    }

    return await LandingTracking.findByIdAndUpdate(id, updateOps, {
      new: true,
      runValidators: true,
    }).lean();
  }
}

// Export types for better type safety
export type { ILead } from './models/Lead';
export type { IProject } from './models/Project';
export type { ITestimonial } from './models/Testimonial';
export type { ICaseStudy } from './models/CaseStudy'; 
export type { ILandingTracking } from './models/LandingTracking';