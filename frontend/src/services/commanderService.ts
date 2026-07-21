import api from "../api/axios";


export async function searchCommanders(
    query:string
){

    const response =
        await api.get(
            "/commanders/search",
            {
                params:{
                    query
                }
            }
        );


    return response.data;

}