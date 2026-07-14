import { ResultSetHeader } from "mysql2";

import { db } from "../db";

export async function createPlayer(
    userId: number,
    displayName: string
): Promise<number> {

    const [result] =
        await db.execute<ResultSetHeader>(
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