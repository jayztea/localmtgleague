export type FeedbackType =
    | "BUG"
    | "FEATURE_REQUEST"
    | "CONFUSION"
    | "OTHER";



export interface CreateFeedbackRequest {

    feedback_type:
        FeedbackType;

    message:
        string;

}



export interface CreateFeedbackResponse {

    feedback_id:
        number;

    user_id:
        number;

    feedback_type:
        FeedbackType;

    message:
        string;

    status:
        "NEW";

    priority:
        "MEDIUM";

}