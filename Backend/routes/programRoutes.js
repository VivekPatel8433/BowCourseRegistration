// Backend/routes/programRoutes.js

import express from "express";
import { getAllPrograms } from "../controllers/AdminController.js";

const router = express.Router();

// GET all programs
// Example endpoint:  GET /api/programs
router.get("/programs", getAllPrograms);

export default router;
