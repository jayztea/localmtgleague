import { Router } from "express";

import * as leaguePlayerController from "../controllers/leaguePlayerController";

import { authenticateToken } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";

import { addPlayerSchema } from "../dtos/leaguePlayerDTO";

const router = Router();

router.use(authenticateToken);

router.post(
    "/:leagueId/players",
    validateRequest(addPlayerSchema),
    leaguePlayerController.addPlayer
);

router.get(
    "/:leagueId/players",
    leaguePlayerController.getPlayers
);

router.patch(
    "/:leagueId/players/:playerId/remove",
    leaguePlayerController.removePlayer
);

router.get(
    "/:leagueId/players-with-commanders",
    leaguePlayerController.getPlayersWithCommanders
);

export default router;