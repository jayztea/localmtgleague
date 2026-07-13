import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/database", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT 1 AS connected"
        );

        res.json(rows);

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error:"Database connection failed"
        });

    }

});

export default router;