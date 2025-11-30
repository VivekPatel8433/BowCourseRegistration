import express from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import programRouter from "./routes/programRoutes.js";
import studentRouter from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ------------------------
// Middleware
// ------------------------
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// ------------------------
// API Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRouter);
app.use("/api/programs", programRouter);   
app.use("/api/students", studentRouter);

// ------------------------
// Root Test Route
// ------------------------
app.get("/", (req, res) => {
  res.send("API running...");
});

// ------------------------
// Start Server
// ------------------------
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
