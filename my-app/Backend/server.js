import express from "express"; // Type: Module in Package.json makes us to use ES modules-import..
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Example route
app.get("/", (req, res) => {
    res.send("API running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
