import bcrypt from "bcrypt";

import * as userRepository from "../repositories/userRepository";
import * as playerRepository from "../repositories/playerRepository";

export async function registerUser(
    email: string,
    password: string,
    displayName: string
) {

    // Validate
    if (!email || !password || !displayName) {
        throw new Error("Missing required fields.");
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = await userRepository.createUser(
        email,
        passwordHash,
        2
    );

    // Create player profile
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