import { db } from "../db";

export async function createMembership(
    leagueId: number,
    playerId: number
) {

    const [result]: any =
        await db.execute(
            `
            INSERT INTO league_players
            (
                league_id,
                player_id
            )
            VALUES (?, ?)
            `,
            [
                leagueId,
                playerId
            ]
        );

    return result.insertId;

}

export async function reactivateMembership(
    leagueId: number,
    playerId: number
) {

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

export async function findMembership(
    leagueId: number,
    playerId: number
) {

    const [rows]: any =
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

export async function findActiveMembership(
    leagueId: number,
    playerId: number
) {

    const [rows]: any =
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

export async function findPlayersByLeague(
    leagueId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT
                lp.league_player_id,
                lp.league_id,
                lp.player_id,
                lp.league_role,
                lp.status,
                lp.joined_date,
                lp.left_date,
                p.display_name

            FROM league_players lp

            JOIN players p
                ON lp.player_id = p.player_id

            WHERE lp.league_id = ?

            ORDER BY p.display_name
            `,
            [
                leagueId
            ]
        );

    return rows;

}

export async function removePlayer(
    leagueId: number,
    playerId: number
) {

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