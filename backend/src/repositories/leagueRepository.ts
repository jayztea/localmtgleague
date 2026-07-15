import { RowDataPacket, ResultSetHeader } from "mysql2";
import { db } from "../db";
import { League } from "../models/League";


export async function createLeague(
    leagueName: string,
    description: string | undefined,
    createdByUserId: number
) {

    const [result] =
        await db.execute<ResultSetHeader>(
            `
            INSERT INTO leagues
            (
                league_name,
                description,
                created_by_user_id
            )
            VALUES (?, ?, ?)
            `,
            [
                leagueName,
                description ?? null,
                createdByUserId
            ]
        );


    return result.insertId;

}



export async function findById(
    leagueId: number
) {

    const [rows]: any =
        await db.execute(
            `
            SELECT *
            FROM leagues
            WHERE league_id = ?
            `,
            [leagueId]
        );

    return rows[0] ?? null;

}


export async function findByUserId(
    userId: number
): Promise<League[]> {

    const [rows] =
        await db.execute<(League & RowDataPacket)[]>(
            `
            SELECT
                league_id,
                league_name,
                created_by_user_id,
                created_date,
                modified_date,
                description
            FROM leagues
            WHERE created_by_user_id = ?
            `,
            [
                userId
            ]
        );


    return rows;

}