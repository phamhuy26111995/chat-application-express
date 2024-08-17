import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { getFriendRequests, getUsersForSideBar, responseFriendRequest, sendFriendRequest,getFriends, getNonFriends, deleteFriend } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSideBar);

router.post("/send-friend-request", protectRoute, sendFriendRequest);
router.get("/get-friend-requests", protectRoute, getFriendRequests);
router.post("/response-friend-request", protectRoute, responseFriendRequest);
router.get("/get-friends", protectRoute, getFriends);
router.get("/get-non-friends", protectRoute, getNonFriends);
router.get("/delete-friend", protectRoute, deleteFriend);


router.post("/send/:id", protectRoute, sendMessage);

export default router;
