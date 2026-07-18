import { db } from "../db";



export async function findPlayerDashboardSummary(
    playerId:number
) {


    const [rows]:any =
        await db.execute(
            `
            SELECT

                COUNT(*) AS games_played,

                SUM(
                    CASE
                        WHEN mp.finish_position = 1
                        THEN 1
                        ELSE 0
                    END
                ) AS wins,


                SUM(
                    CASE
                        WHEN mp.finish_position <> 1
                        THEN 1
                        ELSE 0
                    END
                ) AS losses,


                AVG(mp.finish_position)
                    AS average_finish


            FROM match_players mp


            WHERE mp.player_id = ?

            `,
            [
                playerId
            ]
        );



    const stats =
        rows[0];



    const games =
        Number(stats.games_played);



    const wins =
        Number(stats.wins);



    return {

        games_played:
            games,


        wins,


        losses:
            Number(stats.losses),


        win_rate:
            games === 0
                ?
                0
                :
                Number(
                    (
                        wins /
                        games *
                        100
                    )
                    .toFixed(2)
                ),


        average_finish:
            stats.average_finish
                ?
                Number(
                    Number(
                        stats.average_finish
                    )
                    .toFixed(2)
                )
                :
                0

    };

}






export async function findRecentGames(
    playerId:number
) {


    const [rows]:any =
        await db.execute(
            `
            SELECT

                m.match_id,

                l.league_name,

                m.match_date,


                c.commander_name,


                mp.finish_position


            FROM match_players mp


            JOIN matches m
                ON mp.match_id = m.match_id


            JOIN leagues l
                ON m.league_id = l.league_id


            JOIN decks d
                ON mp.deck_id = d.deck_id


            JOIN commanders c
                ON d.commander_id = c.commander_id


            WHERE mp.player_id = ?


            ORDER BY m.match_date DESC


            LIMIT 5

            `,
            [
                playerId
            ]
        );



    return rows;

}






export async function findPlayerLeagues(
    playerId:number
) {


    const [rows]:any =
        await db.execute(
            `
            SELECT

                l.league_id,

                l.league_name


            FROM leagues l


            JOIN league_players lp
                ON l.league_id = lp.league_id


            WHERE lp.player_id = ?


            ORDER BY l.league_name

            `,
            [
                playerId
            ]
        );



    return rows;

}







export async function findLeagueLeaderboard(
    leagueId:number
) {


    const [rows]:any =
        await db.execute(
            `
            SELECT


                p.player_id,

                p.display_name,


                COUNT(mp.match_player_id)
                    AS games_played,


                SUM(
                    CASE
                        WHEN mp.finish_position = 1
                        THEN 1
                        ELSE 0
                    END
                ) AS wins


            FROM players p


            JOIN match_players mp
                ON p.player_id = mp.player_id


            JOIN matches m
                ON mp.match_id = m.match_id


            WHERE m.league_id = ?


            GROUP BY
                p.player_id,
                p.display_name


            ORDER BY
                wins DESC

            `,
            [
                leagueId
            ]
        );



    return rows.map(
        (player:any,index:number)=>{


            const games =
                Number(
                    player.games_played
                );


            const wins =
                Number(
                    player.wins
                );


            return {

                rank:
                    index + 1,


                player_id:
                    player.player_id,


                display_name:
                    player.display_name,


                games_played:
                    games,


                wins,


                win_rate:
                    games === 0
                        ?
                        0
                        :
                        Number(
                            (
                                wins /
                                games *
                                100
                            )
                            .toFixed(2)
                        )

            };

        }
    );

}