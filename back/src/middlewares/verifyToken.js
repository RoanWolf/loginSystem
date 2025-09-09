import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer xxx

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET);
    next();
    
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
