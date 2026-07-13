import {
    Request,
    Response,
    NextFunction
} from "express";


import * as authService from "../services/authService";



export async function register(
    req: Request,
    res: Response,
    next: NextFunction
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


    } catch (error) {

        next(error);

    }

}




export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        return res.status(501).json({
            message: "Login not implemented yet."
        });


    } catch(error) {

        next(error);

    }

}