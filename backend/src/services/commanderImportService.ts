import fs from "fs";
import path from "path";

import {
    CommanderImport,
    CommanderRelationshipImport,
    CommanderRelationshipType,
    findByScryfallId,
    deleteAllCommanderRelationships,
    upsertCommanders,
    upsertCommanderRelationship
}
from "../repositories/commanderRepository";

import {
    downloadOracleCards
}
from "./scryfallService";


const DEBUG_CARD =
    "Traxos, Scourge of Kroog";

const DEBUG_FILE =
    path.join(
        process.cwd(),
        "data",
        "import-debug.log"
    );


interface ScryfallCard {

    id: string;

    name: string;

    type_line?: string;

    oracle_text?: string;

    mana_cost?: string;

    mana_value?: number;

    cmc?: number;

    power?: string;

    toughness?: string;

    color_identity?: string[];

    image_uris?: {
        normal?: string;
    };

    scryfall_uri?: string;

    released_at?: string;

    all_parts?: Array<{
        object: string;
        id: string;
        component: string;
        name: string;
        type_line?: string;
        uri?: string;
    }>;

    legalities?: {
        commander?: string;
    };

    keywords?: string[];

}


interface RelationshipIntent {

    commanderScryfallId: string;

    commanderName: string;

    relationshipType:
        CommanderRelationshipType;

    relatedCommanderScryfallId:
        string | null;

    relatedCommanderName:
        string | null;

}


function writeDebug(
    message: string,
    data?: any
) {

    fs.mkdirSync(
        path.dirname(DEBUG_FILE),
        {
            recursive: true
        }
    );


    fs.appendFileSync(
        DEBUG_FILE,
        `${new Date().toISOString()} ${message}\n`
    );


    if (
        data !== undefined
    ) {

        fs.appendFileSync(
            DEBUG_FILE,
            JSON.stringify(
                data,
                null,
                2
            ) + "\n\n"
        );

    }

}


function isBackground(
    card: ScryfallCard
): boolean {

    const typeLine =
        card.type_line ??
        "";


    return typeLine
        .toLowerCase()
        .includes(
            "background"
        );

}


function isLegendaryCommander(
    card: ScryfallCard
): boolean {

    const typeLine =
        card.type_line ??
        "";


    const oracleText =
        (
            card.oracle_text ??
            ""
        )
            .toLowerCase();


    const isLegendary =
        typeLine.includes(
            "Legendary"
        );


    const isCommanderType =
        typeLine.includes(
            "Creature"
        )
        ||
        typeLine.includes(
            "Spacecraft"
        );


    const explicitlyAllowsCommander =
        oracleText.includes(
            "can be your commander"
        );


    return (

        (
            isLegendary &&
            isCommanderType
        )

        ||

        explicitlyAllowsCommander

    );

}


function isCommander(
    card: ScryfallCard
): boolean {

    return (

        isBackground(card)

        ||

        isLegendaryCommander(card)

    );

}


function hasKeyword(
    card: ScryfallCard,
    keyword: string
): boolean {

    return (
        card.keywords ??
        []
    ).some(
        value =>
            value.toLowerCase() ===
            keyword.toLowerCase()
    );

}


function hasOracleText(
    card: ScryfallCard,
    text: string
): boolean {

    return (
        card.oracle_text ??
        ""
    )
        .toLowerCase()
        .includes(
            text.toLowerCase()
        );

}


function isPartnerWith(
    card: ScryfallCard
): boolean {

    return (

        hasOracleText(
            card,
            "partner with"
        )

    );

}


function isFriendsForever(
    card: ScryfallCard
): boolean {

    return (

        hasOracleText(
            card,
            "friends forever"
        )

        ||

        hasKeyword(
            card,
            "Friends forever"
        )

    );

}


function isDoctorsCompanion(
    card: ScryfallCard
): boolean {

    return (

        hasOracleText(
            card,
            "doctor's companion"
        )

        ||

        hasKeyword(
            card,
            "Doctor's companion"
        )

    );

}


function isCharacterSelect(
    card: ScryfallCard
): boolean {

    return (

        hasOracleText(
            card,
            "partner—character select"
        )

        ||

        hasOracleText(
            card,
            "partner - character select"
        )

        ||

        hasOracleText(
            card,
            "partner — character select"
        )

    );

}


function isChooseBackground(
    card: ScryfallCard
): boolean {

    return hasOracleText(
        card,
        "choose a background"
    );

}


function isNormalPartner(
    card: ScryfallCard
): boolean {

    if (
        isPartnerWith(card)
    ) {

        return false;

    }


    if (
        isFriendsForever(card)
    ) {

        return false;

    }


    if (
        isCharacterSelect(card)
    ) {

        return false;

    }


    if (
        isDoctorsCompanion(card)
    ) {

        return false;

    }


    return (

        hasOracleText(
            card,
            "partner"
        )

        ||

        hasKeyword(
            card,
            "Partner"
        )

    );

}


function getPartnerWithCardName(
    card: ScryfallCard
): string | null {

    const parts =
        card.all_parts ??
        [];


    const relatedCard =
        parts.find(
            part =>
                part.component ===
                    "combo_piece"
                &&
                part.name !==
                    card.name
        );


    if (
        !relatedCard
    ) {

        return null;

    }


    return (
        relatedCard.name ??
        null
    );

}


function transformCommander(
    card: ScryfallCard
): CommanderImport {

    return {

        scryfall_id:
            card.id,

        commander_name:
            card.name,

        mana_cost:
            card.mana_cost ??
            null,

        mana_value:
            card.mana_value ??
            card.cmc ??
            null,

        type_line:
            card.type_line ??
            null,

        oracle_text:
            card.oracle_text ??
            null,

        power:
            card.power ??
            null,

        toughness:
            card.toughness ??
            null,

        color_identity:
            Array.isArray(
                card.color_identity
            )
                ? card.color_identity.join("")
                : "",

        image_url:
            card.image_uris?.normal ??
            null,

        scryfall_uri:
            card.scryfall_uri ??
            null,

        released_at:
            card.released_at ??
            null

    };

}


function buildRelationshipIntents(
    cards: ScryfallCard[]
): RelationshipIntent[] {

    const relationships:
        RelationshipIntent[] = [];


    for (
        const card of cards
    ) {

        if (
            !isCommander(card)
        ) {

            continue;

        }


        if (
            isPartnerWith(card)
        ) {

            const partnerName =
                getPartnerWithCardName(
                    card
                );


            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "partner_with",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    partnerName

            });


            continue;

        }


        if (
            isChooseBackground(card)
        ) {

            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "background",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    null

            });

        }


        if (
            isFriendsForever(card)
        ) {

            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "friends_forever",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    null

            });

        }


        if (
            isDoctorsCompanion(card)
        ) {

            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "doctors_companion",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    null

            });

        }


        if (
            isCharacterSelect(card)
        ) {

            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "partner_character_select",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    null

            });

        }


        if (
            isNormalPartner(card)
        ) {

            relationships.push({

                commanderScryfallId:
                    card.id,

                commanderName:
                    card.name,

                relationshipType:
                    "partner",

                relatedCommanderScryfallId:
                    null,

                relatedCommanderName:
                    null

            });

        }

    }


    return relationships;

}


async function resolveCommanderId(
    scryfallId: string,
    commanderName: string
): Promise<number> {

    const commander =
        await findByScryfallId(
            scryfallId
        );


    if (
        !commander
    ) {

        throw new Error(
            `Unable to resolve imported commander: ${commanderName} (${scryfallId})`
        );

    }


    return commander.commander_id;

}


async function resolveCommanderIdByName(
    commanderName: string,
    cardsByName: Map<string, ScryfallCard>
): Promise<number> {

    const card =
        cardsByName.get(
            commanderName
        );


    if (
        !card
    ) {

        throw new Error(
            `Unable to find related Scryfall card by name: ${commanderName}`
        );

    }


    return resolveCommanderId(
        card.id,
        card.name
    );

}


async function importRelationships(
    relationships: RelationshipIntent[],
    cards: ScryfallCard[]
) {

    console.log(
        "Building commander relationships..."
    );


    const cardsByName =
        new Map<string, ScryfallCard>();


    for (
        const card of cards
    ) {

        cardsByName.set(
            card.name,
            card
        );

    }


    await deleteAllCommanderRelationships();


    let imported =
        0;

    let unresolved =
        0;


    for (
        const relationship of relationships
    ) {

        const commanderId =
            await resolveCommanderId(
                relationship.commanderScryfallId,
                relationship.commanderName
            );


        let relatedCommanderId:
            number | null =
            null;


        if (
            relationship.relatedCommanderName
        ) {

            try {

                relatedCommanderId =
                    await resolveCommanderIdByName(
                        relationship.relatedCommanderName,
                        cardsByName
                    );

            }
            catch (
                error
            ) {

                console.error(
                    error
                );


                unresolved++;

                continue;

            }

        }


        if (
            relationship.relationshipType ===
                "partner_with"
            &&
            !relatedCommanderId
        ) {

            console.warn(
                `Skipping unresolved Partner With relationship: ${relationship.commanderName} -> ${relationship.relatedCommanderName ?? "unknown"}`
            );

            continue;
        }


        const relationshipImport:
            CommanderRelationshipImport = {

                commander_id:
                    commanderId,

                relationship_type:
                    relationship.relationshipType,

                related_commander_id:
                    relatedCommanderId

            };


        await upsertCommanderRelationship(
            relationshipImport
        );


        imported++;

    }


    console.log(
        `Commander relationships imported: ${imported}`
    );


    console.log(
        `Commander relationships unresolved: ${unresolved}`
    );


    if (
        unresolved > 0
    ) {

        throw new Error(
            `Commander relationship import completed with ${unresolved} unresolved relationship(s).`
        );

    }

}


export async function importCommanders() {

    if (
        process.env.NODE_ENV !==
        "development"
    ) {

        throw new Error(
            "Commander import is only allowed when NODE_ENV=development."
        );

    }


    if (
        process.env.DB_HOST !==
            "localhost"
        &&
        process.env.DB_HOST !==
            "127.0.0.1"
    ) {

        throw new Error(
            `Refusing to run commander import against database host: ${process.env.DB_HOST}`
        );

    }


    fs.mkdirSync(
        path.dirname(DEBUG_FILE),
        {
            recursive: true
        }
    );


    fs.writeFileSync(
        DEBUG_FILE,
        ""
    );


    console.log(
        "Starting commander import..."
    );


    console.log(
        `Database host: ${process.env.DB_HOST}`
    );


    console.log(
        `Database name: ${process.env.DB_NAME}`
    );


    const filePath =
        await downloadOracleCards();


    console.log(
        "Reading oracle cards..."
    );


    const raw =
        fs.readFileSync(
            filePath,
            "utf8"
        );


    const cards:
        ScryfallCard[] =
        JSON.parse(raw);


    console.log(
        `Loaded ${cards.length} cards.`
    );


    const commanderCards =
        cards.filter(
            card =>
                isCommander(card)
        );


    console.log(
        `Identified ${commanderCards.length} commander/background cards.`
    );


    const relationships =
        buildRelationshipIntents(
            commanderCards
        );


    console.log(
        `Identified ${relationships.length} commander relationships.`
    );


    let imported =
        0;


    const skipped =
        cards.length -
        commanderCards.length;


    for (
        const card of commanderCards
    ) {

        if (
            card.name ===
            DEBUG_CARD
        ) {

            writeDebug(
                "FOUND CARD",
                card
            );

            writeDebug(
                "isCommander",
                {
                    result:
                        isCommander(card)
                }
            );

        }


        const commander =
            transformCommander(
                card
            );


        if (
            commander.commander_name ===
            DEBUG_CARD
        ) {

            writeDebug(
                "TRANSFORMED",
                commander
            );

        }


        try {

            await upsertCommanders(
                commander
            );


            if (
                commander.commander_name ===
                DEBUG_CARD
            ) {

                writeDebug(
                    "INSERT SUCCEEDED"
                );

            }

        }
        catch (
            error
        ) {

            if (
                commander.commander_name ===
                DEBUG_CARD
            ) {

                writeDebug(
                    "INSERT FAILED",
                    error
                );

            }


            throw error;

        }


        imported++;


        if (
            imported % 100 ===
            0
        ) {

            console.log(
                `${imported} commander/background cards imported`
            );

        }

    }


    console.log(
        "=============================="
    );


    console.log(
        `Imported: ${imported}`
    );


    console.log(
        `Skipped: ${skipped}`
    );


    console.log(
        "Commander card import complete"
    );


    await importRelationships(
        relationships,
        commanderCards
    );


    console.log(
        "=============================="
    );


    console.log(
        "Commander relationship import complete"
    );


    console.log(
        "=============================="
    );

}