import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import sprintRoutes from "./routes/sprints.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

// Routes
app.use("/api/sprints", sprintRoutes);
app.use("/api/auth", authRoutes);

// Connect to DB then start server
connectDB(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
