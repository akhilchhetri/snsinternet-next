import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request:NextRequest) {
  await dbConnect();

  const { username, password } = await request.json();
  console.log(username, password)
  const user = await User.findOne({ email:username });
  console.log(user)
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
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return NextResponse.json({ token }, { status: 200 });
}
