import { NextRequest, NextResponse } from "next/server";
import { osRequest } from "@/lib/os-client";

// GET handler
export async function GET(req: NextRequest) {
  try {
    const leads = await osRequest('GET', '/api/leads');
    return NextResponse.json(leads, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
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

    // Forward lead to Delpat OS via public ingest endpoint
    const osUrl = process.env.DELPAT_OS_URL;
    const ingestKey = process.env.DELPAT_OS_INGEST_KEY;

    if (!osUrl || !ingestKey) {
      throw new Error('Missing env vars: DELPAT_OS_URL, DELPAT_OS_INGEST_KEY');
    }

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
      throw new Error(`OS ingest failed (${res.status}): ${text}`);
    }

    const lead = await res.json();

    return NextResponse.json(lead, {
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