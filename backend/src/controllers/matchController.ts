import {
    Request,
    Response,
    NextFunction
} from "express";


import * as matchService
    from "../services/matchService";


import {
    createMatchSchema
} from "../dtos/createMatch.dto";



export async function createMatch(
    req: Request,
    res: Response,
    next: NextFunction
) {

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



    } catch(error) {

        next(error);

    }

}
export async function getMatchesByLeague(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {


        const leagueId =
            Number(req.params.leagueId);



        const matches =
            await matchService.getMatchesByLeague(
                leagueId
            );



        res.json(matches);



    } catch(error) {

        next(error);

    }

}