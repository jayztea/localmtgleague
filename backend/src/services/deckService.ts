import * as deckRepository
    from "../repositories/deckRepository";

import * as playerRepository
    from "../repositories/playerRepository";

import * as commanderRepository
    from "../repositories/commanderRepository";


import {
    NotFoundError
} from "../errors/NotFoundError";



interface CreateDeckRequest {

    deck_name: string;

    commander_id: number;

    power_level?: number;

    bracket_level?: number;

    color_identity?: string;

}



export async function createDeck(
    userId: number,
    data: CreateDeckRequest
) {


    const player =
        await playerRepository.findByUserId(
            userId
        );


    if (!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }



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
            {
                player_id: player.player_id,
                commander_id: data.commander_id,
                deck_name: data.deck_name,
                power_level: data.power_level,
                bracket_level: data.bracket_level,
                color_identity: data.color_identity
            }
        );


    return {
        deck_id: deckId
    };

}





export async function getMyDecks(
    userId: number
) {


    const player =
        await playerRepository.findByUserId(
            userId
        );


    if (!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }



    return await deckRepository.findByPlayerId(
        player.player_id
    );

}