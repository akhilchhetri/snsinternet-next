// @ts-nocheck
// app/api/customers/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";
import authMiddleware from "@/lib/authMiddleware";

const handler = async (req) => {
  await dbConnect();
  try {
    const customers = await Package.find({});
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Error while fetching customers",
    });
  }
};

export const GET = authMiddleware(handler);
