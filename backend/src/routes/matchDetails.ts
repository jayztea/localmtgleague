import {
    Router
}
from "express";


import {
    getMatchDetails
}
from "../services/matchDetailsService";


const router =
    Router();



router.get(

    "/matches/:matchId/details",

    async(req,res,next)=>{

        try{


            const data =

                await getMatchDetails(

                    Number(
                        req.params.matchId
                    )

                );


            res.json(
                data
            );


        }
        catch(error){

            next(error);

        }

    }

);



export default router;