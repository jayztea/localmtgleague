import fs from "fs";

import {
    downloadOracleCards
} from "../src/services/scryfallService";

import {
    transformCommander
} from "../src/services/commanderImportService";

import {
    upsertCommanders
} from "../src/repositories/commanderRepository";


async function main() {

    console.log(
        "Starting commander import..."
    );


    const file =
        await downloadOracleCards();


    console.log(
        "Download complete."
    );


    const fileContents =
        fs.readFileSync(
            file,
            "utf8"
        );


    const cards =
        JSON.parse(fileContents);


    console.log(
        `Loaded ${cards.length} cards.`
    );



    const commanders =
        cards.filter((card: any) => {

            if (!card.type_line) {
                return false;
            }


            if (
                !card.type_line.includes("Legendary")
            ) {
                return false;
            }


            if (
                !card.type_line.includes("Creature")
            ) {
                return false;
            }


            // Ignore digital-only cards
            if (
                card.games &&
                !card.games.includes("paper")
            ) {
                return false;
            }


            return true;

        });



    console.log(
        `Found ${commanders.length} commander candidates.`
    );



    const transformed =
        commanders.map(
            transformCommander
        );



    console.log(
        "Example transformed commander:"
    );


    console.log(
        transformed[0]
    );



    console.log(
        "Starting database import..."
    );



    const batchSize = 500;



    for (
        let i = 0;
        i < transformed.length;
        i += batchSize
    ) {


        const batch =
            transformed.slice(
                i,
                i + batchSize
            );


        await upsertCommanders(
            batch
        );


        console.log(
            `Imported ${
                Math.min(
                    i + batchSize,
                    transformed.length
                )
            }/${transformed.length}`
        );

    }



    console.log(
        "Commander import complete!"
    );

}



main()
    .catch(error => {

        console.error(
            "Commander import failed:"
        );

        console.error(
            error
        );

        process.exit(1);

    });