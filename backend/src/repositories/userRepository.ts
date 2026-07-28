import {
    ResultSetHeader,
    RowDataPacket
}
from "mysql2";


import {
    db
}
from "../db";


import {
    User
}
from "../models/User";






export async function findByEmail(

    email:string

):Promise<User | null>{


    const [
        rows
    ] =
    await db.execute<(User & RowDataPacket)[]>(

        `
        SELECT
            user_id,
            email_address,
            password_hash,
            account_type_id,
            created_date

        FROM users

        WHERE email_address = ?
        `,

        [
            email
        ]

    );



    return rows.length

        ? rows[0]

        : null;


}









export async function createUser(

    email:string,

    passwordHash:string,

    accountTypeId:number

):Promise<number>{


    const [
        result
    ]
    =
    await db.execute<ResultSetHeader>(

        `
        INSERT INTO users
        (
            email_address,
            password_hash,
            account_type_id
        )

        VALUES (?, ?, ?)
        `,

        [

            email,

            passwordHash,

            accountTypeId

        ]

    );



    return result.insertId;


}









export async function findById(

    userId:number

):Promise<User | null>{


    const [
        rows
    ]
    =
    await db.execute<(User & RowDataPacket)[]>(

        `
        SELECT

            user_id,

            email_address,

            account_type_id,

            created_date


        FROM users

        WHERE user_id = ?

        `,

        [
            userId
        ]

    );



    return rows.length

        ? rows[0]

        : null;


}









export async function updatePassword(

    userId:number,

    passwordHash:string

):Promise<void>{


    await db.execute(

        `
        UPDATE users

        SET password_hash = ?

        WHERE user_id = ?

        `,

        [

            passwordHash,

            userId

        ]

    );


}