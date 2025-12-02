import express from "express";
import { register, login,getUserById,updateProfile }  from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();  

router.post("/register", register);
router.post("/login", login)
router.get("/user/loggedIn",authenticateToken,getUserById)// id is taken from cookies for profiles data
router.put("/user/profile", authenticateToken,updateProfile)

export default router;
