import { z } from "zod";

export const createMatchPlayerSchema = z.object({

    player_id:
        z.number()
        .int()
        .positive(),

    commander_id:
        z.number()
        .int()
        .positive(),

    secondary_commander_id:
        z.number()
        .int()
        .positive()
        .optional(),

    finish_position:
        z.number()
        .int()
        .positive()
        .optional(),

    starting_life:
        z.number()
        .int()
        .optional(),

    ending_life:
        z.number()
        .int()
        .optional()

});

export const createMatchSchema = z.object({

    league_id:
        z.number()
        .int()
        .positive(),

    game_length_minutes:
        z.number()
        .int()
        .positive()
        .optional(),

    notes:
        z.string()
        .max(500)
        .optional(),

    players:
        z.array(
            createMatchPlayerSchema
        )
        .min(
            2,
            "A match requires at least 2 players."
        )

});

export type CreateMatchDTO =
    z.infer<typeof createMatchSchema> & {

        players: Array<{

            player_id:
                number;

            commander_id:
                number;

            secondary_commander_id?:
                number;

            deck_id?:
                number;

            finish_position?:
                number;

            starting_life?:
                number;

            ending_life?:
                number;

        }>;

    };