// app/api/customers/route.ts
// @ts-nocheck
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";
import authMiddleware from "@/lib/authMiddleware";
import mongoose from "mongoose";

const handler = async (req) => {
  await dbConnect();
  try {
    const _id = parseInt(req.nextUrl.pathname.split("/").pop());
    if (!_id) {
        return NextResponse.json(
        { success: false, error: "Customer ID is required" },
        { status: 400 },
        );
    }
    // @ts-nocheck
    const customer = await Customer?.findOne({_id:_id}).exec();
    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Error while fetching customers",
    });
  }
};

export const GET = authMiddleware(handler);
