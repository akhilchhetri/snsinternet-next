// middleware/authMiddleware.js
import { NextResponse } from "next/server";
import jwt, {TokenExpiredError} from "jsonwebtoken";

const authMiddleware = (handler) => {
  return async (req, res) => {
    try{
      const {name,value} = req.cookies.get('token')
    // console.log(authHeader)
    // if (!authHeader) {
    //   return NextResponse.json({ error: "No token provided" }, { status: 401 });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return NextResponse.json({ error: "No token provided" }, { status: 401 });
    // }
     if (!value) {
       return NextResponse.json(
         { error: "No token provided" },
         { status: 401 },
       );
     }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT secret is not defined" },
        { status: 500 },
      );
    }

    try {
      const decoded = jwt.verify(value, JWT_SECRET);
      if (typeof decoded !== "string" && "userId" in decoded) {
        req.userId = decoded.userId;
        return handler(req, res);
      } else {
        return NextResponse.json(
          { error: "Invalid token payload" },
          { status: 401 },
        );
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return NextResponse.json({error:'Token Expired', type:'expired'}, {status:401})
      }
      return NextResponse.json({ error: "Invalid token", type:'invalid' }, { status: 401 });
    }
    }catch(e){
        return NextResponse.json(
          { error: "Token Expired", type: "expired" },
          { status: 401 },
        );
    }
  };
};

export default authMiddleware;
