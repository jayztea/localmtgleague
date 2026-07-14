import { Router } from "express";

import {
    createLeague,
    getLeague,
    getMyLeagues
} from "../controllers/leagueController";


import {
    authenticateToken
} from "../middleware/authMiddleware";


import {
    validateRequest
} from "../middleware/validateRequest";


import {
    createLeagueSchema
} from "../dtos/leagueDTO";



const router = Router();



router.post(
    "/",
    authenticateToken,
    validateRequest(createLeagueSchema),
    createLeague
);



router.get(
    "/mine",
    authenticateToken,
    getMyLeagues
);



router.get(
    "/:leagueId",
    authenticateToken,
    getLeague
);



export default router;