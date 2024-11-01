import express from "express";
import { space, spaceDelete } from "../actions/space";




export const spaceRouter = express.Router();
spaceRouter.post('/space', space)
spaceRouter.delete('space/:spaceId',spaceDelete)