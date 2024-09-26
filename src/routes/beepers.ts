import express, { Router } from "express";
import {
  createNewBeeper,
  deleteById,
  getAllBeepers,
  getById,
  getByStatus,
  updateStatusById,
} from "../controllers/beepers";

const authrouter: Router = express.Router();

authrouter.post("/api/beepers", createNewBeeper);
authrouter.get("/api/beepers", getAllBeepers);
authrouter.get("/api/beepers/:id", getById);
authrouter.put("/api/beepers/:id/status", updateStatusById);
authrouter.delete("/api/beepers/:id", deleteById);
authrouter.get("/api/beepers/status/:status", getByStatus);

export default authrouter;
