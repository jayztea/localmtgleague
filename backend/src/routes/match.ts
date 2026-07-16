import {
    Router
} from "express";


import * as matchController
    from "../controllers/matchController";


import {
    authenticateToken
} from "../middleware/authMiddleware";



const router =
    Router();




router.post(
    "/",
    authenticateToken,
    matchController.createMatch
);



router.get(
    "/league/:leagueId",
    authenticateToken,
    matchController.getMatchesByLeague
);



export default router;