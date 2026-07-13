import bcrypt from "bcrypt";

import * as userRepository from "../repositories/userRepository";
import * as playerRepository from "../repositories/playerRepository";

import { ConflictError } from "../errors/ConflictError";


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


export async function loginUser() {

    throw new Error(
        "Login not implemented yet"
    );

}