import { Router, Request, Response } from 'express';
import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!; // Replace with your actual secret key

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, String(user.password));
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate a token
    const token = generateToken(user);

    // Set the token in the Sec-Token header and send response
    res.header('Sec-Token', token).json({ message: 'Login successful', "src-token": token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}

export async function userRegister(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await db.User.findOne({ where: { email } });;
    if (existingUser) {
      throw new Error('User email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user and add to the "database"
    // @ts-ignore
    const result = await db.User.create({ name, email, password: hashedPassword });

    // Generate a token
    const token = generateToken(result);

    // Set the token in the Sec-Token header and send response
    res.status(201).header('Sec-Token', token).json({ message: 'User registered successfully', "src-token": token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
};