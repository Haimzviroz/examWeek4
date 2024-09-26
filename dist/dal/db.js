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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedeployed = exports.getAllByStatus = exports.deleteOne = exports.updateStatusOne = exports.getOne = exports.getAll = exports.createOne = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const fs_1 = __importDefault(require("fs"));
const beepersDb = "./beepersDb.json";
const createOne = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(beepersDb)) {
            yield jsonfile_1.default.writeFile(beepersDb, []);
        }
        const beepers = yield jsonfile_1.default.readFile(beepersDb);
        beepers.push(beeper);
        yield jsonfile_1.default.writeFile(beepersDb, beepers);
        return beeper;
    }
    catch (error) {
        throw error;
    }
});
exports.createOne = createOne;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(beepersDb)) {
            return [];
        }
        const beepers = yield jsonfile_1.default.readFile(beepersDb);
        return beepers;
    }
    catch (error) {
        throw error;
    }
});
exports.getAll = getAll;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, exports.getAll)();
        const beeper = beepers.find((beeper) => beeper.id === id);
        if (!beeper) {
            throw new Error("beeper not found");
        }
        return beeper;
    }
    catch (error) {
        throw error;
    }
});
exports.getOne = getOne;
const updateStatusOne = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, exports.getAll)();
        const index = beepers.findIndex((b) => b.id === id);
        if (index === -1) {
            throw new Error("beeper not found");
        }
        beepers[index].status = status;
        yield jsonfile_1.default.writeFile(beepersDb, beepers);
        return beepers[index];
    }
    catch (error) {
        throw error;
    }
});
exports.updateStatusOne = updateStatusOne;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, exports.getAll)();
        const index = beepers.findIndex((b) => b.id === id);
        if (index === -1) {
            throw new Error("beeper not found");
        }
        beepers.splice(index, 1);
        yield jsonfile_1.default.writeFile(beepersDb, beepers);
    }
    catch (error) {
        throw error;
    }
});
exports.deleteOne = deleteOne;
const getAllByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, exports.getAll)();
        return beepers.filter((beeper) => beeper.status === status);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllByStatus = getAllByStatus;
const updatedeployed = (status, id, latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield (0, exports.getAll)();
        const index = beepers.findIndex((b) => b.id === id);
        if (index === -1) {
            throw new Error("beeper not found");
        }
        beepers[index].status = status;
        beepers[index].latitude = latitude;
        beepers[index].longitude = longitude;
        yield jsonfile_1.default.writeFile(beepersDb, beepers);
        return beepers[index];
    }
    catch (error) {
        throw error;
    }
});
exports.updatedeployed = updatedeployed;
