import * as dashboardRepository
    from "../repositories/dashboardRepository";


import * as playerRepository
    from "../repositories/playerRepository";


import {
    NotFoundError
}
from "../errors/NotFoundError";




export async function getDashboard(
    userId:number
) {


    const player =
        await playerRepository.findByUserId(
            userId
        );



    if(!player){

        throw new NotFoundError(
            "Player profile not found."
        );

    }




    const summary =
        await dashboardRepository.findPlayerDashboardSummary(
            player.player_id
        );




    const recentGames =
        await dashboardRepository.findRecentGames(
            player.player_id
        );




    const leagues =
        await dashboardRepository.findPlayerLeagues(
            player.player_id
        );




    for(
        const league of leagues
    ){

        league.leaderboard =
            await dashboardRepository.findLeagueLeaderboard(
                league.league_id
            );

    }




    return {

        player:{

            player_id:
                player.player_id,


            display_name:
                player.display_name

        },


        summary,


        recent_games:
            recentGames,


        leagues

    };

}