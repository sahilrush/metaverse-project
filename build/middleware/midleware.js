"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "secret";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Authorization header is missing or invalid");
        res.status(403).json({ error: "Forbidden" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = payload;
        console.log("Authenticated user:", payload); // Log the authenticated user
        next();
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ error: "Forbidden" });
        return;
    }
};
exports.authenticate = authenticate;
