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


import StepHeader
from "../../components/ui/StepHeader";


import {
    getMatchDetails
}
from "../../services/matchDetailsService";


import type {
    MatchDetails as MatchDetailsType
}
from "../../types/match";


import "./MatchDetails.css";





export default function MatchDetails(){


    const navigate =
        useNavigate();


    const {
        matchId
    } =
    useParams();



    const [
        match,
        setMatch
    ] =
    useState<MatchDetailsType | null>(null);



    const [
        loading,
        setLoading
    ] =
    useState(true);





    useEffect(()=>{


        async function load(){


            try{


                if(!matchId)
                    return;



                const data =

                    await getMatchDetails(

                        Number(matchId)

                    );


                setMatch(
                    data
                );


            }
            catch(error){

                console.error(
                    error
                );

            }
            finally{

                setLoading(
                    false
                );

            }

        }


        load();


    },[matchId]);






    if(loading){

        return (

            <div className="match-details-page">

                Loading Match...

            </div>

        );

    }



    if(!match){

        return (

            <div className="match-details-page">

                Match not found.

            </div>

        );

    }





    return (

        <div className="match-details-page">


            <StepHeader

                step={0}

                showStep={false}

                title="Match Details"

                description="Review the recorded match results."

            />




            <button

                className="match-back-button"

                onClick={()=>


                    navigate(

                        `/league/${match.league.league_id}`

                    )

                }

            >

                ← Back to League

            </button>






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

                        {match.league.league_name}

                    </p>




                    <p>

                        <strong>
                            Date:
                        </strong>

                        {" "}

                        {
                            new Date(
                                match.match_date
                            )
                            .toLocaleDateString()
                        }

                    </p>




                    <p>

                        <strong>
                            Players:
                        </strong>

                        {" "}

                        {match.players.length}

                    </p>



                </div>






                <div className="review-results">


                    {
                        match.players.map(player=>(


                            <div

                                key={
                                    player.player_id
                                }

                                className="review-player-card"

                            >


                                <div className="review-placement">

                                    #{player.finish_position}

                                </div>



                                <div>


                                    <div className="review-player-name">


                                        {
                                            player.display_name
                                        }


                                    </div>



                                    <div className="review-commander">


                                        {
                                            player.commander_name
                                        }


                                    </div>


                                </div>



                            </div>


                        ))
                    }



                </div>




            </div>




        </div>

    );

}