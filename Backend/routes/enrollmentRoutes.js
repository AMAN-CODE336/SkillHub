import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { enrollCourse } from "../controllers/enrollmentController.js";

const router = express.Router();

// User enrolls into a course
router.post("/:courseId", protect, enrollCourse);

export default router;
