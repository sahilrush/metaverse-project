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
exports.getAllAvatar = exports.userMetadata = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatarId } = req.body;
    const username = req.user.username;
    if (!avatarId || typeof avatarId !== "string") {
        return res.status(400).json({ error: "invalid avatarId" });
    }
    try {
        const user = yield prisma.user.update({
            where: {
                username: username
            },
            data: { avatarId }
        });
        return res.status(200).json({ message: "avatarId updated " });
    }
    catch (error) {
        console.error("Error updating avatar:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.userMetadata = userMetadata;
const getAllAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avatars = yield prisma.avatar.findMany();
        return res.status(200).json({
            avatars: avatars.map(avatar => ({
                id: avatar.id,
                imageUrl: avatar.imageUrl,
                name: avatar.name
            }))
        });
    }
    catch (error) {
        console.error("error fetching avatars:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllAvatar = getAllAvatar;
