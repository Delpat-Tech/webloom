# Delpat API Documentation

This document outlines the API endpoints and Mongoose data models used in the **Delpat** project. It includes complete information about leads, testimonials, projects, and case studies.

---

## 📦 Data Models

### 1. Case Study Model

**File**: `src/lib/models/CaseStudy.ts`

```ts
export interface ICaseStudy extends Document {
  title: string;
  summary: string;
  projectId: mongoose.Types.ObjectId;
  challenge: string;
  solution: string;
  results: string;
  founderVerified: boolean;
  videoTestimonialUrl?: string;
}

const CaseStudySchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: { type: String, required: true },
  founderVerified: { type: Boolean, default: false },
  videoTestimonialUrl: { type: String },
});
```

### 2. Lead Model

**File**: `src/lib/models/Lead.ts`

```ts
export interface ILead extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  page: string;
  dateSubmitted: Date;
}

const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  role: { type: String },
  projectType: { type: String },
  timeline: { type: String },
  budget: { type: String },
  message: { type: String },
  page: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});
```

### 3. Project Model

**File**: `src/lib/models/Project.ts`

```ts
export interface IProject extends Document {
  title: string;
  summary: string;
  tags: string[];
  date: Date;
  persona: string;
  service: string;
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
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true },
  persona: { type: String },
  service: { type: String },
  industry: { type: String },
  metrics: {
    revenueImpact: { type: Number },
    timeSaved: { type: String },
    otherKPI: { type: String },
  },
  testimonials: [{
    author: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
  }],
  videoUrl: { type: String },
  linkedInPostUrl: { type: String },
  mediumPostUrl: { type: String },
  caseStudyIds: [{ type: Schema.Types.ObjectId, ref: 'CaseStudy' }],
});
```

### 4. Testimonial Model

**File**: `src/lib/models/Testimonial.ts`

```ts
export interface ITestimonial extends Document {
  clientName: string;
  role: string;
  quote: string;
  photoUrl?: string;
  createdAt: Date;
}

const TestimonialSchema = new Schema({
  clientName: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  photoUrl: { type: String },
});
```

---

## 🌐 API Endpoints

### Leads API

**File**: `src/app/api/leads/route.ts`

#### `GET /api/leads`

* Fetches all leads.
* Returns: Array of lead documents.

#### `POST /api/leads`

* Creates a new lead with required fields: `name`, `email`, `page`.
* Validates email format.
* Returns: Created lead document or error.

---

### Testimonials API

**File**: `src/app/api/testimonials/route.ts`

#### `GET /api/testimonials`

* Returns all testimonials.

#### `POST /api/testimonials`

* Requires `x-api-key` header.
* Body fields: `clientName`, `role`, `quote`, `photoUrl` (optional).
* Returns: New testimonial document or error.

---

### Projects API

**File**: `src/app/api/projects/route.ts`

#### `GET /api/projects`

* Supports filters: `persona`, `service`, `industry`.
* Returns: Projects with populated `caseStudyIds`.

#### `POST /api/projects`

* Creates a new project.
* Required fields: `title`, `summary`, `tags`, `date`.
* Returns: New project document or validation error.

---

### Project by ID API

**File**: `src/app/api/projects/[id]/route.ts`

#### `GET /api/projects/:id`

* Fetch project by ID with populated `caseStudyIds`.
* Returns: Single project object or error.

#### `POST /api/projects/:id`

* (Same logic reused erroneously as the general POST. Likely placeholder)
* Creates a new project (should be PATCH/PUT ideally).

---
