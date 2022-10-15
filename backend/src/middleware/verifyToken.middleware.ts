import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

//add custom property to put userId from token
declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

export function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"];
  if (!token) {
      return res.status(403).send({
          message: "No token provided!"
      });
  }

  jwt.verify(token as string, process.env.JWT_SECRET || 'secret', (err, decoded: any) => {
    if (err) {
        return res.status(403).send({
            message: "Token is not valid!"
        });
    }
    req.userId = decoded.id;  
    next();
  });
};