import express from "express";
import { getMe, updateProfile } from "../controllers/usercontroller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);

export default router;
