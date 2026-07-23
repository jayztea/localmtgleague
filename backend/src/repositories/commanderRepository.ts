import { db } from "../db";


export interface CommanderImport {

    scryfall_id: string;

    commander_name: string;

    mana_cost: string | null;

    mana_value: number | null;

    type_line: string;

    oracle_text: string | null;

    power: string | null;

    toughness: string | null;

    color_identity: string;

    image_url: string | null;

    scryfall_uri: string;

    released_at: string | null;

}



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
            [commanderId]
        );

    return rows[0] ?? null;
}



export async function search(
    query: string,
    limit: number = 20
) {

    const [rows]: any =

        await db.execute(

            `
            SELECT

                commander_id,

                commander_name,

                color_identity

            FROM commanders

            WHERE commander_name LIKE ?

            ORDER BY commander_name

            LIMIT ${limit}

            `,

            [
                `%${query}%`
            ]

        );


    return rows;

}