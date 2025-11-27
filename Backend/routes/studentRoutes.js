import express from "express";
import {
  getMyEnrollments,
  enrollCourse,
  dropCourse,
  addStudentMessage,
  getStudentMessages,
  deleteMessage,
 responseMessage
} from "../controllers/studentController.js";
import { authenticateToken, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Existing course routes
router.get("/courses", authenticateToken,getMyEnrollments);
router.post("/enroll/:id", authenticateToken,enrollCourse);
router.delete("/drop/:id", authenticateToken,dropCourse);

// New student message routes
router.post("/message",authenticateToken, addStudentMessage); // Public
router.get("/messages", adminAuth, getStudentMessages); // Admin-only
router.delete("/message/:id", adminAuth, deleteMessage); // Admin-only
router.patch("/message/:id", adminAuth, responseMessage); // Admin-only

export default router;
