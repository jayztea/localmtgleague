import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/", async (req, res) => {

    try {

        await db.query("SELECT 1");

        res.json({
            status: "OK",
            message: "API and database are running"
        });

    }
    catch (error) {

        console.error(
            "Health check database failure:",
            error
        );

        res.status(503).json({
            status: "ERROR",
            message: "Database unavailable"
        });

    }

});

export default router;