import axios from "axios";
import fs from "fs";
import path from "path";


const BULK_URL =
    "https://api.scryfall.com/bulk-data";



export async function downloadOracleCards(): Promise<string> {


    console.log(
        "Finding Oracle bulk download..."
    );



    const bulkResponse =
        await axios.get(
            BULK_URL
        );



    const oracle =
        bulkResponse.data.data.find(
            (item:any) =>
                item.type === "oracle_cards"
        );



    if(!oracle){

        throw new Error(
            "Oracle bulk file not found."
        );

    }



    const dataDirectory =
        path.join(
            process.cwd(),
            "data"
        );



    /*
    Ensure data directory exists
    */

    if(!fs.existsSync(dataDirectory)){

        fs.mkdirSync(
            dataDirectory,
            {
                recursive:true
            }
        );

    }



    const outputPath =
        path.join(
            dataDirectory,
            "oracle_cards.json"
        );



    console.log(
        "Downloading Oracle cards..."
    );



    const response =
        await axios({

            url:oracle.download_uri,

            method:"GET",

            responseType:"stream"

        });



    await new Promise<void>(
        (
            resolve,
            reject
        )=>{


            const writer =
                fs.createWriteStream(
                    outputPath
                );



            response.data.pipe(
                writer
            );



            writer.on(
                "finish",
                resolve
            );



            writer.on(
                "error",
                reject
            );


        }
    );



    console.log(
        "Oracle download complete:"
    );


    console.log(
        outputPath
    );



    return outputPath;

}