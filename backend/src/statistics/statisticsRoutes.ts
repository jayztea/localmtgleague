import {
    Router
}
from "express";


import * as statisticsController
    from "./statisticsController";



const router =
    Router();



router.get(
    "/players/:playerId/statistics",
    statisticsController.getPlayerStatistics
);



export default router;