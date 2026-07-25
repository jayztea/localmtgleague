import { db } from "../../db";

export async function findLeagueMatchHistory(
    leagueId:number
){

    const [rows]:any =
        await db.execute(

            `
            SELECT

                mp.player_id,

                p.display_name,

                mp.finish_position,

                mp.match_id,

                m.match_date,

                c.commander_id,

                c.commander_name,

                c.color_identity

            FROM matches m

            JOIN match_players mp
                ON m.match_id = mp.match_id

            JOIN players p
                ON mp.player_id = p.player_id

            JOIN decks d
                ON mp.deck_id = d.deck_id

            JOIN commanders c
                ON d.commander_id = c.commander_id

            WHERE m.league_id = ?

            ORDER BY
                m.match_date DESC

            `,
            [
                leagueId
            ]
        );

    return rows;

}

export async function findLeaguePlayerCount(
    leagueId:number
){

    const [rows]:any =
        await db.execute(

            `
            SELECT

                COUNT(*) AS total

            FROM league_players

            WHERE league_id = ?

            AND status = 'ACTIVE'

            `,
            [
                leagueId
            ]
        );

    return rows[0].total;

}

export async function findLeagueMatchCount(
    leagueId:number
){

    const [rows]:any =
        await db.execute(

            `
            SELECT

                COUNT(*) AS total

            FROM matches

            WHERE league_id = ?

            `,
            [
                leagueId
            ]
        );

    return rows[0].total;

}

export async function findRecentMatches(
    leagueId:number,
    limit:number = 5
){

    const safeLimit =
        Number(limit);

    const [rows]:any =
        await db.execute(

            `
            SELECT

                m.match_id,

                m.match_date,

                winner.display_name AS winner_name,

                GROUP_CONCAT(
                    p.display_name
                    ORDER BY mp.finish_position
                    SEPARATOR ', '
                ) AS players

            FROM matches m

            JOIN match_players winnerMp
                ON winnerMp.match_id = m.match_id
                AND winnerMp.finish_position = 1

            JOIN players winner
                ON winner.player_id = winnerMp.player_id

            JOIN match_players mp
                ON mp.match_id = m.match_id

            JOIN players p
                ON p.player_id = mp.player_id

            WHERE m.league_id = ?

            GROUP BY

                m.match_id,
                m.match_date,
                winner.display_name

            ORDER BY

                m.match_date DESC

            LIMIT ${safeLimit}

            `,
            [
                leagueId
            ]
        );

    return rows;

}