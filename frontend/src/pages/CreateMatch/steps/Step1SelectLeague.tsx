import { useEffect, useState } from "react";

import {
    getMyLeagues
}
from "../../../services/leagueService";


import type {
    League
}
from "../../../services/leagueService";


import StepHeader
from "../../../components/ui/StepHeader";


import StepNavigation
from "../components/StepNavigation";



interface Props {

    selectedLeague: League | null;

    setSelectedLeague: (
        league: League | null
    ) => void;

    nextStep: () => void;

    cancelMatch: () => void;

}



export default function Step1SelectLeague({

    selectedLeague,

    setSelectedLeague,

    nextStep,

    cancelMatch

}: Props) {



    const [
        leagues,
        setLeagues
    ]
    =
    useState<League[]>([]);



    const [
        loading,
        setLoading
    ]
    =
    useState(false);





    useEffect(() => {


        async function loadLeagues(){


            try {


                setLoading(true);


                const result =
                    await getMyLeagues();


                setLeagues(result);


            }


            catch(error){


                console.error(

                    "FAILED LOADING LEAGUES",

                    error

                );


            }


            finally{


                setLoading(false);


            }


        }



        loadLeagues();



    }, []);







    return (


        <div className="create-match-page">


            <div className="create-match-card">


                <StepHeader


                    step={1}


                    title="Select League"


                    description="Choose a league for this match."


                />





                {


                loading &&


                    <p>

                        Loading leagues...

                    </p>


                }





                {


                !loading &&


                    <div className="form-group">


                        <label className="form-label">

                            League

                        </label>



                        <select


                            value={

                                selectedLeague

                                ?

                                selectedLeague.league_id

                                :

                                ""

                            }



                            onChange={(event)=>{


                                const leagueId =

                                    Number(

                                        event.target.value

                                    );



                                const league =


                                    leagues.find(


                                        league =>


                                            league.league_id === leagueId


                                    )

                                    ??

                                    null;



                                setSelectedLeague(

                                    league

                                );


                            }}



                        >



                            <option value="">

                                Select League

                            </option>




                            {


                            leagues.map(league=>(


                                <option


                                    key={league.league_id}


                                    value={league.league_id}


                                >


                                    {league.league_name}


                                </option>


                            ))


                            }




                        </select>



                    </div>


                }





                <div

                    style={{

                        height:260,

                        border:"2px dashed #D9DCE3",

                        borderRadius:8,

                        marginTop:40,

                        display:"flex",

                        alignItems:"center",

                        justifyContent:"center",

                        color:"#9CA3AF"

                    }}

                >


                    League Image Placeholder


                </div>






                <StepNavigation


                    nextStep={nextStep}


                    cancelMatch={cancelMatch}


                    disableNext={

                        selectedLeague === null

                    }


                />





            </div>


        </div>


    );

}