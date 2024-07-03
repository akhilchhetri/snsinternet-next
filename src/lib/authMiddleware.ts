import jwt from "jsonwebtoken";

export function authMiddleware(handler) {
  return async (req) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new Response("No token provided", { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return handler(req);
    } catch (error) {
      return new Response("Invalid token", { status: 401 });
    }
  };
}
