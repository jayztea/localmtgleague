import {
    Request,
    Response,
    NextFunction
}
from "express";


import * as statisticsService
    from "./statisticsService";



export async function getPlayerStatistics(
    req:Request,
    res:Response,
    next:NextFunction
) {


    try {


        const playerId =
            Number(
                req.params.playerId
            );



        const statistics =
            await statisticsService.getPlayerStatistics(
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