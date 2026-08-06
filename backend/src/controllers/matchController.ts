import {
    Request,
    Response,
    NextFunction
}
from "express";


import * as matchService
from "../services/matchService";


import {
    createMatchSchema
}
from "../dtos/createMatch.dto";


import {
    updateMatchSchema
}
from "../dtos/updateMatch.dto";









export async function createMatch(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {


        const userId =
            (req as any).user.user_id;



        const validatedData =

            createMatchSchema.parse(
                req.body
            );



        const match =

            await matchService.createMatch(
                userId,
                validatedData
            );



        res
            .status(201)
            .json(match);


    }
    catch(error){

        next(error);

    }

}









export async function getMatchesByLeague(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {


        const leagueId =

            Number(
                req.params.leagueId
            );



        const matches =

            await matchService.getMatchesByLeague(
                leagueId
            );


        res.json(
            matches
        );


    }
    catch(error){

        next(error);

    }

}









export async function getMatchPermissions(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {


        const userId =

            (req as any).user.user_id;



        const matchId =

            Number(
                req.params.matchId
            );



        const canManage =

            await matchService.canManageMatch(
                matchId,
                userId
            );



        res.json({

            canManage

        });


    }
    catch(error){

        next(error);

    }

}









export async function updateMatch(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {


        const userId =

            (req as any).user.user_id;



        const matchId =

            Number(
                req.params.matchId
            );



        const validatedData =

            updateMatchSchema.parse(
                req.body
            );



        await matchService.updateMatch(

            userId,

            matchId,

            validatedData

        );



        res.json({

            message:
                "Match updated successfully."

        });


    }
    catch(error){

        next(error);

    }

}









export async function deleteMatch(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {


        const userId =

            (req as any).user.user_id;



        const matchId =

            Number(
                req.params.matchId
            );



        await matchService.deleteMatch(

            userId,

            matchId

        );



        res.json({

            message:
                "Match deleted successfully."

        });


    }
    catch(error){

        next(error);

    }

}