import {
    useNavigate
}
from "react-router-dom";


import {
    createMatch
}
from "../../../services/matchService";


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


    previousStep:()=>void;


    cancelMatch:()=>void;


    saveMatch?:()=>Promise<void>;


}









export default function Step5ReviewMatch({


    matchState,


    previousStep,


    cancelMatch,


    saveMatch


}:Props){



    const navigate =
        useNavigate();





    const today =

        new Date()

        .toLocaleDateString();









    function getCommanderName(player:any){


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


            if(!matchState.league){

                throw new Error(

                    "League is required before creating a match"

                );

            }






            const request = {


                league_id:

                    matchState.league.league_id,



                players:

                    matchState.players.map(player=>({


                        player_id:

                            player.player_id,


                        commander_id:

                            player.selected_commander_id ?? 0,


                        finish_position:

                            player.placement ?? undefined


                    }))


            };








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









    async function handleSave(){


        if(saveMatch){


            await saveMatch();


            return;

        }



        await recordMatch();


    }









    return (

        <>


            <StepHeader


                step={5}


                title="Review & Record Match"


                description="Review the match details below and record the results."


            />









            <div className="review-layout">





                <div className="summary-card">


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









                <div className="review-results">






                    {

                    sortedPlayers()

                    .map(player=>(



                        <div


                            key={player.player_id}


                            className="review-player-card"


                        >





                            <div className="review-placement">


                                #{player.placement}


                            </div>








                            <div>


                                <div className="review-player-name">


                                    {player.display_name}


                                </div>





                                <div className="review-commander">


                                    {getCommanderName(player)}


                                </div>


                            </div>





                        </div>



                    ))

                    }





                </div>






            </div>









            <StepNavigation



                previousStep={previousStep}



                cancelMatch={cancelMatch}



                nextStep={handleSave}



                nextLabel={

                    saveMatch

                    ? "Save Changes"

                    : "Record Match +"

                }



            />





        </>

    );


}