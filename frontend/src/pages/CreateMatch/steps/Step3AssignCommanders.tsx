import CommanderSelector
from "../components/CommanderSelector";


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


    matchState: CreateMatchState;


    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;



    nextStep: () => void;


    previousStep: () => void;


    cancelMatch: () => void;


}








export default function Step3AssignCommanders({


    matchState,


    setMatchState,


    nextStep,


    previousStep,


    cancelMatch


}: Props) {





    function updateCommander(

        playerId:number,

        commanderId:number

    ){


        setMatchState({


            ...matchState,


            players:

                matchState.players.map(player =>


                    player.player_id === playerId


                    ?


                    {


                        ...player,


                        selected_commander_id: commanderId


                    }


                    :


                    player


                )


        });


    }









    function commanderAdded(

        playerId:number,

        commander:any

    ){


        setMatchState({


            ...matchState,


            players:


                matchState.players.map(player =>


                    player.player_id === playerId


                    ?


                    {


                        ...player,


                        commanders:[


                            ...player.commanders,


                            commander


                        ],


                        selected_commander_id:

                            commander.commander_id


                    }


                    :


                    player


                )


        });


    }










    const allPlayersHaveCommander =


        matchState.players.every(


            player =>

                player.selected_commander_id


        );









    return (

        <>


            <StepHeader


                step={3}


                title="Assign Commanders"


                description="Select a commander for each player."


            />








            <div className="assignment-list">



                {

                matchState.players.map(player => (


                    <div

                        key={player.player_id}

                        className="assignment-card"

                    >



                        <div className="assignment-player">


                            {player.display_name}


                        </div>





                        <div className="assignment-label">


                            Commander


                        </div>




                        <CommanderSelector


                            player={player}


                            selectedCommanderId={

                                player.selected_commander_id

                            }



                            onChange={updateCommander}



                            onCommanderAdded={

                                commanderAdded

                            }


                        />



                    </div>


                ))

                }



            </div>










            <StepNavigation


                previousStep={previousStep}


                nextStep={nextStep}


                cancelMatch={cancelMatch}


                disableNext={!allPlayersHaveCommander}


            />





        </>

    );

}