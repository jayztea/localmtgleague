import { Request, Response, NextFunction } from "express";

import * as leaguePlayerService from "../services/leaguePlayerService";

export async function addPlayer(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const leagueId = Number(req.params.leagueId);

        const { email_address } = req.body;

        const result =
            await leaguePlayerService.addPlayerToLeague(
                leagueId,
                email_address
            );

        res.status(201).json(result);

    } catch (error) {

        next(error);

    }

}

export async function getPlayers(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const leagueId =
            Number(req.params.leagueId);

        const players =
            await leaguePlayerService.getLeaguePlayers(
                leagueId
            );

        res.json(players);

    } catch (error) {

        next(error);

    }

}

export async function removePlayer(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const leagueId =
            Number(req.params.leagueId);

        const playerId =
            Number(req.params.playerId);

        await leaguePlayerService.removePlayer(
            leagueId,
            playerId
        );

        res.json({
            message: "Player removed from league."
        });

    } catch (error) {

        next(error);

    }

}