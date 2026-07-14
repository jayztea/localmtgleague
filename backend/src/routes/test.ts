import { Router } from "express";

import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();


router.get(
    "/protected",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "You are authenticated!",
            user: (req as any).user
        });

    }
);


export default router;