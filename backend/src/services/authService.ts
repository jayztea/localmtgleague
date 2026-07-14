import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt";
import { AuthUser } from "../types/AuthUser";

import * as userRepository from "../repositories/userRepository";
import * as playerRepository from "../repositories/playerRepository";

import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";

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

    // TODO:
    // Replace with lookup from account_types table
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
        user_id: userId,
        email_address: email,
        display_name: displayName
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

    const payload: AuthUser = {
        user_id: user.user_id,
        email_address: user.email_address
    };

    const token = jwt.sign(
        payload,
        jwtConfig.secret,
        jwtConfig.options
    );

    return {
        token
    };

}

export async function getCurrentUser(
    userId: number
) {

    const user =
        await userRepository.findById(userId);

    if (!user) {
        throw new NotFoundError(
            "User not found."
        );
    }

    return {
        user_id: user.user_id,
        email_address: user.email_address,
        account_type_id: user.account_type_id,
        created_date: user.created_date
    };

}