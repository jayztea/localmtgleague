import api from "../api/axios";



export async function getOrCreateCommanderDeck(

    playerId:number,

    commanderId:number

){


    const response =

        await api.post(

            `/decks/player/${playerId}/commander/${commanderId}`

        );


    return response.data;


}