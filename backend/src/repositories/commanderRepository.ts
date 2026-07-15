import { db } from "../db";



export async function findById(
    commanderId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                commander_id,
                commander_name,
                color_identity
            FROM commanders
            WHERE commander_id = ?
            `,
            [
                commanderId
            ]
        );


    return rows[0] ?? null;

}