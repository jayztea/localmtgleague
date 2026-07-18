import {
    Request,
    Response,
    NextFunction
}
from "express";

import * as leagueService
    from "../services/leagueService";

export async function createLeague(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const userId =
            (req as any).user.user_id;

        const league =
            await leagueService.createLeague(
                req.body.league_name,
                req.body.description,
                userId
            );

        res.status(201).json(
            league
        );

    }
    catch (error) {

        next(error);

    }

}

export async function joinLeague(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const userId =
            (req as any).user.user_id;

        const league =
            await leagueService.joinLeague(
                userId,
                req.body.league_code
            );

        res.json({
            message: "Successfully joined league.",
            league
        });

    }
    catch (error) {

        next(error);

    }

}

export async function getLeague(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const leagueId =
            Number(req.params.leagueId);

        const league =
            await leagueService.getLeagueById(
                leagueId
            );

        res.json(
            league
        );

    }
    catch (error) {

        next(error);

    }

}

export async function getMyLeagues(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const userId =
            (req as any).user.user_id;

        const leagues =
            await leagueService.getUserLeagues(
                userId
            );

        res.json(
            leagues
        );

    }
    catch (error) {

        next(error);

    }

}