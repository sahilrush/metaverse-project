import express from "express";
import { getAllAvatar, userMetadata } from "../actions/sideUrl";
import { authenticate } from "../middleware/midleware";


export const sideUrlRouter = express.Router();
sideUrlRouter.post('/user/metadata',authenticate, userMetadata)
sideUrlRouter.get('/avatars', getAllAvatar)
