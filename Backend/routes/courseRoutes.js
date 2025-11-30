import express from "express";
import { getAllCourses } from "../controllers/studentController.js";

const router = express.Router();

// PUBLIC — fetch all courses (used by Student Dashboard)
router.get("/", getAllCourses);

export default router;
