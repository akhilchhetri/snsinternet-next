// @ts-nocheck
import authMiddleware from '@/lib/authMiddleware'
import { NextRequest, NextResponse } from "next/server";

const handler = async(req: NextRequest,res: NextResponse)=>{
    res.status(200).json({message: "This is a protected route", user: req.user})
}

export default authMiddleware(handler)