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