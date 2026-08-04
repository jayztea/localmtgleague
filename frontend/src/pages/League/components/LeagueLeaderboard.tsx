import {
    useNavigate
}
from "react-router-dom";


import type {
    LeagueLeaderboardEntry
}
from "../../../types/leagueStatistics";


import "./LeagueLeaderboard.css";



interface Props{

    leaderboard:LeagueLeaderboardEntry[];

}



export default function LeagueLeaderboard({

    leaderboard

}:Props){


    const navigate =
        useNavigate();




    function getRankDisplay(rank:number){

        switch(rank){

            case 1:

                return "🥇";


            case 2:

                return "🥈";


            case 3:

                return "🥉";


            default:

                return `#${rank}`;

        }

    }




    return(

        <section className="league-section-card">


            <h2 className="league-section-title">

                Leaderboard

            </h2>



            <table className="league-leaderboard-table">


                <thead>


                    <tr>


                        <th>

                            Rank

                        </th>


                        <th>

                            Player

                        </th>


                        <th>

                            Wins

                        </th>


                        <th>

                            Games

                        </th>


                        <th>

                            Win %

                        </th>


                    </tr>


                </thead>




                <tbody>


                    {

                        leaderboard.map(

                            (

                                player,

                                index

                            )=>(


                                <tr

                                    key={
                                        player.player_id
                                    }

                                >



                                    <td>

                                        {
                                            getRankDisplay(
                                                index + 1
                                            )
                                        }

                                    </td>




                                    <td>


                                        <button

                                            className="league-player-link"

                                            onClick={()=>navigate(

                                                `/player/${player.player_id}`

                                            )}

                                        >

                                            {
                                                player.display_name
                                            }

                                        </button>


                                    </td>




                                    <td>

                                        {
                                            player.wins
                                        }

                                    </td>




                                    <td>

                                        {
                                            player.games_played
                                        }

                                    </td>




                                    <td>

                                        {
                                            player.win_rate
                                        }%

                                    </td>


                                </tr>


                            )

                        )

                    }


                </tbody>


            </table>


        </section>

    );

}