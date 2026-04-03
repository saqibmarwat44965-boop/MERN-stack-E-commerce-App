import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { error } from "../helpers/error.js";

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return error(res, "No token provided", 401);
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
      return error(res, "Invalid token format", 401);
    }

    // verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // attach user info to req
    req.user = decoded; // contains id, email, role

    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return error(res, "Invalid or expired token", 401);
  }
};