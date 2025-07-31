import { NextResponse, NextRequest } from 'next/server';

// Mock data for related content
const relatedContent = {
  projects: [
    {
      id: 'omega-forex-trading',
      title: 'Omega Forex Trading App',
      serviceId: 'mvp-engine',
      hasCaseStudy: true
    },
    {
      id: 'omega-forex-crm',
      title: 'CRM for Omega Forex',
      serviceId: 'internal-os',
      hasCaseStudy: true
    }
  ],
  caseStudies: [
    {
      id: 'omega-forex-trading',
      title: 'Omega Forex Trading App',
      projectId: 'omega-forex-trading',
      serviceId: 'mvp-engine'
    },
    {
      id: 'omega-forex-crm',
      title: 'CRM for Omega Forex',
      projectId: 'omega-forex-crm',
      serviceId: 'internal-os'
    }
  ],
  services: [
    {
      id: 'mvp-engine',
      title: 'MVP Engine',
      slug: 'mvp-engine'
    },
    {
      id: 'internal-os',
      title: 'Internal OS',
      slug: 'internal-os'
    },
    {
      id: 'automation-hub',
      title: 'Automation Hub',
      slug: 'automation-hub'
    }
  ]
};

// GET: Fetch related content
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'project', 'case-study', 'service'
    const id = searchParams.get('id');
    const serviceId = searchParams.get('serviceId');
    
    if (type === 'project' && id) {
      // Get related case study and service for a project
      const project = relatedContent.projects.find(p => p.id === id);
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      
      const caseStudy = relatedContent.caseStudies.find(cs => cs.projectId === id);
      const service = relatedContent.services.find(s => s.id === project.serviceId);
      
      return NextResponse.json({
        project,
        caseStudy,
        service
      }, { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      });
    }
    
    if (type === 'case-study' && id) {
      // Get related project and service for a case study
      const caseStudy = relatedContent.caseStudies.find(cs => cs.id === id);
      if (!caseStudy) {
        return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
      }
      
      const project = relatedContent.projects.find(p => p.id === caseStudy.projectId);
      const service = relatedContent.services.find(s => s.id === caseStudy.serviceId);
      
      return NextResponse.json({
        caseStudy,
        project,
        service
      }, { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      });
    }
    
    if (type === 'service' && serviceId) {
      // Get related projects and case studies for a service
      const service = relatedContent.services.find(s => s.id === serviceId);
      if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      
      const projects = relatedContent.projects.filter(p => p.serviceId === serviceId);
      const caseStudies = relatedContent.caseStudies.filter(cs => cs.serviceId === serviceId);
      
      return NextResponse.json({
        service,
        projects,
        caseStudies
      }, { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      });
    }
    
    // Return all related content
    return NextResponse.json(relatedContent, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching related content:', errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
} 