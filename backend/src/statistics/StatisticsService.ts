import * as statisticsRepository
    from "./statisticsRepository";


import * as playerRepository
    from "../repositories/playerRepository";


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




export async function getPlayerStatistics(
    playerId:number
) {



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




    const games =
        await statisticsRepository.findPlayerMatchHistory(
            playerId
        );





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