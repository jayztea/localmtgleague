import React from "react";
import { useNavigate } from "react-router-dom";


import {
    createMatch
}
from "../../../services/matchService";


import type {
    CreateMatchState
}
from "../types";



interface Props {

    matchState: CreateMatchState;

    previousStep:()=>void;

}





export default function Step5ReviewMatch({

    matchState,

    previousStep

}:Props){



    const navigate = useNavigate();



    const today =
        new Date()
        .toLocaleDateString();







    function getCommanderName(

        player:any

    ){


        const commander =

            player.commanders?.find(

                (commander:any)=>

                    commander.commander_id ===
                    player.selected_commander_id

            );


        return commander?.commander_name ?? "";

    }








    function sortedPlayers(){


        return [

            ...matchState.players

        ]

        .sort(

            (a,b)=>

                (a.placement ?? 0)

                -

                (b.placement ?? 0)

        );


    }









    async function recordMatch(){


        try {



            const request = {



                league_id:

                    matchState.league?.league_id,




                players:


                    matchState.players.map(player=>({



                        player_id:

                            player.player_id,



                        commander_id:

                            player.selected_commander_id,



                        finish_position:

                            player.placement



                    }))



            };






            console.log(

                "CREATE MATCH REQUEST",

                request

            );






            await createMatch(

                request

            );






            alert(

                "Match recorded successfully!"

            );



            navigate(

                "/dashboard"

            );



        }


        catch(error){



            console.error(

                "FAILED TO CREATE MATCH",

                error

            );




            alert(

                "Failed to record match."

            );



        }


    }








    return (


        <div

        style={{

            padding:"40px"

        }}

        >



            <h1>
                (5) Review & Record Match
            </h1>




            <p>
                Review the match details below and record the match results.
            </p>







            <div

            style={{

                display:"flex",

                gap:"50px",

                marginTop:"40px"

            }}

            >






                <div

                style={{

                    border:"1px solid black",

                    padding:"20px",

                    width:"300px"

                }}

                >



                    <h2>
                        Match Summary
                    </h2>




                    <p>

                        <strong>
                            League:
                        </strong>

                        {" "}

                        {
                            matchState.league?.league_name
                        }

                    </p>





                    <p>

                        <strong>
                            Date:
                        </strong>

                        {" "}

                        {
                            today
                        }

                    </p>





                    <p>

                        <strong>
                            Players:
                        </strong>

                        {" "}

                        {
                            matchState.players.length
                        }

                    </p>




                </div>









                <div>



                    <table

                    style={{

                        width:"500px",

                        borderCollapse:"collapse"

                    }}

                    >



                        <thead>


                            <tr>


                                <th>
                                    Placement
                                </th>


                                <th>
                                    Player
                                </th>


                                <th>
                                    Commander
                                </th>


                            </tr>



                        </thead>







                        <tbody>


                        {

                        sortedPlayers()

                        .map(player=>(



                            <tr

                            key={

                                player.player_id

                            }

                            >



                                <td>

                                    {
                                        player.placement
                                    }

                                </td>




                                <td>

                                    {
                                        player.display_name
                                    }

                                </td>




                                <td>

                                    {
                                        getCommanderName(player)
                                    }

                                </td>




                            </tr>



                        ))

                        }



                        </tbody>




                    </table>




                </div>





            </div>









            <div

            style={{

                marginTop:"50px",

                display:"flex",

                justifyContent:"space-between"

            }}

            >





                <button

                onClick={previousStep}

                >

                    ← Back

                </button>







                <button

                onClick={recordMatch}

                >

                    Record Match +

                </button>






            </div>





        </div>


    );


}