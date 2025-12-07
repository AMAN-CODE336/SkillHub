import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { createCourse } from "../controllers/courseController.js";
import { getAllCourses, getCourseById } from "../controllers/courseController.js";

const router = express.Router();

router.post("/create", protect, admin, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

export default router;
