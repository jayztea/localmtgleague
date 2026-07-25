import * as leagueRepository
from "../../repositories/leagueRepository";


import * as statisticsRepository
from "./leagueStatisticsRepository";


import {
    calculateCommanderStats,
    getMostPlayedCommander
}
from "../calculators/commanderStatsCalculator";


import {
    calculateColorStats
}
from "../calculators/colorStatsCalculator";


import {
    calculateLeagueLeaderboard
}
from "./calculators/leaguePlayerCalculator";


import {
    NotFoundError
}
from "../../errors/NotFoundError";





export async function getLeagueStatistics(

    leagueId:number

){



    const league =

        await leagueRepository.findById(

            leagueId

        );



    if(!league){


        throw new NotFoundError(

            "League not found."

        );


    }






    const games =

        await statisticsRepository.findLeagueMatchHistory(

            leagueId

        );






    const totalPlayers =

        await statisticsRepository.findLeaguePlayerCount(

            leagueId

        );






    const totalMatches =

        await statisticsRepository.findLeagueMatchCount(

            leagueId

        );






    const commanderStats =

        calculateCommanderStats(

            games

        );






    const colorStats =

        calculateColorStats(

            games

        );






    const leaderboard =

        calculateLeagueLeaderboard(

            games

        );






    const recentMatches =

        await statisticsRepository.findRecentMatches(

            leagueId,

            5

        );








    return {



        league:{


            league_id:

                league.league_id,


            league_name:

                league.league_name,


            league_code:

                league.league_code


        },







        overview:{



            total_matches:

                totalMatches,



            total_players:

                totalPlayers,



            unique_commanders:

                commanderStats.length,



            average_pod_size:


                totalMatches === 0


                    ? 0


                    :


                    Number(

                        (

                            games.length /

                            totalMatches

                        )

                        .toFixed(2)

                    )


        },







        leaderboard,







        highlights:{



            most_played_commander:


                getMostPlayedCommander(

                    commanderStats

                ),






            favorite_color:


                colorStats[0] ?? null



        },








        recent_matches:

            recentMatches



    };


}