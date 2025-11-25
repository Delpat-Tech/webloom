# Webloom – Technical Documentation
Version: 1.0
Date: November 25, 2025
Authors: Delpat Engineering Team

## Overview
Webloom is a full-stack digital agency platform delivering:
- Content management for projects, case studies, and testimonials
- Lead capture and partner submission forms
- Analytics and performance monitoring
- Responsive UI with smooth animations and interactions
- SEO-optimized content and metadata management

## Tech Stack
- **Frontend**: React 19, TypeScript, TailwindCSS, Framer Motion, Three.js
- **Backend**: Node.js, Next.js 15 (App Router), MongoDB/Mongoose
- **Authentication**: Edge-CSRF protection, rate limiting
- **Datastores**: MongoDB (projects, leads, testimonials, case studies, partners)
- **Tools**: ESLint, PostCSS, TailwindCSS v4

## High-Level Architecture
SPA (React/Next.js) → API Routes → MongoDB.
Form submissions are captured and stored in MongoDB. Analytics and performance monitoring provide insights into user behavior.

## Project Structure
```
root/
│
├── src/
│   ├── app/                    # Next.js App Router structure
│   │   ├── api/                # API routes
│   │   ├── [page]/             # Individual page routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── analytics/          # Analytics providers
│   │   ├── layout/             # Layout components
│   │   ├── sections/           # Section components
│   │   └── ui/                 # UI components
│   ├── lib/                    # Business logic and utilities
│   │   ├── models/             # Mongoose models
│   │   ├── api.ts              # Database service functions
│   │   ├── db.ts               # Database connection
│   │   └── metadata.ts         # SEO metadata generation
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles and Tailwind config
│
├── public/                     # Static assets
├── middleware.ts               # Security middleware
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## Key server composition:
```typescript
// middleware.ts
const limiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

// Security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- npm or yarn

### Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/webloom
# or for MongoDB Atlas
# MONGODB_URI=your-mongodb+srv-uri-with-<password>
```

### Installation
```bash
npm install
```

### Development Run
```bash
npm run dev
```

### Production Run
```bash
npm run build
npm start
```

## Core Modules / Features

### Content Management
- Projects with metrics, testimonials, and case study links
- Case studies with challenge/solution/results structure
- Testimonials with client information
- Partners submissions with project details

### Lead Capture
- Contact forms with validation
- Partner submission forms with detailed project information

### Analytics & Performance
- Google Analytics integration
- Performance monitoring with Core Web Vitals
- Custom event tracking

### Security
- CSRF protection with edge-csrf
- Rate limiting with rate-limiter-flexible
- Security headers in middleware
- Input validation on all API routes

## APIs / Endpoints

### Base URL:
- Dev: http://localhost:3000/api
- Prod: https://yourdomain.com/api

### Leads
- GET /api/leads - Fetch all leads
- POST /api/leads - Create a new lead

### Projects
- GET /api/projects - Fetch all projects (with optional filtering by persona, service, industry)
- POST /api/projects - Create a new project

### Testimonials
- GET /api/testimonials - Fetch all testimonials
- POST /api/testimonials - Create a new testimonial

### Case Studies
- GET /api/case-studies - Fetch all case studies
- POST /api/case-studies - Create a new case study

### Partners
- GET /api/partners - Fetch all partners
- POST /api/partners - Create a new partner submission

## Database Schema

### Project
```typescript
interface IProject {
  title: string;
  summary: string;
  tags: string[];
  date: Date;
  persona: string;
  service: string;
  serviceId: string;
  industry: string;
  metrics: {
    revenueImpact?: number;
    timeSaved?: string;
    otherKPI?: string;
  };
  testimonials: {
    author: string;
    role: string;
    quote: string;
  }[];
  videoUrl?: string;
  linkedInPostUrl?: string;
  mediumPostUrl?: string;
  caseStudyIds: mongoose.Types.ObjectId[];
  hasCaseStudy: boolean;
}
```

### CaseStudy
```typescript
interface ICaseStudy {
  title: string;
  summary: string;
  projectId: mongoose.Types.ObjectId;
  challenge: string;
  solution: string;
  results: string;
  founderVerified: boolean;
  videoTestimonialUrl?: string;
}
```

### Lead
```typescript
interface ILead {
  name: string;
  email: string;
  company?: string;
  message?: string;
  page: string;
  dateSubmitted: Date;
}
```

### Testimonial
```typescript
interface ITestimonial {
  clientName: string;
  role: string;
  quote: string;
  photoUrl?: string;
}
```

### Partner
```typescript
interface IPartner {
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
```

## ER Model:
- Project 1 - * CaseStudy (via projectId)
- Project 1 - * Testimonial (embedded)
- User submissions stored as Lead and Partner documents

## Deployment Guide

### Local
Use the dev scripts above

### Cloud/Server
- MongoDB Atlas recommended
- API: run Node with Next.js production server
- Set NODE_ENV=production

### Build commands
- Dev: npm run dev
- Production build: npm run build
- Production start: npm start

## Security & Best Practices
- CSRF protection with edge-csrf
- Rate limiting with rate-limiter-flexible
- Security headers in middleware
- Input validation on all API routes
- MongoDB connection pooling
- Environment-based configuration

## Contributor Guide

### Coding Standards
- Backend: Clean API routes, early returns, TypeScript
- Frontend: Component composition, TypeScript, TailwindCSS

### Branching & Commits
- Branches: feature/*, fix/*, chore/*
- Conventional Commits: feat:, fix:, docs:, refactor:

### Testing
- Jest for backend testing
- React Testing Library for frontend components