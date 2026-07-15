import { db } from "../db";

export async function createPlayer(
    userId: number,
    displayName: string
) {

    const [result]: any = await db.execute(
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

    return result;

}

export async function findByUserId(
    userId: number
) {

    const [rows]: any = await db.execute(
        `
        SELECT
            player_id,
            display_name,
            user_id
        FROM players
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0] ?? null;

}