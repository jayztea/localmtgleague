import api
from "../api/axios";


import type {
    LeagueStatistics
}
from "../types/leagueStatistics";





export async function getLeagueStatistics(

    leagueId:number

):Promise<LeagueStatistics>{


    const response =

        await api.get<LeagueStatistics>(

            `/leagues/${leagueId}/statistics`

        );



    return response.data;


}