// @ts-nocheck
// app/api/customers/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";
import authMiddleware from "@/lib/authMiddleware";

const handler = async (req) => {
  await dbConnect();
  try {
    const customers = await Customer.find({})?.lean().exec();
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Error while fetching customers",
    });
  }
};

export const GET = authMiddleware(handler);
