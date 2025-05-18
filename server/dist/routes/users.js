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
const date_1 = __importDefault(require("@joi/date"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const User_1 = __importDefault(require("../models/User"));
joi_1.default.extend(date_1.default);
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
});
cloudinary_1.default.v2.config({
    cloud_name: "",
    api_key: "",
    api_secret: "",
});
// Create User Account
router.post("/", upload.single("avatar"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            return res.status(400).json({ msg: "Avatar img is required." });
        const schema = joi_1.default.object({
            name: joi_1.default.string().required().label("Name"),
            email: joi_1.default.string().email().required().label("Email"),
            password: joi_1.default.string().required().label("Password"),
            age: joi_1.default.number().required().label("Age"),
            dob: joi_1.default.date().format("DD-MM-YYYY").required().label("Date Of Birth"),
            company: joi_1.default.string().required().label("Company"),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ msg: error.details[0].message });
        let user = yield User_1.default.findOne({ email: req.body.email });
        if (user)
            return res.status(400).json({ msg: "User Already Exists" });
        console.log(req.file);
        //   const fileBase64 = `data:${
        //     req.file.mimetype
        //   };base64,${req.file.buffer.toString("base64")}`;
        //   const result = await cloudinary.v2.uploader.upload(fileBase64, {
        //     unique_filename: true,
        //   });
        res.status(200).json({ msg: "Account Created Sccessfully" });
    }
    catch (err) {
        return res.status(500).json({ msg: "Internal Server Error!" });
    }
}));
// Get User Details
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) { }
}));
// Delete User Account
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) { }
}));
exports.default = router;
