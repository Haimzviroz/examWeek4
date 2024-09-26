import jsonfile from "jsonfile";
import { Beeper } from "../models/interfaces";
import fs from "fs";

const beepersDb: string = "./beepersDb.json";

export const createOne = async (beeper: Beeper): Promise<Beeper> => {
  try {
    if (!fs.existsSync(beepersDb)) {
      await jsonfile.writeFile(beepersDb, []);
    }
    const beepers: Beeper[] = await jsonfile.readFile(beepersDb);

    beepers.push(beeper);
    await jsonfile.writeFile(beepersDb, beepers);
    return beeper;
  } catch (error) {
    throw error;
  }
};

export const getAll = async (): Promise<Beeper[]> => {
  try {
    if (!fs.existsSync(beepersDb)) {
      return [];
    }
    const beepers: Beeper[] = await jsonfile.readFile(beepersDb);
    return beepers;
  } catch (error) {
    throw error;
  }
};
export const getOne = async (id: number): Promise<Beeper> => {
  try {
    const beepers: Beeper[] = await getAll();
    const beeper = beepers.find((beeper) => beeper.id === id);
    if (!beeper) {
      throw new Error("beeper not found");
    }
    return beeper;
  } catch (error) {
    throw error;
  }
};

export const updateStatusOne = async (
  status: string,
  id: number
): Promise<Beeper> => {
  try {
    const beepers: Beeper[] = await getAll();
    const index = beepers.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("beeper not found");
    }
    beepers[index].status = status;
    await jsonfile.writeFile(beepersDb, beepers);
    return beepers[index];
  } catch (error) {
    throw error;
  }
};
export const deleteOne = async (id: number): Promise<void> => {
  try {
    const beepers: Beeper[] = await getAll();
    const index = beepers.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("beeper not found");
    }
    beepers.splice(index, 1);
    await jsonfile.writeFile(beepersDb, beepers);
  } catch (error) {
    throw error;
  }
};
export const getAllByStatus = async (status: string): Promise<Beeper[]> => {
  try {
    const beepers: Beeper[] = await getAll();
    return beepers.filter((beeper) => beeper.status === status);
  } catch (error) {
    throw error;
  }
};

export const updatedeployed = async (
  status: string,
  id: number,
  latitude: number,
  longitude: number
): Promise<Beeper> => {
  try {
    const beepers: Beeper[] = await getAll();
    const index: number = beepers.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("beeper not found");
    }
    beepers[index].status = status;
    beepers[index].latitude = latitude;
    beepers[index].longitude = longitude;
    await jsonfile.writeFile(beepersDb, beepers);
    return beepers[index];
  } catch (error) {
    throw error;
  }
};
