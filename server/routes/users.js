
import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUsers
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/allusers/users", verifyToken, getAllUsers);

/* Update */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;

