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
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Login API
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate body of API
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required().label("Email"),
            password: joi_1.default.string().required().label("Password"),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        // check if email exist
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).json({ message: "Invalid Email or Password" });
        // verify password
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).json({ message: "Invalid Email or Password" });
        res.status(200).json({ message: "OTP Sent Successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Verify OTP
router.post("/2FA", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) { }
}));
// Refresh Token API
router.post("/refreshToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate body of API
        const schema = joi_1.default.object({
            refreshToken: joi_1.default.string().required().label("Refresh Token"),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        // verify refresh token
        const payload = jsonwebtoken_1.default.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const tokenDetails = yield Token.findById(payload._id);
        if (!tokenDetails || tokenDetails.token !== req.body.refreshToken)
            return res.status(403).json({ message: "Invalid Refresh Token" });
        // generate new access token
        const accessToken = jsonwebtoken_1.default.sign({ _id: tokenDetails._id, roles: payload.roles }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "14m" });
        res.cookie("secure", { accessToken }, {
            sameSite: "strict",
            path: "/",
            httpOnly: true,
            maxAge: 14 * 60 * 1000, // 14 minutes in milliseconds
            secure: true,
        });
        res.status(200).json({ message: "New Access Token Generated" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Logout API
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate body of API
        const schema = joi_1.default.object({
            refreshToken: joi_1.default.string().required().label("Refresh Token"),
        });
        const { error } = schema.validate(req.body);
        // verify refresh token
        const payload = jsonwebtoken_1.default.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const tokenDetails = yield Token.findById(payload._id);
        if (!tokenDetails || tokenDetails.token !== req.body.refreshToken)
            return res.status(403).json({ message: "Invalid Refresh Token" });
        // delete refresh token
        yield Token.deleteOne({ _id: tokenDetails._id });
        res.clearCookie("secure");
        res.clearCookie("user");
        res.status(200).json({ message: "Logged Out Successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
