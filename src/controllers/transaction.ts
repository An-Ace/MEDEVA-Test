import { Request, Response } from "express";
import db from "../models";
import { getSecToken } from "../middlewares/auth";

export async function getMyTransactions (req: Request, res: Response) {
  try {
    const token = getSecToken(req);
    const user = await db.User.findOne({ where: { id: token.id }, include: { association: db.User.associations.transactions } });
    res.status(200).json(user?.transactions);
  } catch (error: any) {
    res.status(401).json({ message: error.message });

  }
}

export async function getAllTransactions (req: Request, res: Response) {
  try {
    const transactions = await db.Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(401).json({ message: error.message });

  }
}