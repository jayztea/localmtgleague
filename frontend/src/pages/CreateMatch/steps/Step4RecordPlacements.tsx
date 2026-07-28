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


        return commander?.commander_name ?? "Unknown Commander";

    }





    function getPlacementOptions(){

        return Array.from(

            {

                length:matchState.players.length

            },

            (_,index)=>index + 1

        );

    }





    function placementLabel(value:number){

        if(value===1)

            return "1st Place";

        if(value===2)

            return "2nd Place";

        if(value===3)

            return "3rd Place";


        return `${value}th Place`;

    }





    return (

        <>

            <StepHeader

                step={4}

                title="Record Placements"

                description="Enter the final standings for this match."

            />




            <div className="placement-header-card">

                <div className="placement-header-icon">

                    🏆

                </div>


                <div>

                    <h3>

                        Record Final Results

                    </h3>


                    <p>

                        The player in 1st place will be recorded as the winner.

                    </p>

                </div>

            </div>






            <div className="placement-list">


                {

                    matchState.players.map(player=>(


                        <div

                            key={player.player_id}

                            className="placement-card"

                        >


                            <div className="placement-player-info">


                                <div className="placement-player-name">

                                    {player.display_name}

                                </div>


                                <div className="placement-player-commander">

                                    🃏 {getCommanderName(player)}

                                </div>


                            </div>





                            <div className="placement-selection">


                                <label>

                                    Final Placement

                                </label>



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

                                        Select Placement

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