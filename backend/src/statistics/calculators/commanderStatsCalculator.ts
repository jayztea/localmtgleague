export function calculateCommanderStats(
    games: any[]
) {

    const commanders: any = {};

    for (const game of games) {

        if (!commanders[game.commander_id]) {

            commanders[game.commander_id] = {

                commander_id: game.commander_id,

                commander_name: game.commander_name,

                games_played: 0,

                wins: 0
            };

        }

        commanders[game.commander_id].games_played++;

        if (game.finish_position === 1) {

            commanders[game.commander_id].wins++;

        }

    }

    return Object.values(commanders)

        .map((commander: any) => ({

            ...commander,

            losses:
                commander.games_played
                -
                commander.wins,

            win_rate:
                Number(
                    (
                        commander.wins
                        /
                        commander.games_played
                        *
                        100
                    )
                    .toFixed(2)
                )

        }))

        .sort(

            (a: any, b: any) =>

                b.games_played
                -
                a.games_played

        );

}