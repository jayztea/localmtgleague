import {
    Request,
    Response,
    NextFunction
} from "express";


import * as deckService
    from "../services/deckService";



export async function createDeck(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const playerId =
            (req as any).user.user_id;


        const deck =
            await deckService.createDeck(
                playerId,
                req.body
            );


        res.status(201).json(deck);


    } catch (error) {

        next(error);

    }

}




export async function getMyDecks(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const playerId =
            (req as any).user.user_id;


        const decks =
            await deckService.getMyDecks(
                playerId
            );


        res.json(decks);


    } catch (error) {

        next(error);

    }

}