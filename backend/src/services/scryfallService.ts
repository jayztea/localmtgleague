import axios from "axios";
import fs from "fs";
import path from "path";
import zlib from "zlib";

const BULK_URL =
    "https://api.scryfall.com/bulk-data";



export async function downloadOracleCards()
: Promise<string> {


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



    if (!oracle) {

        throw new Error(
            "Oracle bulk file not found"
        );

    }



    const downloadUri =
        oracle.download_uri ??
        oracle.jsonl_download_uri;



    if (!downloadUri) {

        throw new Error(
            "Oracle bulk download URL not found"
        );

    }



    const outputPath =
        path.join(
            process.cwd(),
            "data",
            "oracle_cards.json"
        );



    fs.mkdirSync(
        path.dirname(outputPath),
        {
            recursive:true
        }
    );



    console.log(
        "Downloading Oracle cards..."
    );



    console.log(
        downloadUri
    );



    const response =
        await axios({

            url:
                downloadUri,

            method:
                "GET",

            responseType:
                "arraybuffer"

        });



    let jsonData: string;



    if (
        downloadUri.endsWith(".gz")
    ) {

        console.log(
            "Extracting gzip archive..."
        );


        jsonData =
            zlib
                .gunzipSync(
                    response.data
                )
                .toString(
                    "utf8"
                );

    }
    else {

        jsonData =
            Buffer
                .from(
                    response.data
                )
                .toString(
                    "utf8"
                );

    }



    let cards;



    /*
        New Scryfall bulk files are JSONL.
        Existing importer expects JSON array.
        Convert only when needed.
    */

    if (
        jsonData.trim().startsWith("[")
    ) {

        cards =
            JSON.parse(
                jsonData
            );

    }
    else {

        cards =
            jsonData
                .split("\n")
                .filter(
                    line =>
                        line.trim().length > 0
                )
                .map(
                    line =>
                        JSON.parse(line)
                );

    }



    fs.writeFileSync(
        outputPath,
        JSON.stringify(
            cards
        )
    );



    console.log(
        `Downloaded ${cards.length} cards`
    );


    console.log(
        "Oracle download complete:"
    );


    console.log(
        outputPath
    );



    return outputPath;

}