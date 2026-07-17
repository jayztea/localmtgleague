import {
    PlayerMatchHistory,
    ColorStatistics
}
from "../types/StatisticsTypes";



export function calculateColorStats(
    games: PlayerMatchHistory[]
): ColorStatistics[] {


    const colors =
        new Map<
            string,
            ColorStatistics
        >();



    for (const game of games) {


        const color =
            game.color_identity
            ??
            "Colorless";



        if (
            !colors.has(color)
        ) {


            colors.set(
                color,
                {

                    color_identity:
                        color,

                    games_played:
                        0,

                    wins:
                        0,

                    losses:
                        0,

                    win_rate:
                        0

                }
            );

        }



        const colorStat =
            colors.get(color)!;



        colorStat.games_played++;



        if (
            game.finish_position === 1
        ) {

            colorStat.wins++;

        }

    }



    const statistics =
        Array.from(
            colors.values()
        );



    for (const color of statistics) {


        color.losses =
            color.games_played -
            color.wins;



        color.win_rate =
            Number(
                (
                    color.wins /
                    color.games_played *
                    100
                )
                .toFixed(2)
            );

    }



    statistics.sort(

        (
            a,
            b
        ) =>

            b.games_played -
            a.games_played

    );



    return statistics;

}



export function getBestColor(
    colors: ColorStatistics[],
    minimumGames:number = 5
): ColorStatistics | null {


    const eligible =
        colors.filter(

            color =>

                color.games_played >=
                minimumGames

        );



    if (
        eligible.length === 0
    ) {

        return null;

    }



    eligible.sort(

        (
            a,
            b
        ) =>

            b.win_rate -
            a.win_rate ||

            b.games_played -
            a.games_played

    );



    return eligible[0];

}



export function getWorstColor(
    colors: ColorStatistics[],
    minimumGames:number = 5
): ColorStatistics | null {


    const eligible =
        colors.filter(

            color =>

                color.games_played >=
                minimumGames

        );



    if (
        eligible.length === 0
    ) {

        return null;

    }



    eligible.sort(

        (
            a,
            b
        ) =>

            a.win_rate -
            b.win_rate ||

            b.games_played -
            a.games_played

    );



    return eligible[0];

}