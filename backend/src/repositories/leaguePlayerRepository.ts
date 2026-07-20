import { db } from "../db";


export async function createMembership(
    leagueId:number,
    playerId:number,
    leagueRole:string = "MEMBER"
){

    const [result]:any =
        await db.execute(
            `
            INSERT INTO league_players
            (
                league_id,
                player_id,
                league_role
            )
            VALUES (?, ?, ?)
            `,
            [
                leagueId,
                playerId,
                leagueRole
            ]
        );


    return result.insertId;

}





export async function findMembership(
    leagueId:number,
    playerId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                league_player_id,
                league_id,
                player_id,
                league_role,
                status,
                joined_date,
                left_date

            FROM league_players

            WHERE league_id = ?
            AND player_id = ?

            `,
            [
                leagueId,
                playerId
            ]
        );


    return rows.length
        ? rows[0]
        : null;

}





export async function findPlayersByLeague(
    leagueId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                lp.league_player_id,

                lp.player_id,

                lp.league_role,

                lp.status,

                p.display_name


            FROM league_players lp


            JOIN players p
                ON lp.player_id = p.player_id


            WHERE lp.league_id = ?


            AND lp.status = 'ACTIVE'


            ORDER BY p.display_name

            `,
            [
                leagueId
            ]
        );


    return rows;

}





/*
    NEW FUNCTION

    Gets all league players
    plus commanders they have used.
*/


export async function findPlayersWithCommanders(
    leagueId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                p.player_id,

                p.display_name,


                d.deck_id,

                c.commander_id,

                c.commander_name,

                c.color_identity


            FROM league_players lp


            JOIN players p
                ON lp.player_id = p.player_id


            LEFT JOIN decks d
                ON p.player_id = d.player_id
                AND d.is_active = 1


            LEFT JOIN commanders c
                ON d.commander_id = c.commander_id


            WHERE lp.league_id = ?

            AND lp.status = 'ACTIVE'


            ORDER BY
                p.display_name,
                c.commander_name

            `,
            [
                leagueId
            ]
        );



    const players:any = {};



    for(const row of rows){


        if(!players[row.player_id]){

            players[row.player_id] = {

                player_id:
                    row.player_id,

                display_name:
                    row.display_name,

                commanders:[]

            };

        }



        if(row.commander_id){

            players[row.player_id]
                .commanders
                .push({

                    deck_id:
                        row.deck_id,

                    commander_id:
                        row.commander_id,

                    commander_name:
                        row.commander_name,

                    color_identity:
                        row.color_identity

                });

        }

    }



    return Object.values(players);

}






export async function removePlayer(
    leagueId:number,
    playerId:number
){

    await db.execute(
        `
        UPDATE league_players

        SET

            status = 'INACTIVE',

            left_date = CURRENT_TIMESTAMP


        WHERE league_id = ?

        AND player_id = ?

        `,
        [
            leagueId,
            playerId
        ]
    );

}
export async function reactivateMembership(
    leagueId:number,
    playerId:number
){

    await db.execute(
        `
        UPDATE league_players

        SET

            status = 'ACTIVE',

            left_date = NULL


        WHERE league_id = ?

        AND player_id = ?

        `,
        [
            leagueId,
            playerId
        ]
    );

}
export async function findActiveMembership(
    leagueId:number,
    playerId:number
){

    const [rows]:any =
        await db.execute(
            `
            SELECT

                league_player_id,

                league_id,

                player_id,

                league_role,

                status,

                joined_date,

                left_date


            FROM league_players


            WHERE league_id = ?

            AND player_id = ?

            AND status = 'ACTIVE'

            `,
            [
                leagueId,
                playerId
            ]
        );


    return rows.length
        ? rows[0]
        : null;

}