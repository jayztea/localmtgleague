import type {
    PlayerColorStatistics
}
from "../../../types/playerStatistics";



interface Props{

    colors:PlayerColorStatistics[];

}



export default function PlayerColorStatistics({

    colors

}:Props){



    if(
        colors.length === 0
    ){

        return (

            <section className="player-section">


                <h2>

                    Color Statistics

                </h2>



                <p>

                    No color statistics available yet.

                </p>


            </section>

        );

    }



    return (

        <section className="player-section">


            <h2>

                Color Statistics

            </h2>




            <div className="player-table-container">


                <table className="player-stat-table">


                    <thead>


                        <tr>


                            <th>

                                Color Identity

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

                            colors.map(

                                color=>(


                                    <tr

                                        key={
                                            color.color_identity
                                        }

                                    >


                                        <td className="player-primary-column">

                                            {
                                                color.color_identity
                                            }

                                        </td>



                                        <td>

                                            {
                                                color.games_played
                                            }

                                        </td>



                                        <td>

                                            {
                                                color.wins
                                            }

                                        </td>



                                        <td>

                                            {
                                                color.losses
                                            }

                                        </td>



                                        <td>

                                            {
                                                color.win_rate
                                            }%

                                        </td>


                                    </tr>


                                )

                            )

                        }


                    </tbody>


                </table>


            </div>


        </section>

    );

}