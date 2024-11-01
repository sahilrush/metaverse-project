
import  express from "express";
import { signin, signup } from "../actions/accounts";

export const accountRouter = express.Router();
accountRouter.post('/signup', signup);  
accountRouter.post('/signin', signin);