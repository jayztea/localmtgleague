import { db }
from "../../db";

export async function findRecentMatches(

    leagueId:number,

    limit:number = 5

){

    const [matches]:any =

        await db.execute(

            `
            SELECT

                m.match_id,

                m.match_date

            FROM matches m

            WHERE m.league_id = ?

            ORDER BY m.match_date DESC

            LIMIT ?
            `,

            [

                leagueId,

                limit

            ]

        );



    const results = [];



    for(const match of matches){

        const [players]:any =

            await db.execute(

                `
                SELECT

                    p.display_name,

                    mp.finish_position

                FROM match_players mp

                JOIN players p
                    ON mp.player_id = p.player_id

                WHERE mp.match_id = ?

                ORDER BY mp.finish_position
                `,

                [

                    match.match_id

                ]

            );



        results.push({

            match_id:
                match.match_id,

            match_date:
                match.match_date,

            winner:
                players[0]?.display_name ?? "",

            players:
                players.map(

                    (player:any)=>

                        player.display_name

                )

        });

    }



    return results;

}