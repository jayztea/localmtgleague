import { db } from "../db";



export async function createDeck(
    playerId: number,
    commanderId: number,
    deckName: string,
    powerLevel: number | null,
    bracketLevel: number | null
) {


    const [result]: any =
        await db.execute(
            `
            INSERT INTO decks
            (
                player_id,
                commander_id,
                deck_name,
                power_level,
                bracket_level
            )

            VALUES (?, ?, ?, ?, ?)

            `,
            [
                playerId,
                commanderId,
                deckName,
                powerLevel,
                bracketLevel
            ]
        );


    return result.insertId;

}




export async function findByPlayerId(
    playerId: number
) {


    const [rows]: any =
        await db.execute(
            `
            SELECT

                d.deck_id,
                d.deck_name,
                d.color_identity,
                d.power_level,
                d.bracket_level,

                c.commander_id,
                c.commander_name

            FROM decks d

            JOIN commanders c
                ON d.commander_id = c.commander_id

            WHERE d.player_id = ?

            AND d.is_active = 1

            ORDER BY d.created_date DESC

            `,
            [
                playerId
            ]
        );


    return rows;

}