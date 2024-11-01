"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sideUrlRouter = void 0;
const express_1 = __importDefault(require("express"));
const sideUrl_1 = require("../actions/sideUrl");
const midleware_1 = require("../middleware/midleware");
exports.sideUrlRouter = express_1.default.Router();
exports.sideUrlRouter.post('/user/metadata', midleware_1.authenticate, sideUrl_1.userMetadata);
exports.sideUrlRouter.get('/avatars', sideUrl_1.getAllAvatar);
