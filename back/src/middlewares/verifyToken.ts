import jwt from "jsonwebtoken";
import type {Request,Response,NextFunction} from 'express'
import logger from "../utils/logger.ts";
export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer xxx

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
    
  } catch (err:unknown) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
