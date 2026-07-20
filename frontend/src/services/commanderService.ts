import api from "../api/axios";


export interface CommanderSearchResult {

    commander_id:number;

    commander_name:string;

    color_identity?:string;

}



export async function searchCommanders(
    query:string
){

    const response =
        await api.get<CommanderSearchResult[]>(
            "/commanders/search",
            {
                params:{
                    name:query
                }
            }
        );


    return response.data;

}



export async function addCommanderToPlayer(
    playerId:number,
    commanderId:number
){

    const response =
        await api.post(
            `/players/${playerId}/commanders`,
            {
                commander_id:
                    commanderId
            }
        );


    return response.data;

}