import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "mtg-league-api"
    });
});


// API Routes
app.use("/auth", authRoutes);
app.use("/test", testRoutes);


// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});