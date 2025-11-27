import express from "express";
import {
  getMyEnrollments,
  enrollCourse,
  dropCourse,
  addStudentMessage,
  getStudentMessages,
} from "../controllers/studentController.js";
import { authenticateToken, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Existing course routes
router.get("/courses", getMyEnrollments);
router.post("/enroll/:id", enrollCourse);
router.delete("/drop/:id", dropCourse);

// New student message routes
router.post("/message", addStudentMessage); // Public
router.get("/messages", adminAuth, getStudentMessages); // Admin-only

export default router;
