import { Router } from "express";

import {
    importCommanders
}
from "../services/commanderImportService";


const router = Router();



router.post(
    "/import-commanders",
    async (req, res) => {


        const authHeader =
            req.headers.authorization;


        const expected =
            `Bearer ${process.env.IMPORT_SECRET}`;



        if(authHeader !== expected){

            console.error(
                "Unauthorized commander import attempt"
            );


            return res.status(401).json({

                success:false,

                message:
                    "Unauthorized"

            });

        }



        try {


            console.log(
                "Starting commander import..."
            );


            await importCommanders();



            return res.json({

                success:true,

                message:
                    "Commander import completed"

            });


        }
        catch(error){


            console.error(
                "Commander import failed:",
                error
            );


            return res.status(500).json({

                success:false,

                message:
                    "Commander import failed"

            });

        }

    }
);



export default router;