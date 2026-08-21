import dotenv from "dotenv";

dotenv.config({
    path: ".env.production"
});

import {
    importCommanders
} from "../src/services/commanderImportService";


async function main() {

    console.log(
        "===================================="
    );

    console.log(
        " MTG Commander Import Job"
    );

    console.log(
        "===================================="
    );

    console.log(
        `Database: ${process.env.DB_NAME}`
    );

    console.log(
        `Host: ${process.env.DB_HOST}`
    );

    try {

        await importCommanders();

        console.log(
            "Commander import completed successfully."
        );

        process.exit(0);

    }
    catch (
        error
    ) {

        console.error(
            "Commander import failed:"
        );

        console.error(
            error
        );

        process.exit(1);

    }

}


main();