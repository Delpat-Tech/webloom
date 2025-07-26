import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

// Explicitly register Lead model
mongoose.model("Lead", Lead.schema);

// GET handler
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    console.log("Database connected");
    const leads = await Lead.find({}).lean();
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
    await connectDB();
    console.log("Database connected");
    const { name, email, company, message, page } = await req.json();

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

    // Create a new lead
    const lead = await Lead.create({
      name,
      email,
      company,
      message,
      page,
      dateSubmitted: new Date(),
    });

    await lead.save();

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