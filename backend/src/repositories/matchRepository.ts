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
    matchId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                match_id,
                league_id,
                created_by_player_id,
                match_date,
                game_length_minutes,
                notes,
                created_date,
                updated_date,
                updated_by_player_id

            FROM matches

            WHERE match_id = ?

            AND deleted_date IS NULL

            `,
            [
                matchId
            ]
        );


    return rows[0] ?? null;

}









export async function findByLeagueId(
    leagueId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                match_id,
                league_id,
                created_by_player_id,
                match_date,
                game_length_minutes,
                notes,
                created_date,
                updated_date,
                updated_by_player_id

            FROM matches

            WHERE league_id = ?

            AND deleted_date IS NULL

            ORDER BY match_date DESC

            `,
            [
                leagueId
            ]
        );


    return rows;

}





export async function updateMatch(
    matchId:number,
    gameLengthMinutes:number | null,
    notes:string | null,
    updatedByPlayerId:number
){

    const [result]:any =

        await db.execute(
            `
            UPDATE matches

            SET

                game_length_minutes = ?,

                notes = ?,

                updated_by_player_id = ?,

                updated_date = CURRENT_TIMESTAMP

            WHERE match_id = ?

            AND deleted_date IS NULL

            `,
            [
                gameLengthMinutes,
                notes,
                updatedByPlayerId,
                matchId
            ]
        );


    return result.affectedRows > 0;

}





export async function softDeleteMatch(
    matchId:number,
    deletedByPlayerId:number
){

    await db.execute(
        `
        UPDATE matches

        SET

            deleted_date = CURRENT_TIMESTAMP,

            deleted_by_player_id = ?

        WHERE match_id = ?

        AND deleted_date IS NULL

        `,
        [
            deletedByPlayerId,
            matchId
        ]
    );

}