import { Router } from "express";

import * as deckController
    from "../controllers/deckController";

import {
    authenticateToken
} from "../middleware/authMiddleware";


const router = Router();



router.post(
    "/",
    authenticateToken,
    deckController.createDeck
);



router.get(
    "/my",
    authenticateToken,
    deckController.getMyDecks
);



export default router;