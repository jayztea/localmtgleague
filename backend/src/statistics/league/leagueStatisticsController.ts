import {
    Request,
    Response,
    NextFunction
}
from "express";


import {
    getLeagueStatistics
}
from "./LeagueStatisticsService";







export async function getLeagueStatisticsController(

    req:Request,

    res:Response,

    next:NextFunction

){


    try {


        const leagueId =

            Number(
                req.params.leagueId
            );



        const statistics =

            await getLeagueStatistics(
                leagueId
            );



        res.json(
            statistics
        );


    }

    catch(error){


        next(error);


    }


}