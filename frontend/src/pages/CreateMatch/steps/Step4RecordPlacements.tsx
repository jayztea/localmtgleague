import React from "react";


import type {
    CreateMatchState
}
from "../types";



interface Props {

    matchState: CreateMatchState;

    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;

    nextStep:()=>void;

    previousStep:()=>void;

}



export default function Step4RecordPlacements({

    matchState,

    setMatchState,

    nextStep,

    previousStep


}:Props){



    function updatePlacement(

        playerId:number,

        placement:number

    ){


        setMatchState({

            ...matchState,

            players:

            matchState.players.map(player=>


                player.player_id === playerId

                ?

                {

                    ...player,

                    placement

                }

                :

                player


            )

        });


    }





    function getPlacementOptions(){

        return Array.from(

            {
                length:
                matchState.players.length
            },

            (_,index)=>index + 1

        );

    }





    function getPlacementLabel(

        placement:number

    ){


        if(placement === 1)
            return "1st";


        if(placement === 2)
            return "2nd";


        if(placement === 3)
            return "3rd";


        return `${placement}th`;

    }





    function getCommanderName(

        player:any

    ){


        const commander =

            player.commanders.find(

                (commander:any)=>

                    commander.commander_id ===
                    player.selected_commander_id

            );


        return commander?.commander_name ?? "";

    }





    return (

        <div

        style={{

            padding:"40px"

        }}

        >



            <h1>
                (4) Record Placements
            </h1>



            <p>
                Select the final placement for each player.
            </p>


            <p>
                <strong>
                    Note: 1st is the winner
                </strong>
            </p>




            <table

            style={{

                marginTop:"30px",

                width:"700px",

                borderCollapse:"collapse"

            }}

            >


                <thead>

                    <tr>

                        <th>
                            Player
                        </th>


                        <th>
                            Commander
                        </th>


                        <th>
                            Placement
                        </th>

                    </tr>

                </thead>




                <tbody>


                {

                matchState.players.map(player=>(


                    <tr

                    key={
                        player.player_id
                    }

                    >


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





                        <td>


                            <select


                            value={

                                player.placement ?? ""

                            }


                            onChange={(event)=>{


                                updatePlacement(

                                    player.player_id,

                                    Number(
                                        event.target.value
                                    )

                                );


                            }}


                            >


                                <option value="">

                                    Select Placement

                                </option>



                                {

                                getPlacementOptions()

                                .map(position=>(


                                    <option

                                    key={position}

                                    value={position}

                                    >

                                        {
                                            getPlacementLabel(
                                                position
                                            )
                                        }

                                    </option>


                                ))

                                }


                            </select>



                        </td>


                    </tr>


                ))

                }


                </tbody>


            </table>





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


                disabled={

                    matchState.players.some(

                        player=>
                        !player.placement

                    )

                }


                onClick={nextStep}

                >

                    Next →

                </button>


            </div>



        </div>

    );


}