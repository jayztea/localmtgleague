import {
    useNavigate
}
from "react-router-dom";

import type {
    PlayerMatchHistory
}
from "../../../types/playerStatistics";

import "./PlayerRecentMatches.css";



interface Props{

    matches:PlayerMatchHistory[];

}



export default function PlayerRecentMatches({

    matches

}:Props){

    const navigate =
        useNavigate();



    if(
        !matches ||
        matches.length === 0
    ){

        return (

            <section className="player-section">


                <h2>

                    Recent Match History

                </h2>



                <p>

                    No matches recorded yet.

                </p>


            </section>

        );

    }



    function formatDate(
        date:Date | string
    ){

        return new Date(date)
            .toLocaleDateString(
                "en-US",
                {
                    month:"short",
                    day:"numeric",
                    year:"numeric"
                }
            );

    }



    function getPlacementLabel(
        placement:number
    ){

        if(
            placement === 1
        ){

            return "🥇 1st";

        }


        if(
            placement === 2
        ){

            return "🥈 2nd";

        }


        if(
            placement === 3
        ){

            return "🥉 3rd";

        }


        return `#${placement}`;

    }



    return (

        <section className="player-section">


            <h2>

                Recent Match History

            </h2>




            <div className="player-table-container">


                <table className="player-stat-table">


                    <thead>


                        <tr>


                            <th>

                                Date

                            </th>


                            <th>

                                Commander

                            </th>


                            <th>

                                Deck

                            </th>


                            <th>

                                Finish

                            </th>


                            <th>

                                Action

                            </th>


                        </tr>


                    </thead>



                    <tbody>


                        {

                            matches.map(

                                match=>(


                                    <tr

                                        key={
                                            match.match_player_id
                                        }

                                    >


                                        <td>

                                            {
                                                formatDate(
                                                    match.match_date
                                                )
                                            }

                                        </td>



                                        <td>

                                            {
                                                match.commander_name
                                            }

                                        </td>



                                        <td>

                                            {
                                                match.deck_name
                                            }

                                        </td>



                                        <td>

                                            {
                                                getPlacementLabel(
                                                    match.finish_position
                                                )
                                            }

                                        </td>



                                        <td>


                                            <button

                                                className="player-match-button"

                                                onClick={

                                                    ()=>navigate(
                                                        `/matches/${match.match_id}`
                                                    )

                                                }

                                            >

                                                View Match

                                            </button>


                                        </td>


                                    </tr>


                                )

                            )

                        }


                    </tbody>


                </table>


            </div>



            <div className="player-mobile-match-list">

                {

                    matches.map(

                        match=>(

                            <div

                                className="player-mobile-match-card"

                                key={
                                    match.match_player_id
                                }

                            >


                                <div className="player-mobile-match-date">

                                    {
                                        formatDate(
                                            match.match_date
                                        )
                                    }

                                </div>



                                <div className="player-mobile-match-commander">

                                    {
                                        match.commander_name
                                    }

                                </div>



                                <div className="player-mobile-match-deck">

                                    <span>

                                        Deck

                                    </span>

                                    <strong>

                                        {
                                            match.deck_name
                                        }

                                    </strong>

                                </div>



                                <div className="player-mobile-match-footer">


                                    <span className="player-mobile-match-placement">

                                        {
                                            getPlacementLabel(
                                                match.finish_position
                                            )
                                        }

                                    </span>



                                    <button

                                        className="player-match-button"

                                        onClick={

                                            ()=>navigate(
                                                `/matches/${match.match_id}`
                                            )

                                        }

                                    >

                                        View Match

                                    </button>


                                </div>


                            </div>

                        )

                    )

                }

            </div>


        </section>

    );

}