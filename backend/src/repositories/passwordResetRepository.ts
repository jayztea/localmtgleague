import {
    ResultSetHeader,
    RowDataPacket
}
from "mysql2";


import {
    db
}
from "../db";







export async function createResetToken(

    userId:number,

    tokenHash:string,

    expiresDate:Date

):Promise<number>{


    const [

        result

    ] =
    await db.execute<ResultSetHeader>(

        `
        INSERT INTO password_reset_tokens
        (
            user_id,
            token_hash,
            expires_date
        )

        VALUES (?, ?, ?)
        `,

        [

            userId,

            tokenHash,

            expiresDate

        ]

    );



    return result.insertId;


}









export async function findValidToken(

    tokenHash:string

){


    const [

        rows

    ] =
    await db.execute<

        (

            RowDataPacket & {

                token_id:number;

                user_id:number;

            }

        )[]

    >(


        `
        SELECT

            token_id,

            user_id

        FROM password_reset_tokens

        WHERE token_hash = ?

        AND expires_date > NOW()

        AND used_date IS NULL

        `,


        [

            tokenHash

        ]

    );



    return rows.length

        ? rows[0]

        : null;


}









export async function markTokenUsed(

    tokenId:number

):Promise<void>{


    await db.execute(

        `
        UPDATE password_reset_tokens

        SET used_date = NOW()

        WHERE token_id = ?

        `,

        [

            tokenId

        ]

    );


}