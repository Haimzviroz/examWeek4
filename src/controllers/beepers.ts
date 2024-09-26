import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Beeper } from "../models/interfaces";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateStatusOne,
  getAllByStatus,
  updatedeployed,
} from "../dal/db";
import { getNextStatus } from "../services/statusGen";
export const createNewBeeper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const beeper: Beeper = {
      id: Date.now(),
      name: uuidv4(),
      status: "manufactured",
      created_at: new Date(),
    };
    await createOne(beeper);
    res.status(200).json(beeper);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getAllBeepers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const beepers: Beeper[] = await getAll();
    res.status(200).json(beepers);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id) throw new Error("id not found");
    const beeper: Beeper = await getOne(id);
    res.status(200).json(beeper);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const updateStatusById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id) throw new Error("id not found");
    const oldBeeper: Beeper = await getOne(id);
    if (!oldBeeper) throw new Error("beeper not found");

    const status: string = getNextStatus(oldBeeper.status);
    if (status === "deployed") {
      const latitude: number = req.body.latitude;
      const longitude: number = req.body.longitude;
      if (!latitude || !longitude) throw new Error("location not found");
      const beeper: Beeper = await updatedeployed(
        status,
        id,
        latitude,
        longitude
      );
      const detonatedbeeperStatus: string = getNextStatus(beeper.status);

      setTimeout(() => updateStatusOne(detonatedbeeperStatus, id), 10000);
      res.status(200).json(beeper);
    } else {
      const beeper: Beeper = await updateStatusOne(status, id);
      res.status(200).json(beeper);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
export const deleteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id) throw new Error("id not found");
    await deleteOne(id);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const status: string = req.params.status;
    if (!status) throw new Error("status not found");
    const beepers: Beeper[] = await getAllByStatus(status);
    res.status(200).json(beepers);
  } catch (error) {
    res.status(500).send(error);
  }
};
