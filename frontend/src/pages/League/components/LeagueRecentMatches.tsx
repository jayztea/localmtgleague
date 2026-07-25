import {
    useNavigate
}
from "react-router-dom";


import type {
    RecentLeagueMatch
}
from "../../../types/leagueStatistics";



interface Props {

    matches:RecentLeagueMatch[];

}





export default function LeagueRecentMatches({

    matches

}:Props){


    const navigate =
        useNavigate();





    function openMatchDetails(
        matchId:number
    ){

        navigate(
            `/matches/${matchId}`
        );

    }





    return (

        <section className="league-section-card">


            <h2 className="league-section-title">

                Recent Matches

            </h2>





            {
                matches.length === 0 && (

                    <div className="league-empty-state">

                        No matches played yet.

                    </div>

                )
            }






            {
                matches.map(match=>(


                    <div

                        key={match.match_id}

                        className="league-match-card"

                        onClick={()=>

                            openMatchDetails(
                                match.match_id
                            )

                        }

                        style={{
                            cursor:"pointer"
                        }}

                    >



                        <div>



                            <div className="league-match-title">


                                {
                                    new Date(
                                        match.match_date
                                    )
                                    .toLocaleDateString(
                                        "en-US"
                                    )
                                }


                            </div>






                            <div className="league-match-subtitle">


                                Winner:

                                {" "}

                                {match.winner_name}


                            </div>






                            <div className="league-match-subtitle">


                                Players:

                                {" "}

                                {match.players}


                            </div>




                        </div>








                        <div

                            className="league-match-link"

                        >

                            View Details →

                        </div>





                    </div>


                ))
            }





        </section>

    );

}