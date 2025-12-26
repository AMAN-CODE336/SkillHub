import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { enrollCourse , getMyCourses } from "../controllers/enrollmentController.js";

const router = express.Router();

// User enrolls into a course
router.post("/:courseId", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);

export default router;
