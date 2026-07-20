import {
    Request,
    Response,
    NextFunction
} from "express";

import * as commanderService
    from "../services/commanderService";

export async function searchCommanders(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const query =
            String(req.query.query ?? "");

        const commanders =
            await commanderService.searchCommanders(
                query
            );

        res.json(commanders);

    }
    catch (error) {

        next(error);

    }

}