import type {
    RecentGame
}
from "../types/dashboard";


interface Props {

    games:RecentGame[];

}



export default function RecentGamesTable(
    {
        games
    }:Props
) {


    if(games.length === 0){

        return (

            <p>

                No games played yet.

            </p>

        );

    }



    return (

        <table className="w-full border">

            <thead>

                <tr>

                    <th className="border p-2">
                        League
                    </th>


                    <th className="border p-2">
                        Commander
                    </th>


                    <th className="border p-2">
                        Finish
                    </th>

                </tr>

            </thead>


            <tbody>

                {
                    games.map(
                        game =>
                        (

                            <tr
                                key={
                                    game.match_id
                                }
                            >

                                <td className="border p-2">

                                    {game.league_name}

                                </td>


                                <td className="border p-2">

                                    {game.commander_name}

                                </td>


                                <td className="border p-2">

                                    {game.finish_position}

                                </td>


                            </tr>

                        )
                    )
                }

            </tbody>


        </table>

    );

}