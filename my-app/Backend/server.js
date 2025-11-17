import express from "express"; // Type: Module in Package.json makes us to use ES modules-import..
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/auth", router);

// Example route
app.get("/", (req, res) => {
    res.send("API running...");
});

app.use(cors({
  origin: " http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
