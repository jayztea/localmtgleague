import { z } from "zod";

export const createDeckSchema = z.object({
    deck_name: z
        .string()
        .trim()
        .min(1, "Deck name is required.")
        .max(100),

    commander_id: z
        .number()
        .int()
        .positive(),

    color_identity: z
        .string()
        .max(10)
        .optional(),

    power_level: z
        .number()
        .min(1)
        .max(10)
        .optional()
});