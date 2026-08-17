import { z }
from "zod";



export const createFeedbackSchema =
    z.object({

        feedback_type:
            z.string()
                .min(
                    1,
                    "Feedback type is required."
                )
                .max(
                    50,
                    "Feedback type is too long."
                ),

        message:
            z.string()
                .min(
                    1,
                    "Feedback message is required."
                )
                .max(
                    5000,
                    "Feedback message is too long."
                )

    });