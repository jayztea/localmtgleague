import { db } from "../db";


export async function createMatch(
    leagueId: number,
    createdByPlayerId: number,
    gameLengthMinutes?: number,
    notes?: string
) {

    const [result]: any =
        await db.execute(
            `
            INSERT INTO matches
            (
                league_id,
                created_by_player_id,
                game_length_minutes,
                notes
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                leagueId,
                createdByPlayerId,
                gameLengthMinutes ?? null,
                notes ?? null
            ]
        );


    return result.insertId;

}



export async function findById(
    matchId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                match_id,
                league_id,
                created_by_player_id,
                match_date,
                game_length_minutes,
                notes,
                created_date
            FROM matches
            WHERE match_id = ?
            `,
            [
                matchId
            ]
        );


    return rows[0] ?? null;

}



export async function findByLeagueId(
    leagueId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                match_id,
                league_id,
                created_by_player_id,
                match_date,
                game_length_minutes,
                notes,
                created_date
            FROM matches
            WHERE league_id = ?
            ORDER BY match_date DESC
            `,
            [
                leagueId
            ]
        );


    return rows;

}