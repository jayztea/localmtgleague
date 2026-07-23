import api from "../api/axios";

import type {
    League
}
from "../types/league";

import type {
    LeaguePlayer
}
from "../types/match";

export type {
    League
}
from "../types/league";

export interface CreateLeagueRequest {

    league_name: string;

    description?: string;

}

export interface JoinLeagueRequest {

    league_code: string;

}

export async function createLeague(

    data: CreateLeagueRequest

): Promise<League> {

    const response =
        await api.post<League>(

            "/leagues",

            data

        );

    return response.data;

}

export async function joinLeague(

    data: JoinLeagueRequest

): Promise<League> {

    const response =
        await api.post<{ league: League }>(

            "/leagues/join",

            data

        );

    return response.data.league;

}

export async function getMyLeagues(): Promise<League[]> {

    const response =
        await api.get<League[]>(

            "/leagues/mine"

        );

    return response.data;

}

export async function getLeaguePlayersWithCommanders(

    leagueId: number

): Promise<LeaguePlayer[]> {

    const response =
        await api.get<LeaguePlayer[]>(

            `/leagues/${leagueId}/players-with-commanders`

        );

    return response.data;

}