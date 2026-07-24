import StepNavigation
from "../components/StepNavigation";


import StepHeader
from "../../../components/ui/StepHeader";


import type {
    CreateMatchState
}
from "../types";


import "../CreateMatch.css";




interface Props {


    matchState:CreateMatchState;


    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;



    nextStep:()=>void;


    previousStep:()=>void;


    cancelMatch:()=>void;


}








export default function Step4RecordPlacements({

    matchState,

    setMatchState,

    nextStep,

    previousStep,

    cancelMatch


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








    function getCommanderName(player:any){


        const commander =


            player.commanders.find(


                (commander:any)=>

                    commander.commander_id ===

                    player.selected_commander_id


            );



        return commander?.commander_name ?? "";

    }









    function getPlacementOptions(){


        return Array.from(

            {

                length:matchState.players.length

            },

            (_,index)=>index+1

        );


    }









    function placementLabel(value:number){


        if(value===1)

            return "1st";


        if(value===2)

            return "2nd";


        if(value===3)

            return "3rd";


        return `${value}th`;


    }









    return (

        <>


            <StepHeader


                step={4}


                title="Record Placements"


                description="Select the final placement for each player."


            />







            <div className="info-banner">


                🏆 1st Place is the winner.


            </div>








            <div className="placement-list">



                {

                matchState.players.map(player => (



                    <div

                        key={player.player_id}

                        className="placement-card"

                    >




                        <div className="placement-player">


                            {player.display_name}


                        </div>





                        <div className="placement-detail">


                            <span>

                                Commander

                            </span>


                            <strong>

                                {getCommanderName(player)}

                            </strong>


                        </div>





                        <div className="placement-detail">


                            <span>

                                Placement

                            </span>




                            <select


                                className="placement-select"


                                value={

                                    player.placement ?? ""

                                }



                                onChange={(event)=>


                                    updatePlacement(


                                        player.player_id,


                                        Number(

                                            event.target.value

                                        )


                                    )

                                }



                            >


                                <option value="">

                                    Select

                                </option>




                                {

                                getPlacementOptions()

                                .map(position=>(


                                    <option


                                        key={position}


                                        value={position}

                                    >


                                        {placementLabel(position)}


                                    </option>


                                ))

                                }



                            </select>


                        </div>





                    </div>



                ))

                }



            </div>








            <StepNavigation


                previousStep={previousStep}


                nextStep={nextStep}


                cancelMatch={cancelMatch}


                disableNext={


                    matchState.players.some(

                        player=>!player.placement

                    )


                }


            />





        </>

    );

}