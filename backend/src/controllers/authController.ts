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

        const {
            email_address,
            password
        } = req.body;


        const result =
            await authService.loginUser(
                email_address,
                password
            );


        return res.json(result);


    } catch(error) {

        next(error);

    }

}

export async function me(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const user = await authService.getCurrentUser(
            (req as any).user!.user_id
        );

        res.json(user);

    } catch (error) {

        next(error);

    }

}