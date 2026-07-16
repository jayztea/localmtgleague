import { db } from "../db";


interface CreateMatchPlayerParams {

    match_id: number;

    player_id: number;

    deck_id: number;

    finish_position?: number;

    starting_life?: number;

    ending_life?: number;

}



export async function createMatchPlayer(
    data: CreateMatchPlayerParams
) {

    const [result]: any =
        await db.execute(
            `
            INSERT INTO match_players
            (
                match_id,
                player_id,
                deck_id,
                finish_position,
                starting_life,
                ending_life
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                data.match_id,
                data.player_id,
                data.deck_id,
                data.finish_position ?? null,
                data.starting_life ?? 40,
                data.ending_life ?? null
            ]
        );


    return result.insertId;

}



export async function findByMatchId(
    matchId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT

                mp.match_player_id,
                mp.player_id,
                p.display_name,

                mp.deck_id,
                d.deck_name,

                mp.finish_position,
                mp.starting_life,
                mp.ending_life

            FROM match_players mp

            JOIN players p
                ON mp.player_id = p.player_id

            JOIN decks d
                ON mp.deck_id = d.deck_id

            WHERE mp.match_id = ?

            ORDER BY mp.finish_position ASC
            `,
            [
                matchId
            ]
        );


    return rows;

}