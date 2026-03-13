import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/api";
import { osRequest } from "@/lib/os-client";

// GET handler — reads directly from local DB
export async function GET(_req: NextRequest) {
  try {
    const leads = await DatabaseService.getLeads();
    return NextResponse.json(leads, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching leads:", errorMessage);
    return NextResponse.json(
      { message: "Failed to fetch leads", error: errorMessage },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, page, utm_source, utm_medium, utm_campaign, utm_content, utm_term, landing_page_url } = await req.json();

    // validate required fields
    if (!name || !email || !page) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          details: "name, email, and page are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          details: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Always persist lead locally first so form submission does not depend on OS availability.
    const localLead = await DatabaseService.createLead({
      name,
      email,
      company,
      message,
      page,
    });

    // Forward lead to Delpat OS via public ingest endpoint (best effort)
    const osUrl = process.env.DELPAT_OS_URL;
    const ingestKey = process.env.DELPAT_OS_INGEST_KEY || process.env.WEBSITE_INGEST_API_KEY;

    let osIngestStatus: 'synced' | 'skipped' | 'failed' = 'skipped';

    if (osUrl) {
      try {
        await osRequest('POST', '/api/public/lead-ingest', {
          name,
          email,
          company,
          message,
          form_type: page,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          landing_page_url,
        });
        osIngestStatus = 'synced';
      } catch (ingestErr) {
        if (ingestKey) {
          try {
            const res = await fetch(`${osUrl}/api/public/lead-ingest`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-delpat-ingest-key': ingestKey,
              },
              body: JSON.stringify({
                name,
                email,
                company,
                message,
                form_type: page,
                utm_source,
                utm_medium,
                utm_campaign,
                utm_content,
                utm_term,
                landing_page_url,
              }),
            });

            if (!res.ok) {
              const text = await res.text();
              osIngestStatus = 'failed';
              console.error(`OS ingest failed (${res.status}): ${text}`);
            } else {
              osIngestStatus = 'synced';
            }
          } catch (fallbackErr) {
            osIngestStatus = 'failed';
            const fallbackMessage = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown error';
            console.error('OS ingest request failed (oauth + key fallback):', fallbackMessage);
          }
        } else {
          osIngestStatus = 'failed';
          const message = ingestErr instanceof Error ? ingestErr.message : 'Unknown error';
          console.error('OS ingest request failed (oauth only):', message);
        }
      }
    }

    return NextResponse.json({
      ...localLead.toObject(),
      osIngestStatus,
    }, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error creating lead:", errorMessage);
    return NextResponse.json(
      { message: "Failed to create lead", error: errorMessage },
      { status: 500 }
    );
  }
}