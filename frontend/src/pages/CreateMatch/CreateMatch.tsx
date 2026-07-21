import React,{useState} from "react";


import Step1SelectLeague
from "./steps/Step1SelectLeague";


import Step2AddPlayers
from "./steps/Step2AddPlayers";


import Step3AssignCommanders
from "./steps/Step3AssignCommanders";

import Step4RecordPlacements
from "./steps/Step4RecordPlacements";

import Step5ReviewMatch
from "./steps/Step5ReviewMatch";

import type {
    CreateMatchState
}
from "./types";




export default function CreateMatch(){



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






    return (

        <div>


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



                    nextStep={()=>setStep(2)}


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



                    nextStep={()=>setStep(3)}



                    previousStep={()=>setStep(1)}


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



                    nextStep={()=>setStep(4)}



                    previousStep={()=>setStep(2)}


                />


            }
            {
                step===4 &&

                <Step4RecordPlacements

                    matchState={matchState}

                    setMatchState={setMatchState}

                    previousStep={()=>setStep(3)}

                    nextStep={()=>setStep(5)}

                />
            }
            {
                step===5 &&

                <Step5ReviewMatch

                    matchState={matchState}

                    previousStep={()=>setStep(4)}

                />

            }

        </div>

    );

}