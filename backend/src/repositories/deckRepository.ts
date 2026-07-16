import { db } from "../db";


interface CreateDeckParams {

    player_id: number;

    commander_id: number;

    deck_name: string;

    power_level?: number;

    bracket_level?: number;

    color_identity?: string;

}




export async function createDeck(
    data: CreateDeckParams
) {


    const [result]: any =
        await db.execute(
            `
            INSERT INTO decks
            (
                player_id,
                commander_id,
                deck_name,
                color_identity,
                power_level,
                bracket_level
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                data.player_id,
                data.player_id,
                data.commander_id,
                data.deck_name,
                data.color_identity ?? null,
                data.power_level ?? null,
                data.bracket_level ?? null
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
                d.player_id,
                d.deck_name,
                d.color_identity,
                d.power_level,
                d.bracket_level,
                d.is_active,
                c.commander_id
            FROM decks d
            JOIN commanders c
                ON d.commander_id = c.commander_id
            WHERE d.player_id = ?
            ORDER BY d.created_date DESC
            `,
            [
                playerId
            ]
        );


    return rows;

}





export async function findById(
    deckId: number
) {


    const [rows]: any =
        await db.execute(
            `
            SELECT

                d.deck_id,
                d.player_id,
                d.deck_name,
                d.color_identity,
                d.power_level,
                d.bracket_level,
                d.is_active,
                c.commander_id
            FROM decks d
            JOIN commanders c
                ON d.commander_id = c.commander_id
            WHERE d.deck_id = ?

            `,
            [
                deckId
            ]
        );


    return rows.length
        ? rows[0]
        : null;

}