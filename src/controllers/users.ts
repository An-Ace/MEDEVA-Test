import { Request, Response } from "express";
import db from "../models";
import { getSecToken } from "../middlewares/auth";

export async function getAllUser (req: Request, res: Response) {
  try {
    const result = await db.User.findAll({ attributes: ['id', 'name', 'email'] });
    res.status(200).json({ users: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserById (req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await db.User.findByPk(id, { attributes: ['id', 'name', 'email'] });
    res.status(200).json({ user: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser (req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { email, name, password } = req.body
    const result = await db.User.update({ email, name, password }, { where: { id } });
    res.status(200).json({ user: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser (req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await db.User.destroy({ where: { id } });
    res.status(200).json({ user: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}