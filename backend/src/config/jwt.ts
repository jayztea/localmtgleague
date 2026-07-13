import { SignOptions } from "jsonwebtoken";


export const jwtConfig = {
    secret: process.env.JWT_SECRET || "development-secret",

    options: {
        expiresIn: "7d"
    } as SignOptions
};