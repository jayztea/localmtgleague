import {
    useEffect,
    useState
}
from "react";


import {
    useNavigate,
    useParams
}
from "react-router-dom";


import Step3AssignCommanders
from "../CreateMatch/steps/Step3AssignCommanders";


import Step4RecordPlacements
from "../CreateMatch/steps/Step4RecordPlacements";


import type {
    CreateMatchState,
    MatchPlayer
}
from "../CreateMatch/types";


import {
    getMatchDetails,
    updateMatch
}
from "../../services/matchDetailsService";


import "./EditMatch.css";





export default function EditMatch(){


    const navigate =
        useNavigate();


    const {
        matchId
    } =
    useParams();





    const [
        step,
        setStep
    ] =
    useState(3);





    const [
        loading,
        setLoading
    ] =
    useState(true);





    const [
        saving,
        setSaving
    ] =
    useState(false);





    const [
        matchState,
        setMatchState
    ] =
    useState<CreateMatchState>({

        league:null,

        leaguePlayers:[],

        players:[]

    });









    useEffect(()=>{


        async function loadMatch(){


            if(!matchId){

                return;

            }



            try{


                const match =

                    await getMatchDetails(

                        Number(matchId)

                    );





                const players:MatchPlayer[] =

                    match.players.map(

                        (player:any)=>({


                            player_id:
                                player.player_id,


                            display_name:
                                player.display_name,


                            commanders:[

                                {

                                    commander_id:
                                        player.commander_id,

                                    commander_name:
                                        player.commander_name

                                }

                            ],


                            selected_commander_id:
                                player.commander_id,


                            placement:
                                player.finish_position


                        })

                    );






                setMatchState({

                    league: match.league,


                    leaguePlayers:[],


                    players

                });


            }
            catch(error){


                console.error(

                    "Failed loading match",

                    error

                );


            }
            finally{


                setLoading(false);


            }


        }




        loadMatch();


    },[matchId]);









    async function saveMatch(){


        if(!matchId){

            return;

        }




        try{


            setSaving(true);





            await updateMatch(

                Number(matchId),

                {


                    players:

                        matchState.players.map(player=>({


                            player_id:

                                player.player_id,


                            commander_id:

                                player.selected_commander_id!,


                            finish_position:

                                player.placement ?? undefined


                        }))


                }

            );






            navigate(

                `/matches/${matchId}`

            );


        }
        catch(error){


            console.error(

                "Failed saving match",

                error

            );


            alert(

                "Unable to save match."

            );


        }
        finally{


            setSaving(false);


        }


    }









    if(loading){


        return (

            <div className="edit-match-page">

                Loading Match...

            </div>

        );

    }









    return (

        <div className="edit-match-page">


            <div className="edit-match-card">





                {
                    step === 3 &&

                    <Step3AssignCommanders


                        matchState={
                            matchState
                        }


                        setMatchState={
                            setMatchState
                        }


                        nextStep={()=>

                            setStep(4)

                        }


                        previousStep={()=>


                            navigate(

                                `/matches/${matchId}`

                            )

                        }


                        cancelMatch={()=>


                            navigate(

                                `/matches/${matchId}`

                            )

                        }


                    />

                }









                {
                    step === 4 &&


                    <Step4RecordPlacements


                        matchState={

                            matchState

                        }


                        setMatchState={

                            setMatchState

                        }


                        previousStep={()=>


                            setStep(3)

                        }


                        nextStep={()=>


                            saveMatch()

                        }


                        cancelMatch={()=>


                            navigate(

                                `/matches/${matchId}`

                            )

                        }


                    />

                }





            </div>


        </div>


    );


}