import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AuthUser } from "../types/AuthUser";


export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        throw new UnauthorizedError(
            "Authentication token required."
        );
    }


    const token = authHeader.split(" ")[1];


    if (!token) {
        throw new UnauthorizedError(
            "Invalid authentication token."
        );
    }


    try {

        const decoded =
            jwt.verify(
                token,
                jwtConfig.secret
            ) as AuthUser;


        (req as Request & { user?: AuthUser }).user = decoded;


        next();

    } catch (error) {

        throw new UnauthorizedError(
            "Invalid or expired token."
        );

    }

}