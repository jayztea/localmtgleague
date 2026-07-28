import crypto from "crypto";

import bcrypt from "bcrypt";


import * as userRepository
from "../repositories/userRepository";


import * as passwordResetRepository
from "../repositories/passwordResetRepository";


import {
    NotFoundError
}
from "../errors/NotFoundError";







export async function requestPasswordReset(

    email:string

){


    const user =

        await userRepository.findByEmail(
            email
        );



    /*
        Security:
        Do not reveal whether
        email exists.
    */


    if(!user){

        return;

    }






    const rawToken =

        crypto
            .randomBytes(32)
            .toString("hex");




    const tokenHash =

        crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");






    const expiresDate =

        new Date(

            Date.now()

            +

            30 * 60 * 1000

        );





    await passwordResetRepository.createResetToken(

        user.user_id,

        tokenHash,

        expiresDate

    );





    return {

        resetToken:rawToken

    };


}









export async function resetPassword(

    token:string,

    password:string

){


    const tokenHash =

        crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");





    const resetRecord =

        await passwordResetRepository.findValidToken(

            tokenHash

        );





    if(!resetRecord){


        throw new NotFoundError(

            "Invalid or expired reset token."

        );


    }







    const passwordHash =

        await bcrypt.hash(

            password,

            10

        );






    await userRepository.updatePassword(

        resetRecord.user_id,

        passwordHash

    );







    await passwordResetRepository.markTokenUsed(

        resetRecord.token_id

    );



}