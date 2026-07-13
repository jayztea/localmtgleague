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