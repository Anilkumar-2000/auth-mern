import express from "express";
import userAuth from "../middleware/userAuth.js";
import { userData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, userData);

export default userRouter;
