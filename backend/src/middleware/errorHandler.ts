import {
    ErrorRequestHandler
} from "express";

import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {

    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            message: err.message
        });

    }

    console.error(err);

    return res.status(500).json({
        message: "An unexpected error occurred."
    });

};