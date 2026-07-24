import { db } from "../db";


export interface CommanderImport {

    scryfall_id: string;

    commander_name: string;

    mana_cost: string | null;

    mana_value: number | null;

    type_line: string | null;

    oracle_text: string | null;

    power: string | null;

    toughness: string | null;

    color_identity: string;

    image_url: string | null;

    scryfall_uri: string | null;

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
            [
                commanderId
            ]
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




export async function upsertCommanders(
    commander: CommanderImport
) {


    console.log(
        "IMPORTING:",
        commander.commander_name
    );



    const values = [

        commander.scryfall_id ?? null,

        commander.commander_name ?? null,

        commander.mana_cost ?? null,

        commander.mana_value ?? null,

        commander.type_line ?? null,

        commander.oracle_text ?? null,

        commander.power ?? null,

        commander.toughness ?? null,

        commander.color_identity ?? "",

        commander.image_url ?? null,

        commander.scryfall_uri ?? null,

        commander.released_at ?? null

    ];



    const invalidIndexes =
        values
            .map(
                (value,index)=>({

                    index,

                    value

                })
            )
            .filter(
                item =>
                    item.value === undefined
            );



    if(invalidIndexes.length > 0){

        console.error(
            "INVALID SQL VALUES"
        );

        console.error(
            invalidIndexes
        );


        console.error(
            commander
        );


        throw new Error(
            "Commander contains undefined values"
        );

    }



    await db.execute(

        `
        INSERT INTO commanders (

            scryfall_id,

            commander_name,

            mana_cost,

            mana_value,

            type_line,

            oracle_text,

            power,

            toughness,

            color_identity,

            image_url,

            scryfall_uri,

            released_at

        )

        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)

        ON DUPLICATE KEY UPDATE

            commander_name = VALUES(commander_name),

            mana_cost = VALUES(mana_cost),

            mana_value = VALUES(mana_value),

            type_line = VALUES(type_line),

            oracle_text = VALUES(oracle_text),

            power = VALUES(power),

            toughness = VALUES(toughness),

            color_identity = VALUES(color_identity),

            image_url = VALUES(image_url),

            scryfall_uri = VALUES(scryfall_uri),

            released_at = VALUES(released_at)

        `,


        values

    );

}