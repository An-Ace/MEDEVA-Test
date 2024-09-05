import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifySecToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['sec-token'] as string;
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Sec-Token provided' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as any;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Sec-Token' });
  }
};

export const getSecToken = (req: Request) => {
  const token = req.headers['sec-token'] as string;
  if (!token) {
    throw new Error('Access Denied: No Sec-Token provided');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return user;
  } catch (err) {
    throw new Error('Invalid Sec-Token');
  }
}

export const isUserSelf = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['sec-token'] as string;
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Sec-Token provided' });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (user.id !== Number(req.params.id)) {
      return res.status(403).json({ message: 'Forbidden: You are not allowed to access this resource' });
    }
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Sec-Token' });
  }
}