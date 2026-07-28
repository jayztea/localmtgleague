import fs from "fs";
import path from "path";

import {
    CommanderImport,
    upsertCommanders
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

    if (data !== undefined) {

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



function isCommander(
    card: any
): boolean {

    const typeLine =
        card.type_line ?? "";

    const oracleText =
        (
            card.oracle_text ?? ""
        ).toLowerCase();

    return (

        (

            typeLine.includes(
                "Legendary"
            )

            &&

            typeLine.includes(
                "Creature"
            )

        )

        ||

        oracleText.includes(
            "can be your commander"
        )

    );

}



export function transformCommander(
    card: any
): CommanderImport {

    return {

        scryfall_id:
            card.id,

        commander_name:
            card.name,

        mana_cost:
            card.mana_cost ?? null,

        mana_value:
            card.mana_value ??
            card.cmc ??
            null,

        type_line:
            card.type_line ?? null,

        oracle_text:
            card.oracle_text ?? null,

        power:
            card.power ?? null,

        toughness:
            card.toughness ?? null,

        color_identity:
            Array.isArray(
                card.color_identity
            )
                ? card.color_identity.join("")
                : "",

        image_url:
            card.image_uris?.normal
            ?? null,

        scryfall_uri:
            card.scryfall_uri ?? null,

        released_at:
            card.released_at ?? null

    };

}



export async function importCommanders() {


    fs.writeFileSync(
        DEBUG_FILE,
        ""
    );


    console.log(
        "Starting commander import..."
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


    const cards =
        JSON.parse(raw);


    console.log(
        `Loaded ${cards.length} cards.`
    );


    let imported = 0;

    let skipped = 0;


    for (
        const card of cards
    ) {


        if (
            card.name === DEBUG_CARD
        ) {

            writeDebug(
                "FOUND CARD",
                card
            );

            writeDebug(
                "isCommander",
                {
                    result:
                        isCommander(
                            card
                        )
                }
            );

        }


        if (
            !isCommander(card)
        ) {

            if (
                card.name ===
                DEBUG_CARD
            ) {

                writeDebug(
                    "CARD WAS SKIPPED"
                );

            }

            skipped++;

            continue;

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
            imported % 100 === 0
        ) {

            console.log(
                `${imported} commanders imported`
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
        "Commander import complete"
    );

}