import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSideBar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSideBar);

export default router;
