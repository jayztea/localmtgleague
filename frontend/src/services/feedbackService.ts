import api
from "../api/axios";



import type {
    CreateFeedbackRequest,
    CreateFeedbackResponse
}
from "../types/feedback";



export async function createFeedback(
    feedback: CreateFeedbackRequest
): Promise<CreateFeedbackResponse>{

    const response =
        await api.post<CreateFeedbackResponse>(
            "/feedback",
            feedback
        );


    return response.data;

}