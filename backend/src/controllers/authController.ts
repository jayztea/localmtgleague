import {
    Request,
    Response,
    NextFunction
}
from "express";


import * as authService
from "../services/authService";


import * as passwordResetService
from "../services/passwordResetService";







export async function register(

    req:Request,

    res:Response,

    next:NextFunction

){


    try{


        const {

            email_address,

            password,

            display_name

        }
        =
        req.body;




        const result =

            await authService.registerUser(

                email_address,

                password,

                display_name

            );



        return res

            .status(201)

            .json(result);



    }
    catch(error){


        next(error);


    }


}









export async function login(

    req:Request,

    res:Response,

    next:NextFunction

){


    try{


        const {

            email_address,

            password

        }
        =
        req.body;




        const result =

            await authService.loginUser(

                email_address,

                password

            );



        return res.json(result);



    }
    catch(error){


        next(error);


    }


}









export async function me(

    req:Request,

    res:Response,

    next:NextFunction

){


    try{


        const user =

            await authService.getCurrentUser(

                (req as any)
                    .user
                    .user_id

            );



        return res.json(user);



    }
    catch(error){


        next(error);


    }


}









export async function forgotPassword(

    req:Request,

    res:Response,

    next:NextFunction

){


    try{


        const {

            email_address

        }
        =
        req.body;




        const result =

            await passwordResetService
                .requestPasswordReset(

                    email_address

                );



        return res.json({

            message:
                "If an account exists, password reset instructions have been generated.",

            resetToken:
                result?.resetToken

        });



    }
    catch(error){


        next(error);


    }


}









export async function resetPassword(

    req:Request,

    res:Response,

    next:NextFunction

){


    try{


        const {

            token,

            password

        }
        =
        req.body;




        await passwordResetService.resetPassword(

            token,

            password

        );



        return res.json({

            message:
                "Password updated successfully."

        });



    }
    catch(error){


        next(error);


    }


}