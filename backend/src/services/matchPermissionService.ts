import * as matchRepository
from "../repositories/matchRepository";


import * as playerRepository
from "../repositories/playerRepository";


import * as leaguePlayerRepository
from "../repositories/leaguePlayerRepository";




export async function canManageMatch(
    matchId:number,
    userId:number
):Promise<boolean>{



    const player =

        await playerRepository.findByUserId(
            userId
        );



    if(!player){

        return false;

    }






    const match =

        await matchRepository.findById(
            matchId
        );



    if(!match){

        return false;

    }







    /*
        Match creator can manage
    */

    if(

        match.created_by_player_id ===

        player.player_id

    ){

        return true;

    }








    /*
        League owner can manage
    */

    const membership =

        await leaguePlayerRepository.findMembership(

            match.league_id,

            player.player_id

        );





    if(

        membership &&

        membership.league_role === "OWNER"

    ){

        return true;

    }






    return false;


}