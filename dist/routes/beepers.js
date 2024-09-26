"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beepers_1 = require("../controllers/beepers");
const authrouter = express_1.default.Router();
authrouter.post("/api/beepers", beepers_1.createNewBeeper);
authrouter.get("/api/beepers", beepers_1.getAllBeepers);
authrouter.get("/api/beepers/:id", beepers_1.getById);
authrouter.put("/api/beepers/:id/status", beepers_1.updateStatusById);
authrouter.delete("/api/beepers/:id", beepers_1.deleteById);
authrouter.get("/api/beepers/status/:status", beepers_1.getByStatus);
exports.default = authrouter;
