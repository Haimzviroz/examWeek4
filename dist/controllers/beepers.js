"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByStatus = exports.deleteById = exports.updateStatusById = exports.getById = exports.getAllBeepers = exports.createNewBeeper = void 0;
const uuid_1 = require("uuid");
const db_1 = require("../dal/db");
const statusGen_1 = require("../services/statusGen");
const createNewBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = {
            id: Date.now(),
            name: (0, uuid_1.v4)(),
            status: "manufactured",
            created_at: new Date(),
        };
        yield (0, db_1.createOne)(beeper);
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createNewBeeper = createNewBeeper;
const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, db_1.getAll)();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllBeepers = getAllBeepers;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id)
            throw new Error("id not found");
        const beeper = yield (0, db_1.getOne)(id);
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getById = getById;
const updateStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id)
            throw new Error("id not found");
        const oldBeeper = yield (0, db_1.getOne)(id);
        if (!oldBeeper)
            throw new Error("beeper not found");
        const status = (0, statusGen_1.getNextStatus)(oldBeeper.status);
        if (status === "deployed") {
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            if (!latitude || !longitude)
                throw new Error("location not found");
            const beeper = yield (0, db_1.updatedeployed)(status, id, latitude, longitude);
            const detonatedbeeperStatus = (0, statusGen_1.getNextStatus)(beeper.status);
            setTimeout(() => (0, db_1.updateStatusOne)(detonatedbeeperStatus, id), 10000);
            res.status(200).json(beeper);
        }
        else {
            const beeper = yield (0, db_1.updateStatusOne)(status, id);
            res.status(200).json(beeper);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateStatusById = updateStatusById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id)
            throw new Error("id not found");
        yield (0, db_1.deleteOne)(id);
        res.status(200).json({ id });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteById = deleteById;
const getByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        if (!status)
            throw new Error("status not found");
        const beepers = yield (0, db_1.getAllByStatus)(status);
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getByStatus = getByStatus;
