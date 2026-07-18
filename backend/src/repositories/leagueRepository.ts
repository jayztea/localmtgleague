import { RowDataPacket, ResultSetHeader } from "mysql2";

import { db } from "../db";

import { League } from "../models/League";

export async function createLeague(
    leagueName: string,
    leagueCode: string,
    description: string | undefined,
    createdByUserId: number
) {

    const [result] =
        await db.execute<ResultSetHeader>(
            `
            INSERT INTO leagues
            (
                league_name,
                league_code,
                description,
                created_by_user_id
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                leagueName,
                leagueCode,
                description ?? null,
                createdByUserId
            ]
        );

    return result.insertId;

}

export async function findById(
    leagueId: number
) {

    const [rows] =
        await db.execute<(League & RowDataPacket)[]>(
            `
            SELECT
                league_id,
                league_name,
                league_code,
                description,
                created_by_user_id,
                created_date,
                modified_date
            FROM leagues
            WHERE league_id = ?
            `,
            [
                leagueId
            ]
        );

    return rows[0] ?? null;

}

export async function findByLeagueCode(
    leagueCode: string
) {

    const [rows] =
        await db.execute<(League & RowDataPacket)[]>(
            `
            SELECT
                league_id,
                league_name,
                league_code,
                description,
                created_by_user_id,
                created_date,
                modified_date
            FROM leagues
            WHERE league_code = ?
            `,
            [
                leagueCode
            ]
        );

    return rows[0] ?? null;

}

export async function findByUserId(
    userId: number
) {

    const [rows] =
        await db.execute<(League & RowDataPacket)[]>(
            `
            SELECT DISTINCT

                l.league_id,
                l.league_name,
                l.league_code,
                l.description,
                l.created_by_user_id,
                l.created_date,
                l.modified_date

            FROM leagues l

            INNER JOIN league_players lp
                ON lp.league_id = l.league_id

            INNER JOIN players p
                ON p.player_id = lp.player_id

            WHERE p.user_id = ?
            AND lp.status = 'ACTIVE'

            ORDER BY l.league_name
            `,
            [
                userId
            ]
        );

    return rows;

}