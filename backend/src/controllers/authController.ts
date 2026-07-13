import { Request, Response } from "express";

import * as authService from "../services/authService";


export const register = async (
    req: Request,
    res: Response
) => {

    await authService.registerUser();

    res.json({
        message:"Register endpoint"
    });

};



export const login = async (
    req: Request,
    res: Response
) => {

    await authService.loginUser();

    res.json({
        message:"Login endpoint"
    });

};