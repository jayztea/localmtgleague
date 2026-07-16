import { db } from "../db";


export async function createPlayer(
    userId: number,
    displayName: string
) {

    const [result]: any =
        await db.execute(
            `
            INSERT INTO players
            (
                user_id,
                display_name
            )
            VALUES (?, ?)
            `,
            [
                userId,
                displayName
            ]
        );


    return result.insertId;

}



export async function findByUserId(
    userId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                player_id,
                user_id,
                display_name
            FROM players
            WHERE user_id = ?
            `,
            [
                userId
            ]
        );


    return rows.length
        ? rows[0]
        : null;

}
export async function findById(
    playerId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                player_id,
                user_id,
                display_name

            FROM players

            WHERE player_id = ?

            `,
            [
                playerId
            ]
        );


    return rows.length
        ? rows[0]
        : null;

}