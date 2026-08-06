import { db } from "../db";

import {
    PlayerMatchHistory
}
from "./types/StatisticsTypes";



export async function findPlayerMatchHistory(
    playerId:number
): Promise<PlayerMatchHistory[]> {


    const [rows]: any =
        await db.execute(

            `
            SELECT

                mp.match_player_id,

                mp.match_id,

                mp.finish_position,

                m.match_date,


                d.deck_id,

                d.deck_name,

                d.color_identity,


                c.commander_id,

                c.commander_name


            FROM match_players mp


            JOIN matches m

                ON mp.match_id = m.match_id


            JOIN decks d

                ON mp.deck_id = d.deck_id


            JOIN commanders c

                ON d.commander_id = c.commander_id


            WHERE mp.player_id = ?
            AND m.deleted_date IS NULL


            ORDER BY 
                m.match_date DESC

            `,

            [
                playerId
            ]

        );



    return rows as PlayerMatchHistory[];

}