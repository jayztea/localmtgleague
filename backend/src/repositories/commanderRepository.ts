import { db } from "../db";

export type CommanderRelationshipType =
    | "partner"
    | "partner_with"
    | "background"
    | "friends_forever"
    | "doctors_companion"
    | "partner_character_select";

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

export interface CommanderRelationship {

    relationship_id: number;

    commander_id: number;

    relationship_type: CommanderRelationshipType;

    related_commander_id: number | null;

}

export interface CommanderRelationshipImport {

    commander_id: number;

    relationship_type: CommanderRelationshipType;

    related_commander_id: number | null;

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
                color_identity,
                type_line,
                oracle_text,
                image_url
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

    const safeLimit =
        Math.max(
            1,
            Math.min(
                limit,
                100
            )
        );

    const [rows]: any =
        await db.execute(
            `
            SELECT
                commander_id,
                commander_name,
                color_identity,
                type_line,
                image_url
            FROM commanders
            WHERE commander_name LIKE ?
            AND (
                type_line IS NULL
                OR type_line NOT LIKE '%Background%'
            )
            ORDER BY commander_name
            LIMIT ${safeLimit}
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
                (
                    value,
                    index
                ) => ({

                    index,

                    value

                })
            )
            .filter(
                item =>
                    item.value === undefined
            );

    if (
        invalidIndexes.length > 0
    ) {

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

export async function findByScryfallId(
    scryfallId: string
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                commander_id,
                commander_name,
                scryfall_id,
                color_identity,
                type_line,
                oracle_text,
                image_url
            FROM commanders
            WHERE scryfall_id = ?
            `,
            [
                scryfallId
            ]
        );

    return rows[0] ?? null;

}

export async function findBackgrounds() {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                commander_id,
                commander_name,
                scryfall_id,
                color_identity,
                type_line,
                image_url
            FROM commanders
            WHERE type_line LIKE '%Background%'
            ORDER BY commander_name
            `
        );

    return rows;

}

export async function findByRelationshipType(
    relationshipType: CommanderRelationshipType
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                c.commander_id,
                c.commander_name,
                c.scryfall_id,
                c.color_identity,
                c.type_line,
                c.oracle_text,
                c.image_url,
                cr.relationship_type,
                cr.related_commander_id
            FROM commanders c
            INNER JOIN commander_relationships cr
                ON cr.commander_id = c.commander_id
            WHERE cr.relationship_type = ?
            ORDER BY c.commander_name
            `,
            [
                relationshipType
            ]
        );

    return rows;

}

export async function findRelationshipsForCommander(
    commanderId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                cr.relationship_id,
                cr.commander_id,
                cr.relationship_type,
                cr.related_commander_id,

                related.commander_name AS related_commander_name,
                related.scryfall_id AS related_scryfall_id,
                related.color_identity AS related_color_identity,
                related.type_line AS related_type_line,
                related.image_url AS related_image_url

            FROM commander_relationships cr

            LEFT JOIN commanders related
                ON related.commander_id =
                    cr.related_commander_id

            WHERE cr.commander_id = ?

            ORDER BY cr.relationship_type
            `,
            [
                commanderId
            ]
        );

    return rows;

}

export async function upsertCommanderRelationship(
    relationship: CommanderRelationshipImport
) {

    await db.execute(
        `
        INSERT INTO commander_relationships (
            commander_id,
            relationship_type,
            related_commander_id
        )

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE

            related_commander_id =
                VALUES(related_commander_id)
        `,
        [
            relationship.commander_id,
            relationship.relationship_type,
            relationship.related_commander_id
        ]
    );

}

export async function deleteAllCommanderRelationships() {

    await db.execute(
        `
        DELETE FROM commander_relationships
        `
    );

}

export async function deleteCommanderRelationships(
    commanderId: number
) {

    await db.execute(
        `
        DELETE FROM commander_relationships
        WHERE commander_id = ?
        `,
        [
            commanderId
        ]
    );

}

export async function findPairingOptionsForCommander(
    commanderId: number,
    relationshipType: CommanderRelationshipType
) {

    if (
        relationshipType ===
        "background"
    ) {

        return findBackgrounds();

    }

    if (
        relationshipType ===
        "partner_with"
    ) {

        const [rows]: any =
            await db.execute(
                `
                SELECT
                    c.commander_id,
                    c.commander_name,
                    c.scryfall_id,
                    c.color_identity,
                    c.type_line,
                    c.image_url

                FROM commander_relationships cr

                INNER JOIN commanders c
                    ON c.commander_id =
                        cr.related_commander_id

                WHERE cr.commander_id = ?

                AND cr.relationship_type = ?

                ORDER BY c.commander_name
                `,
                [
                    commanderId,
                    relationshipType
                ]
            );

        return rows;

    }

    const [rows]: any =
        await db.execute(
            `
            SELECT DISTINCT
                c.commander_id,
                c.commander_name,
                c.scryfall_id,
                c.color_identity,
                c.type_line,
                c.image_url

            FROM commander_relationships cr

            INNER JOIN commanders c
                ON c.commander_id =
                    cr.commander_id

            WHERE cr.relationship_type = ?

            ORDER BY c.commander_name
            `,
            [
                relationshipType
            ]
        );

    return rows;

}