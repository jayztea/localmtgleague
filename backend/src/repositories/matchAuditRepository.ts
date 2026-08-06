import { db } from "../db";



export type MatchAuditAction =

    | "MATCH_CREATED"

    | "MATCH_UPDATED"

    | "MATCH_DELETED";






export async function createAuditEntry(

    matchId:number,

    action:MatchAuditAction,

    changedByPlayerId:number,

    oldValues:any = null,

    newValues:any = null

){


    const [result]:any =

        await db.execute(

            `
            INSERT INTO match_audit_log
            (
                match_id,
                action,
                changed_by_player_id,
                old_values,
                new_values
            )

            VALUES (?, ?, ?, ?, ?)

            `,

            [

                matchId,

                action,

                changedByPlayerId,

                oldValues
                    ? JSON.stringify(oldValues)
                    : null,


                newValues
                    ? JSON.stringify(newValues)
                    : null

            ]

        );



    return result.insertId;

}









export async function findAuditHistoryByMatch(

    matchId:number

){


    const [rows]:any =

        await db.execute(

            `
            SELECT

                mal.audit_id,

                mal.match_id,

                mal.action,

                mal.changed_by_player_id,

                p.display_name AS changed_by,

                mal.old_values,

                mal.new_values,

                mal.created_date


            FROM match_audit_log mal


            JOIN players p

                ON mal.changed_by_player_id = p.player_id


            WHERE mal.match_id = ?


            ORDER BY

                mal.created_date DESC

            `,

            [

                matchId

            ]

        );





    return rows.map(

        (row:any)=>({


            ...row,


            old_values:

                parseJsonValue(
                    row.old_values
                ),



            new_values:

                parseJsonValue(
                    row.new_values
                )


        })

    );

}








function parseJsonValue(

    value:any

){


    if(!value)

        return null;



    if(typeof value === "object")

        return value;



    try{

        return JSON.parse(value);

    }

    catch{

        return value;

    }

}