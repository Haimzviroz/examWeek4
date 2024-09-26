"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextStatus = void 0;
const getNextStatus = (status) => {
    switch (status) {
        case "manufactured":
            return "assembled";
        case "assembled":
            return "shipped";
        case "shipped":
            return "deployed";
        case "deployed":
            return "detonated";
        default:
            return status;
    }
};
exports.getNextStatus = getNextStatus;
