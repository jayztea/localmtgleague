import { Router }
from "express";


import {
    createLeague,
    joinLeague,
    getLeague,
    getMyLeagues
}
from "../controllers/leagueController";


import {
    authenticateToken
}
from "../middleware/authMiddleware";


import {
    validateRequest
}
from "../middleware/validateRequest";


import {
    createLeagueSchema,
    joinLeagueSchema
}
from "../dtos/leagueDTO";



const router =
    Router();




router.post(
    "/",
    authenticateToken,
    validateRequest(createLeagueSchema),
    createLeague
);




router.post(
    "/join",
    authenticateToken,
    validateRequest(joinLeagueSchema),
    joinLeague
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