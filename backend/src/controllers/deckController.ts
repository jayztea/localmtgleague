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

        const userId =
            (req as any).user.user_id;


        const deck =
            await deckService.createDeck(
                userId,
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

        const userID =
            (req as any).user.user_id;


        const decks =
            await deckService.getMyDecks(
                userID
            );


        res.json(decks);


    } catch (error) {

        next(error);

    }

}

export async function getPlayerDecks(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {


        const playerId =
            Number(req.params.playerId);


        const decks =
            await deckService.getPlayerDecks(
                playerId
            );


        res.json(decks);


    } catch(error) {

        next(error);

    }

}
export async function getOrCreateCommanderDeck(
    req: Request,
    res: Response,
    next: NextFunction
){

    try{

        const playerId =
            Number(req.params.playerId);

        const commanderId =
            Number(req.params.commanderId);

        const deck =
            await deckService.getOrCreateCommanderDeck(
                playerId,
                commanderId
            );

        res.json(deck);

    }
    catch(error){

        next(error);

    }

}