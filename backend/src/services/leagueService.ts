import * as leagueRepository
    from "../repositories/leagueRepository";

import * as leaguePlayerRepository
    from "../repositories/leaguePlayerRepository";

import * as playerRepository
    from "../repositories/playerRepository";

import { generateLeagueCode }
    from "../utils/generateLeagueCode";

import {
    NotFoundError
}
from "../errors/NotFoundError";

import {
    ConflictError
}
from "../errors/ConflictError";


export async function createLeague(
    leagueName: string,
    description: string | undefined,
    userId: number
) {


    const player =
        await playerRepository.findByUserId(
            userId
        );


    if (!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }



    let leagueCode:string;



    while(true) {

        leagueCode =
            generateLeagueCode();


        const existing =
            await leagueRepository.findByLeagueCode(
                leagueCode
            );


        if(!existing) {

            break;

        }

    }



    const leagueId =
        await leagueRepository.createLeague(
            leagueName,
            leagueCode,
            description,
            userId
        );



    await leaguePlayerRepository.createMembership(
        leagueId,
        player.player_id,
        "OWNER"
    );



    return await leagueRepository.findById(
        leagueId
    );

}



export async function joinLeague(
    userId:number,
    leagueCode:string
) {


    const player =
        await playerRepository.findByUserId(
            userId
        );



    if(!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }



    const league =
        await leagueRepository.findByLeagueCode(
            leagueCode
        );



    if(!league) {

        throw new NotFoundError(
            "League not found."
        );

    }




    const existingMembership =
        await leaguePlayerRepository.findMembership(
            league.league_id,
            player.player_id
        );



    if(existingMembership) {


        if(existingMembership.status === "ACTIVE") {

            throw new ConflictError(
                "You are already a member of this league."
            );

        }



        await leaguePlayerRepository.reactivateMembership(
            league.league_id,
            player.player_id
        );

    }
    else {


        await leaguePlayerRepository.createMembership(
            league.league_id,
            player.player_id,
            "PLAYER"
        );


    }



    return league;

}



export async function getLeagueById(
    leagueId:number
) {


    const league =
        await leagueRepository.findById(
            leagueId
        );


    if(!league) {

        throw new NotFoundError(
            "League not found."
        );

    }


    return league;

}



export async function getUserLeagues(
    userId:number
) {

    return await leagueRepository.findByUserId(
        userId
    );

}