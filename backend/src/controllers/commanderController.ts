import {
    Request,
    Response,
    NextFunction
}
from "express";

import * as commanderService
from "../services/commanderService";

export async function searchCommanders(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const query =
            String(
                req.query.query ?? ""
            );

        const commanders =
            await commanderService.searchCommanders(
                query
            );

        res.json(
            commanders
        );

    }
    catch (
        error
    ) {

        next(error);

    }

}

export async function getCommanderPairingRules(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const commanderId =
            Number(
                req.params.commanderId
            );

        if (
            !Number.isInteger(
                commanderId
            )
            ||
            commanderId <= 0
        ) {

            res.status(400).json({

                message:
                    "Invalid commander ID."

            });

            return;

        }

        const rules =
            await commanderService.getCommanderPairingRules(
                commanderId
            );

        res.json(
            rules
        );

    }
    catch (
        error
    ) {

        next(error);

    }

}

export async function getPairingOptions(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const commanderId =
            Number(
                req.query.commanderId
            );

        const relationshipType =
            String(
                req.query.relationshipType ?? ""
            );

        const validRelationshipTypes = [

            "partner",

            "partner_with",

            "background",

            "friends_forever",

            "doctors_companion",

            "partner_character_select"

        ];

        if (
            !Number.isInteger(
                commanderId
            )
            ||
            commanderId <= 0
        ) {

            res.status(400).json({

                message:
                    "Invalid commander ID."

            });

            return;

        }

        if (
            !validRelationshipTypes.includes(
                relationshipType
            )
        ) {

            res.status(400).json({

                message:
                    "Invalid commander relationship type."

            });

            return;

        }

        const options =
            await commanderService.getPairingOptions(
                commanderId,
                relationshipType as
                    | "partner"
                    | "partner_with"
                    | "background"
                    | "friends_forever"
                    | "doctors_companion"
                    | "partner_character_select"
            );

        res.json(
            options
        );

    }
    catch (
        error
    ) {

        next(error);

    }

}