
import {
    useState
}
from "react";


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



    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);





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


        /*
         * Prevent multiple submissions.
         *
         * This check happens before the API request is
         * created, so repeated clicks cannot create
         * multiple matches.
         */
        if(isSubmitting){

            return;

        }



        setIsSubmitting(true);




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



            /*
             * Re-enable the button if the request failed.
             *
             * This allows the user to correct/retry the
             * operation rather than being permanently locked
             * on the review screen.
             */
            setIsSubmitting(false);


            alert(

                "Failed to record match."

            );

        }


    }







    async function handleSave(){


        /*
         * Protect both the normal "Record Match" path
         * and the optional edit/save path.
         */
        if(isSubmitting){

            return;

        }



        if(saveMatch){


            setIsSubmitting(true);


            try {


                await saveMatch();


            }


            catch(error){


                console.error(

                    "FAILED TO SAVE MATCH",

                    error

                );


                setIsSubmitting(false);


                throw error;


            }


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

                    isSubmitting

                    ? (

                        saveMatch

                        ? "Saving..."

                        : "Recording..."

                    )

                    : (

                        saveMatch

                        ? "Save Changes"

                        : "Record Match +"

                    )

                }



            />





        </>

    );


}
