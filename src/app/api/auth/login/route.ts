import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request:NextRequest) {
  await dbConnect();

  const { email, password } = await request.json();
  const user = await User.findOne({ email:email });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
      return NextResponse.json(
      { error: "JWT secret is not defined" },
      { status: 500 },
      );
  }

// @ts-nocheck
  const token = jwt.sign({ userId: user._id, email: user?.email }, JWT_SECRET, {
    expiresIn: "24hr",
  });

  const response = NextResponse.json({token:token, status:200, message: "Login successful" });
  response.cookies.set("token", token, {
     httpOnly: true,
    //  secure: process.env.NODE_ENV === "production",
     maxAge: 3600,
  });

  
  // return NextResponse.json({ token }, { status: 200 });
  return response
}