import { Request, Response } from "express";

import * as authService from "../services/authService";

export async function register(
    req: Request,
    res: Response
) {

    try {

        const {
            email_address,
            password,
            display_name
        } = req.body;

        const user = await authService.registerUser(
            email_address,
            password,
            display_name
        );

        return res.status(201).json({
            message: "User registered successfully.",
            user
        });

    }
    catch (error: any) {

        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Registration failed."
        });

    }

}