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
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    if (role !== "ADMIN" && role !== "USER") {
        return res.status(400).json({ error: "Role must be either Admin or User" });
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username: username,
                password: passwordHash,
                role: role
            }
        });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.error("Error inn /signup:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid credtionals" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credtionals" });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(500).json({ token });
    }
    catch (err) {
        console.error("Error in /sign:", err);
        return res.status(500).json({ err: "Internal server error" });
    }
});
exports.signin = signin;
