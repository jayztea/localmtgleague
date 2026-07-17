import {
    Request,
    Response,
    NextFunction
}
from "express";


import * as playerStatisticsService
from "./StatisticsService";



export async function getPlayerStatistics(
    req:Request,
    res:Response,
    next:NextFunction
) {


    try {


        const userId =
            (req as any)
            .user
            .user_id;



        const playerId =
            Number(
                req.params.playerId
            );



        const statistics =
            await playerStatisticsService.getPlayerStatistics(
                userId,
                playerId
            );



        res.json(
            statistics
        );


    }
    catch(error) {

        next(error);

    }

}