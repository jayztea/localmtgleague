import {
    useEffect,
    useState
}
from "react";


import {
    useNavigate,
    useSearchParams
}
from "react-router-dom";


import Step1SelectLeague
from "./steps/Step1SelectLeague";


import Step2AddPlayers
from "./steps/Step2AddPlayers";


import Step3AssignCommanders
from "./steps/Step3AssignCommanders";


import StepCommanderLifeTracker
from "./steps/StepCommanderLifeTracker";


import Step4RecordPlacements
from "./steps/Step4RecordPlacements";


import Step5ReviewMatch
from "./steps/Step5ReviewMatch";


import type {
    CreateMatchState
}
from "./types";


import {
    getLeagueById
}
from "../../services/leagueService";





export default function CreateMatch(){


    const navigate =
        useNavigate();


    const [
        searchParams
    ] =
    useSearchParams();



    const [
        step,
        setStep
    ]
    =
    useState(1);



    const [
        matchState,
        setMatchState
    ]
    =
    useState<CreateMatchState>({

        league:null,

        leaguePlayers:[],

        players:[]

    });



    useEffect(()=>{


        async function loadLeagueFromQuery(){


            const leagueId =

                searchParams.get(
                    "leagueId"
                );


            if(!leagueId){

                return;

            }



            try{


                const league =

                    await getLeagueById(

                        Number(leagueId)

                    );



                setMatchState({

                    league,

                    leaguePlayers:[],

                    players:[]

                });



                setStep(2);


            }

            catch(error){


                console.error(

                    "Failed to load league from shortcut",

                    error

                );


            }

        }



        loadLeagueFromQuery();


    },[searchParams]);





    function cancelMatch(){


        const confirmed =

            window.confirm(

                "Are you sure you want to cancel this match? All entered data will be lost."

            );


        if(!confirmed)

            return;



        setMatchState({

            league:null,

            leaguePlayers:[],

            players:[]

        });



        setStep(1);



        navigate(

            "/dashboard"

        );

    }





    return (

        <div className="create-match-page">


            <div className="create-match-card">


                {

                    step === 1 &&


                    <Step1SelectLeague

                        selectedLeague={

                            matchState.league

                        }


                        setSelectedLeague={

                            (league)=>

                                setMatchState({

                                    ...matchState,

                                    league,

                                    leaguePlayers:[],

                                    players:[]

                                })

                        }


                        nextStep={

                            ()=>setStep(2)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }





                {

                    step === 2 &&


                    <Step2AddPlayers

                        matchState={

                            matchState

                        }


                        setMatchState={

                            setMatchState

                        }


                        nextStep={

                            ()=>setStep(3)

                        }


                        previousStep={

                            ()=>setStep(1)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }





                {

                    step === 3 &&


                    <Step3AssignCommanders

                        matchState={

                            matchState

                        }


                        setMatchState={

                            setMatchState

                        }


                        nextStep={

                            ()=>setStep(4)

                        }


                        previousStep={

                            ()=>setStep(2)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }





                {

                    step === 4 &&


                    <StepCommanderLifeTracker

                        matchState={

                            matchState

                        }


                        setMatchState={

                            setMatchState

                        }


                        previousStep={

                            ()=>setStep(3)

                        }


                        nextStep={

                            ()=>setStep(5)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }





                {

                    step === 5 &&


                    <Step4RecordPlacements

                        matchState={

                            matchState

                        }


                        setMatchState={

                            setMatchState

                        }


                        previousStep={

                            ()=>setStep(4)

                        }


                        nextStep={

                            ()=>setStep(6)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }





                {

                    step === 6 &&


                    <Step5ReviewMatch

                        matchState={

                            matchState

                        }


                        previousStep={

                            ()=>setStep(5)

                        }


                        cancelMatch={

                            cancelMatch

                        }

                    />

                }


            </div>


        </div>

    );

}