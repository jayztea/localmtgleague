import * as deckRepository
    from "../repositories/deckRepository";


import * as commanderRepository
    from "../repositories/commanderRepository";


import {
    NotFoundError
} from "../errors/NotFoundError";



export async function createDeck(
    playerId: number,
    data: {

        deck_name: string;

        commander_id: number;

        power_level?: number | null;

        bracket_level?: number | null;

    }
) {


    const commander =
        await commanderRepository.findById(
            data.commander_id
        );


    if (!commander) {

        throw new NotFoundError(
            "Commander not found."
        );

    }



    const deckId =
        await deckRepository.createDeck(
            playerId,
            data.commander_id,
            data.deck_name,
            data.power_level ?? null,
            data.bracket_level ?? null
        );



    return {

        deck_id: deckId

    };

}




export async function getMyDecks(
    playerId: number
) {


    return await deckRepository.findByPlayerId(
        playerId
    );


}