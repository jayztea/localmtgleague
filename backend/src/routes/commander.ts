import { Router } from "express";

import * as commanderController
    from "../controllers/commanderController";

import {
    authenticateToken
} from "../middleware/authMiddleware";

const router =
    Router();

router.use(
    authenticateToken
);

router.get(
    "/search",
    commanderController.searchCommanders
);

export default router;