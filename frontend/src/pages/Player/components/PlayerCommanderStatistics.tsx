import type {
    PlayerCommanderStatistics
}
from "../../../types/playerStatistics";

import "./PlayerCommanderStatistics.css";



interface Props{

    commanders:PlayerCommanderStatistics[];

}



export default function PlayerCommanderStatistics({

    commanders

}:Props){



    if(
        commanders.length === 0
    ){

        return (

            <section className="player-section">

                <h2>

                    Commander Statistics

                </h2>


                <p>

                    No commander statistics available yet.

                </p>

            </section>

        );

    }



    return (

        <section className="player-section">


            <h2>

                Commander Statistics

            </h2>



            <div className="player-table-container">


                <table className="player-stat-table">


                    <thead>

                        <tr>

                            <th>

                                Commander

                            </th>


                            <th>

                                Games

                            </th>


                            <th>

                                Wins

                            </th>


                            <th>

                                Losses

                            </th>


                            <th>

                                Win Rate

                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {

                            commanders.map(

                                commander=>(


                                    <tr

                                        key={
                                            commander.commander_id
                                        }

                                    >


                                        <td className="player-primary-column">

                                            {
                                                commander.commander_name
                                            }

                                        </td>


                                        <td>

                                            {
                                                commander.games_played
                                            }

                                        </td>


                                        <td>

                                            {
                                                commander.wins
                                            }

                                        </td>


                                        <td>

                                            {
                                                commander.losses
                                            }

                                        </td>


                                        <td>

                                            {
                                                commander.win_rate
                                            }%

                                        </td>


                                    </tr>


                                )

                            )

                        }


                    </tbody>


                </table>

            </div>



            <div className="player-mobile-stat-list">

                {

                    commanders.map(

                        commander=>(

                            <div

                                className="player-mobile-stat-card"

                                key={
                                    commander.commander_id
                                }

                            >

                                <div className="player-mobile-stat-title">

                                    {
                                        commander.commander_name
                                    }

                                </div>


                                <div className="player-mobile-stat-grid">


                                    <div>

                                        <span>

                                            Games

                                        </span>

                                        <strong>

                                            {
                                                commander.games_played
                                            }

                                        </strong>

                                    </div>


                                    <div>

                                        <span>

                                            Wins

                                        </span>

                                        <strong>

                                            {
                                                commander.wins
                                            }

                                        </strong>

                                    </div>


                                    <div>

                                        <span>

                                            Losses

                                        </span>

                                        <strong>

                                            {
                                                commander.losses
                                            }

                                        </strong>

                                    </div>


                                    <div>

                                        <span>

                                            Win Rate

                                        </span>

                                        <strong>

                                            {
                                                commander.win_rate
                                            }%

                                        </strong>

                                    </div>


                                </div>

                            </div>

                        )

                    )

                }

            </div>


        </section>

    );

}