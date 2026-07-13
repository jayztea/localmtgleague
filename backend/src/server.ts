import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";

import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/auth", authRoutes);
app.use("/health", healthRoutes);


// Global Error Handler
// MUST be after all routes
app.use(errorHandler);


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});