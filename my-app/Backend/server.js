import express from "express"; // Type: Module in Package.json makes us to use ES modules-import..
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import cors from "cors";
import courseRouter from './routes/courseRoutes.js';
import programRouter from './routes/programRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: " http://localhost:3001", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/auth", router);
app.use('/api/courses', courseRouter);
app.use('/api/programs', programRouter);


// Example route
app.get("/", (req, res) => {
    res.send("API running...");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
