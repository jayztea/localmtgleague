import { Router } from "express";

import {
    importCommanders
} from "../services/commanderImportServices";


const router = Router();



router.post(
    "/import-commanders",
    async (_req, res) => {

        console.log(
            "Manual commander import triggered"
        );


        try {

            await importCommanders();


            res.status(200).json({

                success: true,

                message:
                    "Commander import completed"

            });


        }
        catch(error){


            console.error(
                "Commander import failed:",
                error
            );


            res.status(500).json({

                success:false,

                message:
                    "Commander import failed"

            });

        }

    }

);



export default router;