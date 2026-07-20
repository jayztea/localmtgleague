import api from "../api/axios";

import type {
    LeaguePlayer
} from "../types/match";


export interface League {

    league_id:number;

    league_name:string;

}



export async function getMyLeagues(){

    const response =
        await api.get<League[]>(
            "/leagues/mine"
        );


    return response.data;

}



export async function getLeaguePlayersWithCommanders(
    leagueId:number
){

    const response =
        await api.get<LeaguePlayer[]>(
            `/leagues/${leagueId}/players-with-commanders`
        );


    return response.data;

}