import { db } from "../db";


export async function canViewPlayerStatistics(
    requestingPlayerId:number,
    targetPlayerId:number
):Promise<boolean> {


    if (
        requestingPlayerId === targetPlayerId
    ) {

        return true;

    }



    const [rows]:any =
        await db.execute(

            `
            SELECT 1

            FROM league_players lp1

            JOIN league_players lp2
                ON lp1.league_id = lp2.league_id

            WHERE lp1.player_id = ?

            AND lp2.player_id = ?

            AND lp1.status = 'ACTIVE'

            AND lp2.status = 'ACTIVE'

            LIMIT 1
            `,

            [
                requestingPlayerId,
                targetPlayerId
            ]

        );



    return rows.length > 0;

}