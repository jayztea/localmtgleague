import { db } from "../db";

export async function createDeck(
    playerId: number,
    commanderId: number,
    deckName: string,
    colorIdentity: string | null,
    powerLevel: number | null
) {

    const [result]: any = await db.execute(
        `
        INSERT INTO decks
        (
            player_id,
            commander_id,
            deck_name,
            color_identity,
            power_level
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            playerId,
            commanderId,
            deckName,
            colorIdentity,
            powerLevel
        ]
    );

    return result.insertId;

}

export async function getDeckById(deckId: number) {

    const [rows]: any = await db.execute(
        `
        SELECT *
        FROM decks
        WHERE deck_id = ?
        `,
        [deckId]
    );

    return rows[0] ?? null;

}

export async function getDecksByPlayer(playerId: number) {

    const [rows]: any = await db.execute(
        `
        SELECT *
        FROM decks
        WHERE player_id = ?
        AND is_active = TRUE
        ORDER BY deck_name
        `,
        [playerId]
    );

    return rows;

}