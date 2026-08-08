import { db } from "../db";



export async function findMatchDetails(
    matchId:number
){

    const [rows]:any =

        await db.execute(

            `
            SELECT

                m.match_id,

                m.league_id,

                l.league_name,

                m.match_date,

                m.game_length_minutes,

                m.notes,


                mp.player_id,

                p.display_name,


                mp.finish_position,

                mp.ending_life,


                d.deck_id,

                d.deck_name,


                c.commander_id,

                c.commander_name,

                c.color_identity,

                c.image_url


            FROM matches m


            JOIN leagues l

                ON m.league_id = l.league_id


            JOIN match_players mp

                ON m.match_id = mp.match_id


            JOIN players p

                ON mp.player_id = p.player_id


            JOIN decks d

                ON mp.deck_id = d.deck_id


            JOIN commanders c

                ON d.commander_id = c.commander_id


            WHERE m.match_id = ?

            AND m.deleted_date IS NULL


            ORDER BY

                mp.finish_position ASC

            `,

            [
                matchId
            ]

        );


    return rows;

}