import { Request, Response, NextFunction } from "express";

import * as deckService from "../services/deckService";

export async function create(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const user = (req as any).user;

        const deck = await deckService.createDeck(

            user.user_id,

            req.body.commander_id,

            req.body.deck_name,

            req.body.color_identity,

            req.body.power_level

        );

        res.status(201).json(deck);

    } catch (error) {

        next(error);

    }

}

export async function getMine(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const user = (req as any).user;

        const decks = await deckService.getMyDecks(
            user.user_id
        );

        res.json(decks);

    } catch (error) {

        next(error);

    }

}