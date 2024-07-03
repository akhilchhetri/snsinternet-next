import jwt from "jsonwebtoken";
import { NextApiHandler } from "next";
import { NextResponse } from "next/server";

export function authMiddleware(handler:any) {
  return async (req:any, res:any) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new Response("No token provided", { status: 401 });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
    return NextResponse.json(
        { error: "JWT secret is not defined" },
        { status: 500 },
    );
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
        req.userId = decoded.userId;
        return handler(req, res);
        } else {
        return res.status(401).json({ error: "Invalid token payload" });
        }
    } catch (error) {
      return new Response("Invalid token", { status: 401 });
    }
  };
}
