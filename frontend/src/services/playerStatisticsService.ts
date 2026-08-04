import api
from "../api/axios";


import type {
    PlayerStatistics
}
from "../types/playerStatistics";



export async function getPlayerStatistics(

    playerId:number

):Promise<PlayerStatistics>{


    const response =
        await api.get<PlayerStatistics>(

            `/players/${playerId}/statistics`

        );


    return response.data;


}