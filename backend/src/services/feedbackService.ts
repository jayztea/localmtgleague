import * as feedbackRepository
from "../repositories/feedbackRepository";



export async function createFeedback(
    userId: number,
    feedbackType: string,
    message: string
){

    const feedbackId =
        await feedbackRepository.createFeedback(
            userId,
            feedbackType,
            message
        );


    return {

        feedback_id:
            feedbackId,

        user_id:
            userId,

        feedback_type:
            feedbackType,

        message,

        status:
            "NEW",

        priority:
            "MEDIUM"

    };

}