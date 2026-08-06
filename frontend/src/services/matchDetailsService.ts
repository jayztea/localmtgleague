import api
from "../api/axios";


import type {
    MatchDetails
}
from "../types/match";





export async function getMatchDetails(
    matchId:number
):Promise<MatchDetails>{


    const response =

        await api.get(

            `/matches/${matchId}/details`

        );


    return response.data;

}









export async function getMatchPermissions(
    matchId:number
){

    const response =

        await api.get(

            `/matches/${matchId}/permissions`

        );


    return response.data;

}









export async function updateMatch(
    matchId:number,
    data:any
){

    const response =

        await api.put(

            `/matches/${matchId}`,

            data

        );


    return response.data;

}









export async function deleteMatch(
    matchId:number
){

    const response =

        await api.delete(

            `/matches/${matchId}`

        );


    return response.data;

}