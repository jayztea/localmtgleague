import { Router }
from "express";



import * as feedbackController
from "../controllers/feedbackController";



import { authenticateToken }
from "../middleware/authMiddleware";



import { validateRequest }
from "../middleware/validateRequest";



import {
    createFeedbackSchema
}
from "../dtos/feedbackDTO";



const router =
    Router();



router.use(
    authenticateToken
);



router.post(
    "/",
    validateRequest(
        createFeedbackSchema
    ),
    feedbackController.createFeedback
);



export default router;