import { db } from "../db";



export async function createFeedback(
    userId: number,
    feedbackType: string,
    message: string
){

    const [result]: any =
        await db.execute(
            `
            INSERT INTO feedback
            (
                user_id,
                feedback_type,
                message
            )
            VALUES (?, ?, ?)
            `,
            [
                userId,
                feedbackType,
                message
            ]
        );


    return result.insertId;

}