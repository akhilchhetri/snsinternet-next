// @ts-nocheck
// app/api/customers/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import authMiddleware from "@/lib/authMiddleware";
import Payment from "@/models/Payment";

const handler = async (req) => {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const customerId = req.nextUrl.searchParams.get("customerId");
        const payments = await Payment.find({ customer: customerId });
        return NextResponse.json({ success: true, data: payments });
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while fetching customers",
        });
      }
    case "POST":
      try {
        const customerId = req.nextUrl.searchParams.get("customerId");
        const { data } = await req.json();
        const newPayment = new Payment(data);
        await newPayment.save();
        return NextResponse.json(
          { success: true, data: newPayment },
          { status: 201 },
        );
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while adding payment",
        });
      }

    case "PATCH":
      try {
        const customerId = req.nextUrl.searchParams.get("customerId");
        const { data } = await req.json();
        const payment_id = data?.payment_id;
        if (payment_id) {
          // const newPayment = new Payment(data);
          // await newPayment.save();
          delete data?.payment_id;
          const updatedPayment = await Payment.findByIdAndUpdate(
            { _id: payment_id },
            data,
            { new: true, runValidators: true },
          );
          return NextResponse.json(
            { success: true, data: updatedPayment },
            { status: 201 },
          );
        } else {
          return NextResponse.json(
            { success: false, message: "Payment id is not provided" },
            { status: 400 },
          );
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while adding payment",
        });
      }

    case "DELETE":
      try {
        const paymentId = req.nextUrl.searchParams.get("paymentId");
        if (paymentId) {
          const deletedPayment = await Payment.findByIdAndDelete(paymentId);

          if (!deletedPayment) {
            return NextResponse.json(
              { success: false, error: "Payment data not found" },
              { status: 404 },
            );
          }
          return NextResponse.json({ success: true, data: deletedPayment });
        } else {
          return NextResponse.json(
            { success: false, message: "Payment id is not provided" },
            { status: 400 },
          );
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while adding payment",
        });
      }
    default:
      return NextResponse.json(
        { success: false, error: "Method not allowed" },
        { status: 405 },
      );
  }
};

export const GET = authMiddleware(handler);
export const POST = authMiddleware(handler);
export const PATCH = authMiddleware(handler);
export const DELETE = authMiddleware(handler);
