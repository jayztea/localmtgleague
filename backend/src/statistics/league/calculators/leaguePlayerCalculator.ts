import {
    LeagueMatchHistory
}
from "../types/LeagueStatisticsTypes";





export function calculateLeagueLeaderboard(

    games:LeagueMatchHistory[]

){


    const players = new Map<number, any>();



    for(const game of games){



        if(!players.has(game.player_id)){


            players.set(

                game.player_id,

                {

                    player_id:
                        game.player_id,


                    display_name:
                        game.display_name,


                    games_played:0,


                    wins:0,


                    losses:0,


                    win_rate:0,


                    average_finish:0,


                    total_finish:0

                }

            );


        }




        const player =
            players.get(
                game.player_id
            );



        player.games_played++;


        player.total_finish +=
            game.finish_position;



        if(
            game.finish_position === 1
        ){

            player.wins++;

        }

        else {

            player.losses++;

        }


    }





    const results =

        Array.from(
            players.values()
        );





    for(const player of results){


        player.win_rate =

            Number(

                (

                    player.wins /

                    player.games_played *

                    100

                )
                .toFixed(2)

            );



        player.average_finish =

            Number(

                (

                    player.total_finish /

                    player.games_played

                )
                .toFixed(2)

            );



        delete player.total_finish;


    }





    return results.sort(

        (a,b)=>

            b.wins -

            a.wins

    );


}