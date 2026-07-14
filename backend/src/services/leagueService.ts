import * as leagueRepository from "../repositories/leagueRepository";

import { NotFoundError } from "../errors/NotFoundError";


export async function createLeague(
    leagueName: string,
    description: string | undefined,
    userId: number
) {

    const leagueId =
        await leagueRepository.createLeague(
            leagueName,
            description,
            userId
        );


    return await leagueRepository.findById(
        leagueId
    );

}



export async function getLeagueById(
    leagueId: number
) {

    const league =
        await leagueRepository.findById(
            leagueId
        );


    if (!league) {

        throw new NotFoundError(
            "League not found."
        );

    }


    return league;

}



export async function getUserLeagues(
    userId: number
) {

    return await leagueRepository.findByUserId(
        userId
    );

}