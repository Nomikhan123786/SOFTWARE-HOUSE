import express from "express";
import { Router } from "express";
import { register, login, getMe } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/mine", protect, getMe);
export default router;
