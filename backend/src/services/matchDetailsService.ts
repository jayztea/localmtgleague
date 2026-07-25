import * as repository
from "../repositories/matchDetailsRepository";


import {
    NotFoundError
}
from "../errors/NotFoundError";



export async function getMatchDetails(
    matchId:number
){


    const rows =

        await repository.findMatchDetails(
            matchId
        );



    if(!rows.length){

        throw new NotFoundError(
            "Match not found."
        );

    }



    return {

        match_id:
            rows[0].match_id,


        league:{

            league_id:
                rows[0].league_id,


            league_name:
                rows[0].league_name

        },


        match_date:
            rows[0].match_date,



        players:

            rows.map(
                (player:any)=>({

                    player_id:
                        player.player_id,


                    display_name:
                        player.display_name,


                    finish_position:
                        player.finish_position,


                    deck_id:
                        player.deck_id,


                    commander_id:
                        player.commander_id,


                    commander_name:
                        player.commander_name,


                    color_identity:
                        player.color_identity

                })
            )

    };

}