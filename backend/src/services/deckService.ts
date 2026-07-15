import * as deckRepository from "../repositories/deckRepository";
import * as playerRepository from "../repositories/playerRepository";

import { NotFoundError } from "../errors/NotFoundError";

export async function createDeck(
    userId: number,
    commanderId: number,
    deckName: string,
    colorIdentity?: string,
    powerLevel?: number
) {

    // Find the player's record from the logged-in user
    const player = await playerRepository.findByUserId(userId);

    if (!player) {
        throw new NotFoundError("Player not found.");
    }

    const deckId = await deckRepository.createDeck(
        player.player_id,
        commanderId,
        deckName,
        colorIdentity ?? null,
        powerLevel ?? null
    );

    return {
        deck_id: deckId,
        player_id: player.player_id,
        commander_id: commanderId,
        deck_name: deckName,
        color_identity: colorIdentity ?? null,
        power_level: powerLevel ?? null
    };

}

export async function getMyDecks(
    userId: number
) {

    const player = await playerRepository.findByUserId(userId);

    if (!player) {
        throw new NotFoundError("Player not found.");
    }

    return await deckRepository.getDecksByPlayer(
        player.player_id
    );

}