import { Request, Response } from "express";
import db from "../models";
import { getSecToken } from "../middlewares/auth";

const utcPlus7Date = new Date();
utcPlus7Date.setTime(utcPlus7Date.getTime() + (7 * 60 * 60 * 1000));
const utcPlus7Date1 = new Date();
utcPlus7Date1.setTime(utcPlus7Date1.getTime() + (31 * 60 * 60 * 1000));
const isoDatePlus7 = utcPlus7Date.toISOString();

export async function createOrder (req: Request, res: Response) {
  try {
    const { amount, reff = Math.random(), expired: Qexpired, name, hp } = req.query;
    if (Number(amount) < 0) throw new Error('Amount must be greater than 0');
    if (new Date(Qexpired as string) < new Date()) throw new Error('Expired date must be greater than current date');
    const expired = Qexpired ? Qexpired : utcPlus7Date1.toISOString();

    const existingReff = await db.Order.findOne({ where: { reff } });
    if (reff && existingReff?.reff) {
      return res.status(400).json({ message: 'Reff already exists' });
    }
    const token = getSecToken(req);
    if (!name) {
        const user = await db.User.findOne({ where: { id: token.id } })
        await db.Order.create({ amount: Number(amount) + 2500, reff, expired, name, code: `8834${hp}` });
        res.status(200).json({
          amount: Number(amount) + 2500,
          reff,
          expired,
          name: user?.name,
          code: `8834${hp}`,
          userId: token.id
        });
    } else {
      await db.Order.create({ amount: Number(amount) + 2500, reff, expired, name, code: `8834${hp}` });
      res.status(200).json({
        amount: Number(amount) + 2500,
        reff,
        expired,
        name,
        code: `8834${hp}`,
        userId: token.id
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function payOrder (req: Request, res: Response) {
  try {
    const token = getSecToken(req);
    const { reff } = req.query;
    const result = await db.Order.findOne({ where: { reff } });
    if (result?.id && result?.status !== 'paid') {
      await db.Order.update({ status: 'paid', paid: isoDatePlus7 }, { where: { reff }, returning: true });
      await db.Transaction.create({ 
        amount: result.amount, reff: result.reff, expired: result.expired, name: result.name, code: result.code, status: 'paid', paid: isoDatePlus7, userId: token.id
      });
      
      res.status(200).json({
        amount: result?.amount,
        reff: result?.reff,
        name: result?.name,
        code: result?.code,
        status: 'paid',
        // paid: isoDatePlus7,
      });
    } else if (result?.status === 'paid') {
      throw new Error('Was Paid!');
    } else {
      throw new Error('Reff not found!');
    }
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
}

export async function checkOrderStatus (req: Request, res: Response) {
  try {
    const { reff } = req.query;
    const result = await db.Order.findOne({ where: { reff } });
    if (!result?.id) throw new Error('Reff not found');

    res.status(200).json({
      amount: result?.amount,
      reff: result?.reff,
      name: result?.name,
      expired: result?.expired,
      paid: result?.paid,
      code: result?.code,
      status: result?.status,
    });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
}

export async function getMyOrders (req: Request, res: Response) {
  try {
    const token = getSecToken(req);
    const user = await db.User.findOne({ where: { id: token.id }, include: { association: db.User.associations.orders } });
    res.status(200).json(user?.orders);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

export async function getAllOrders (req: Request, res: Response) {
  try {
    const orders = await db.Order.findAll();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}