import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/api";

// GET handler
export async function GET(req: NextRequest) {
  try {
    const partners = await DatabaseService.getPartners();
    return NextResponse.json(partners, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching partners:", errorMessage);
    return NextResponse.json(
      { message: "Failed to fetch partners", error: errorMessage },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      projectType,
      timeline,
      budget,
      description,
      portfolio
    } = await req.json();

    // validate required fields
    if (!companyName || !contactName || !email || !description) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          details: "companyName, contactName, email, and description are required",
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

    // Create a new partner using the database service
    const partner = await DatabaseService.createPartner({
      companyName,
      contactName,
      email,
      phone,
      website,
      projectType,
      timeline,
      budget,
      description,
      portfolio: portfolio ? portfolio.name : null,
    });

    return NextResponse.json(partner, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error creating partner:", errorMessage);
    return NextResponse.json(
      { message: "Failed to create partner", error: errorMessage },
      { status: 500 }
    );
  }
} 