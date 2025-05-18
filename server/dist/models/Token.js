"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tokenSchema = new mongoose_1.default.Schema({
    _id: { type: String, auto: false },
    token: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60, // 24H in seconds
    },
});
const Token = mongoose_1.default.model("token", tokenSchema);
exports.default = Token;
