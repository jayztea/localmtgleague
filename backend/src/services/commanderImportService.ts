import fs from "fs";

import {
    CommanderImport,
    upsertCommanders
}
from "../repositories/commanderRepository";


import {
    downloadOracleCards
}
from "./scryfallService";



export function transformCommander(
    card:any
):CommanderImport {


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
            card.color_identity?.join("") ?? "",

        image_url:
            card.image_uris?.normal ?? null,

        scryfall_uri:
            card.scryfall_uri ?? null,

        released_at:
            card.released_at ?? null

    };

}



function isCommander(card:any):boolean {


    if(!card.type_line){
        return false;
    }


    return (

        card.type_line.includes(
            "Legendary Creature"
        )

        ||

        card.oracle_text
            ?.toLowerCase()
            .includes(
                "can be your commander"
            )

    );

}



export async function importCommanders(){


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



    for(const card of cards){


        if(!isCommander(card)){
            continue;
        }



        const commander =
            transformCommander(card);



        await upsertCommanders(
            commander
        );


        imported++;


        if(imported % 100 === 0){

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
        "Commander import complete"
    );

}