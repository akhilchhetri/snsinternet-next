// @ts-nocheck
// app/api/customers/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";
import authMiddleware from "@/lib/authMiddleware";

const handler = async (req) => {
  await dbConnect();
  // try {
  //   const customers = await Customer.find({})?.lean().exec();
  //   return NextResponse.json({ success: true, data: customers });
  // } catch (error) {
  //   return NextResponse.json({
  //     success: false,
  //     error: error?.message || "Error while fetching customers",
  //   });
  // }
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        // const customerId = req.nextUrl.searchParams.get("customerId");
        // const payments = await Payment.find({ customer: customerId });
        const customers = await Customer.find({})?.lean().exec();
        return NextResponse.json({ success: true, data: customers });
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while fetching customers",
        });
      }
    case "POST":
      try {
        const { data } = await req.json();
        const newCustomer = new Customer(data);
        await newCustomer.save();

        return NextResponse.json(
          { success: true, data: newCustomer },
          { status: 201 },
        );
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while adding customer",
        });
      }

    case "PATCH":
      try {
        const customerId = req.nextUrl.searchParams.get("customerId");
        const { data } = await req.json();
        if (customerId) {
          // const newPayment = new Payment(data);
          // await newPayment.save();
          delete data?.payment_id;
          const updatedCustomer = await Customer.findByIdAndUpdate(
            { _id: customerId },
            data,
            { new: true, runValidators: true },
          );
          return NextResponse.json(
            { success: true, data: updatedCustomer },
            { status: 201 },
          );
        } else {
          return NextResponse.json(
            { success: false, message: "Customer id is not provided" },
            { status: 400 },
          );
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error?.message || "Error while updating customer",
        });
      }

    case "DELETE":
      try {
        const paymentId = req.nextUrl.searchParams.get("customerId");
        if (paymentId) {
          const deletedPayment = await Customer.findByIdAndDelete(paymentId);

          if (!deletedPayment) {
            return NextResponse.json(
              { success: false, error: "Customer data not found" },
              { status: 404 },
            );
          }
          return NextResponse.json({ success: true, data: deletedPayment });
        } else {
          return NextResponse.json(
            { success: false, message: "Customer id is not provided" },
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
