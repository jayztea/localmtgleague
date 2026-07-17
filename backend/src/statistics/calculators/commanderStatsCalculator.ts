import {
    PlayerMatchHistory,
    CommanderStatistics
}
from "../types/StatisticsTypes";



export function calculateCommanderStats(
    games: PlayerMatchHistory[]
): CommanderStatistics[] {

    const commanders =
        new Map<
            number,
            CommanderStatistics
        >();



    for (const game of games) {

        if (
            !commanders.has(
                game.commander_id
            )
        ) {

            commanders.set(
                game.commander_id,
                {

                    commander_id:
                        game.commander_id,

                    commander_name:
                        game.commander_name,

                    games_played: 0,

                    wins: 0,

                    losses: 0,

                    win_rate: 0

                }
            );

        }



        const commander =
            commanders.get(
                game.commander_id
            )!;



        commander.games_played++;



        if (
            game.finish_position === 1
        ) {

            commander.wins++;

        }

    }



    const statistics =
        Array.from(
            commanders.values()
        );



    for (const commander of statistics) {

        commander.losses =
            commander.games_played -
            commander.wins;



        commander.win_rate =
            Number(
                (
                    commander.wins /
                    commander.games_played *
                    100
                ).toFixed(2)
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



export function getMostPlayedCommander(
    commanders: CommanderStatistics[]
): CommanderStatistics | null {

    return commanders[0] ?? null;

}



export function getBestCommander(
    commanders: CommanderStatistics[],
    minimumGames:number = 5
): CommanderStatistics | null {

    const eligible =
        commanders.filter(

            commander =>

                commander.games_played >=
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