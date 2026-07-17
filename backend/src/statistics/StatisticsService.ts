import * as statisticsRepository
    from "./statisticsRepository";


import * as playerRepository
    from "../repositories/playerRepository";


import * as statisticsAuthorizationRepository
    from "../repositories/statisticsAuthorizationRepository";


import {
    calculatePlayerStats
}
from "./calculators/playerStatsCalculator";


import {
    calculateCommanderStats,
    getMostPlayedCommander,
    getBestCommander
}
from "./calculators/commanderStatsCalculator";


import {
    calculateColorStats,
    getBestColor,
    getWorstColor
}
from "./calculators/colorStatsCalculator";


import {
    NotFoundError
}
from "../errors/NotFoundError";


import {
    UnauthorizedError
}
from "../errors/UnauthorizedError";




export async function getPlayerStatistics(
    requestingUserId:number,
    playerId:number
) {



    /*
        Find authenticated user's player profile

        user_id
            |
            v
        player_id
    */

    const requestingPlayer =
        await playerRepository.findByUserId(
            requestingUserId
        );



    if (
        !requestingPlayer
    ) {

        throw new UnauthorizedError(
            "Authenticated user does not have a player profile."
        );

    }




    /*
        Verify viewing permissions

        Allowed:
        - own statistics
        - players in same league

    */


    const canView =
        await statisticsAuthorizationRepository.canViewPlayerStatistics(
            requestingPlayer.player_id,
            playerId
        );



    if (
        !canView
    ) {

        throw new UnauthorizedError(
            "You do not have permission to view this player's statistics."
        );

    }




    /*
        Load target player

    */


    const player =
        await playerRepository.findById(
            playerId
        );



    if (
        !player
    ) {

        throw new NotFoundError(
            "Player not found."
        );

    }




    /*
        Load match history

    */


    const games =
        await statisticsRepository.findPlayerMatchHistory(
            playerId
        );





    /*
        Calculate statistics

    */


    const summary =
        calculatePlayerStats(
            games
        );





    const commanderStats =
        calculateCommanderStats(
            games
        );





    const colorStats =
        calculateColorStats(
            games
        );






    return {


        player: {


            player_id:
                player.player_id,


            display_name:
                player.display_name

        },




        summary,





        highlights: {


            most_played_commander:

                getMostPlayedCommander(
                    commanderStats
                ),



            best_commander:

                getBestCommander(
                    commanderStats
                ),



            best_color:

                getBestColor(
                    colorStats
                ),



            worst_color:

                getWorstColor(
                    colorStats
                )


        },





        commander_stats:
            commanderStats,





        color_stats:
            colorStats



    };

}