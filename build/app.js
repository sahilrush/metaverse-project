"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("./routes/account");
const sideUrl_1 = require("./routes/sideUrl");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Metaverse Project 100xDevs');
});
app.use('/api/v1', account_1.accountRouter);
app.use('/api/v1', sideUrl_1.sideUrlRouter);
exports.default = app;
