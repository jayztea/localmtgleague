import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";
import healthRoutes from "./routes/health";
import leagueRoutes from "./routes/leagues";
import leaguePlayerRoutes from "./routes/leaguePlayers";
import deckRoutes from "./routes/deck";
import matchRoutes from "./routes/match";
import { errorHandler } from "./middleware/errorHandler";




dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/health", healthRoutes);
app.use("/leagues",leagueRoutes);
app.use("/leagues", leaguePlayerRoutes);
app.use("/decks", deckRoutes);
app.use("/matches",matchRoutes);

// Global Error Handler
// MUST be after all routes
app.use(errorHandler);


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);


});