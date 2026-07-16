export function calculatePlayerStats(
    games:any[]
) {


    const gamesPlayed =
        games.length;



    const wins =
        games.filter(
            (game:any) =>
                game.finish_position === 1
        )
        .length;



    const losses =
        gamesPlayed - wins;



    const winRate =
        gamesPlayed === 0
            ? 0
            :
            Number(
                (
                    (wins / gamesPlayed)
                    *
                    100
                )
                .toFixed(2)
            );



    const averageFinish =
        gamesPlayed === 0
            ? 0
            :
            Number(
                (
                    games.reduce(
                        (
                            sum:number,
                            game:any
                        ) =>
                            sum +
                            game.finish_position,
                        0
                    )
                    /
                    gamesPlayed
                )
                .toFixed(2)
            );



    return {

        games_played:
            gamesPlayed,

        wins,

        losses,

        win_rate:
            winRate,

        average_finish:
            averageFinish

    };

}