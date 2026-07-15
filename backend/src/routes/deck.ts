import { Router } from "express";

import * as deckController from "../controllers/deckController";

import { authenticateToken } from "../middleware/authMiddleware";

import { validateRequest } from "../middleware/validateRequest";

import { createDeckSchema } from "../dtos/deckDto";

const router = Router();

router.post(
    "/",
    authenticateToken,
    validateRequest(createDeckSchema),
    deckController.create
);

router.get(
    "/",
    authenticateToken,
    deckController.getMine
);

export default router;