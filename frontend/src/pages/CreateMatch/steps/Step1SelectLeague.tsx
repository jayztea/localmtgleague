import React,{useEffect,useState} from "react";


import {
    getMyLeagues
} from "../../../services/leagueService";


import type {
    League
} from "../../../services/leagueService";



interface Props {


    selectedLeague:League|null;


    setSelectedLeague:
    (
        league:League|null
    )=>void;



    nextStep:()=>void;


}





export default function Step1SelectLeague({

    selectedLeague,

    setSelectedLeague,

    nextStep


}:Props){



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





    useEffect(()=>{


        async function loadLeagues(){


            try{


                setLoading(true);



                const result =
                    await getMyLeagues();



                setLeagues(
                    result
                );


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


    },[]);






    return (

        <div

            style={{

                padding:"40px",

                minHeight:"600px",

                display:"flex",

                flexDirection:"column"

            }}

        >


            <h1>
                (1) Select League
            </h1>



            <p>
                Choose a league for this match.
            </p>





            {
                loading &&

                <p>
                    Loading leagues...
                </p>

            }






            {
                !loading &&


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

                                l =>

                                l.league_id === leagueId

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

                                key={
                                    league.league_id
                                }


                                value={
                                    league.league_id
                                }

                            >

                                {
                                    league.league_name
                                }


                            </option>


                        ))

                    }



                </select>


            }







            <div

                style={{

                    marginTop:"auto",

                    display:"flex",

                    justifyContent:"flex-end"

                }}

            >


                <button


                    disabled={
                        selectedLeague === null
                    }



                    onClick={
                        nextStep
                    }


                >

                    Next →

                </button>


            </div>


        </div>

    );


}