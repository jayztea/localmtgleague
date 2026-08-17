import {
    Request,
    Response,
    NextFunction
}
from "express";

import * as feedbackService
from "../services/feedbackService";



export async function createFeedback(
    req: Request,
    res: Response,
    next: NextFunction
){

    try{

        const userId =
            (req as any).user.user_id;


        const {
            feedback_type,
            message
        } = req.body;


        const result =
            await feedbackService.createFeedback(
                userId,
                feedback_type,
                message
            );


        res
            .status(201)
            .json(result);

    }
    catch(error){

        next(error);

    }

}