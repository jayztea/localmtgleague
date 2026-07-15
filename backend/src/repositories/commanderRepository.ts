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



export async function upsertCommanders(
    commanders: CommanderImport[]
) {

    if (commanders.length === 0) {
        return;
    }


    const values =
        commanders.map(
            commander => [

                commander.scryfall_id,

                commander.commander_name,

                commander.mana_cost,

                commander.mana_value,

                commander.type_line,

                commander.oracle_text,

                commander.power,

                commander.toughness,

                commander.color_identity,

                commander.image_url,

                commander.scryfall_uri,

                commander.released_at

            ]
        );


    const placeholders =
        values
            .map(() => "(?,?,?,?,?,?,?,?,?,?,?,?)")
            .join(",");



    await db.execute(
        `
        INSERT INTO commanders
        (
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

        VALUES ${placeholders}

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
        values.flat()
    );

}