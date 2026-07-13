import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt";

import * as userRepository from "../repositories/userRepository";
import * as playerRepository from "../repositories/playerRepository";

import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";



export async function registerUser(
    email: string,
    password: string,
    displayName: string
) {

    const existingUser =
        await userRepository.findByEmail(email);


    if (existingUser) {

        throw new ConflictError(
            "An account with this email already exists."
        );

    }


    const passwordHash =
        await bcrypt.hash(password, 10);


    // Temporary default account type
    // We can make this configurable later
    const accountTypeId = 2;


    const userId =
        await userRepository.createUser(
            email,
            passwordHash,
            accountTypeId
        );


    await playerRepository.createPlayer(
        userId,
        displayName
    );


    return {
        userId,
        email,
        displayName
    };

}




export async function loginUser(
    email: string,
    password: string
) {

    const user =
        await userRepository.findByEmail(email);


    if (!user) {

        throw new UnauthorizedError(
            "Invalid email or password."
        );

    }


    const passwordMatches =
        await bcrypt.compare(
            password,
            user.password_hash
        );


    if (!passwordMatches) {

        throw new UnauthorizedError(
            "Invalid email or password."
        );

    }


    const token = jwt.sign(
        {
            user_id: user.user_id,
            email_address: user.email_address
        },
        jwtConfig.secret,
        jwtConfig.options
    );


    return {
        token
    };

}