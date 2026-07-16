import { z } from "zod";


export const createMatchPlayerSchema = z.object({

    player_id: z.number()
        .int()
        .positive(),

    deck_id: z.number()
        .int()
        .positive(),

    finish_position: z.number()
        .int()
        .positive()
        .optional(),

    starting_life: z.number()
        .int()
        .optional(),

    ending_life: z.number()
        .int()
        .optional()

});


export const createMatchSchema = z.object({

    league_id: z.number()
        .int()
        .positive(),

    game_length_minutes: z.number()
        .int()
        .positive()
        .optional(),

    notes: z.string()
        .max(500)
        .optional(),

    players: z.array(
        createMatchPlayerSchema
    )
    .min(2, "A match requires at least 2 players.")

});


export type CreateMatchDTO =
    z.infer<typeof createMatchSchema>;