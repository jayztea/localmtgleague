import {
    Router
}
from "express";


import * as statisticsController
    from "./statisticsController";


import {
    authenticateToken
}
from "../middleware/authMiddleware";



const router =
    Router();



router.get(

    "/players/:playerId/statistics",

    authenticateToken,

    statisticsController.getPlayerStatistics

);



export default router;