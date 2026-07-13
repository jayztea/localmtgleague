import { db } from "../db";


export async function findByEmail(
    email: string
) {

    const [rows]: any = await db.execute(
        `
        SELECT
            user_id,
            email_address,
            password_hash,
            account_type_id
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
    email: string,
    passwordHash: string,
    accountTypeId: number
) {

    const [result]: any = await db.execute(
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