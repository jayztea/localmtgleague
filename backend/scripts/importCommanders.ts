import dotenv from "dotenv";


// Load production env when running locally.
// GitHub Actions provides these values through workflow secrets.
dotenv.config({
    path: ".env.production"
});


import {
    importCommanders
}
from "../src/services/commanderImportService";



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


    try {


        await importCommanders();


        console.log(
            "Commander import completed successfully."
        );


        process.exit(0);


    }
    catch(error) {


        console.error(
            "Commander import failed:"
        );


        console.error(error);


        process.exit(1);

    }

}



main();