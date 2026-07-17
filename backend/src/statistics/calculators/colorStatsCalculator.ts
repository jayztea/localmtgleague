export function calculateColorStats(
    games: any[]
) {

    const colors: any = {};

    for (const game of games) {

        const color =
            game.color_identity
            ??
            "Colorless";

        if (!colors[color]) {

            colors[color] = {

                color_identity: color,

                games_played: 0,

                wins: 0

            };

        }

        colors[color].games_played++;

        if (game.finish_position === 1) {

            colors[color].wins++;

        }

    }

    return Object.values(colors)

        .map((color: any) => ({

            ...color,

            losses:
                color.games_played
                -
                color.wins,

            win_rate:
                Number(
                    (
                        color.wins
                        /
                        color.games_played
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