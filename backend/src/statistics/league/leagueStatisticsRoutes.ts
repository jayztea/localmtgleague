import {
    Router
}
from "express";


import {
    authenticateToken
}
from "../../middleware/authMiddleware";


import {
    getLeagueStatisticsController
}
from "./leagueStatisticsController";





const router = Router();





router.get(

    "/leagues/:leagueId/statistics",

    authenticateToken,

    getLeagueStatisticsController

);





export default router;