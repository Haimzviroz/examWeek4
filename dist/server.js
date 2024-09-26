"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const beepers_1 = __importDefault(require("./routes/beepers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3000";
//BODY PARSER
app.use(express_1.default.json());
app.use(beepers_1.default);
//IMPORT ROUTES
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
