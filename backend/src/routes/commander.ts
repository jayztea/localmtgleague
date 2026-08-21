import { Router } from "express";

import * as commanderController
from "../controllers/commanderController";

import {
    authenticateToken
}
from "../middleware/authMiddleware";

const router =
    Router();

router.use(
    authenticateToken
);

router.get(
    "/search",
    commanderController.searchCommanders
);

router.get(
    "/:commanderId/pairing-rules",
    commanderController.getCommanderPairingRules
);

router.get(
    "/pairing-options",
    commanderController.getPairingOptions
);

export default router;