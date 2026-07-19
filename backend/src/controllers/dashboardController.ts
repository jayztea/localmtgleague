import {
    Request,
    Response,
    NextFunction
}
from "express";

import * as dashboardService
    from "../services/dashboardService";



export async function getDashboard(
    req:Request,
    res:Response,
    next:NextFunction
) {

    try {

        const userId =
            (req as any).user.user_id;

        const dashboard =
            await dashboardService.getDashboard(
                userId
            );

        res.json(
            dashboard
        );

    }
    catch(error) {

        next(error);

    }

}



export async function getLeagueDashboard(
    req:Request,
    res:Response,
    next:NextFunction
) {

    try {

        const userId =
            (req as any).user.user_id;

        const leagueId =
            Number(
                req.params.leagueId
            );

        const dashboard =
            await dashboardService.getLeagueDashboard(
                userId,
                leagueId
            );

        res.json(
            dashboard
        );

    }
    catch(error) {

        next(error);

    }

}