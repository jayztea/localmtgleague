import { z } from "zod";

export const createLeagueSchema = z.object({

    league_name: z
        .string()
        .min(3, "League name must be at least 3 characters.")
        .max(100, "League name cannot exceed 100 characters."),

    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters.")
        .optional()

});

export const joinLeagueSchema = z.object({

    league_code: z
        .string()
        .trim()
        .min(6)
        .max(6)

});

export type CreateLeagueDTO =
    z.infer<typeof createLeagueSchema>;

export type JoinLeagueDTO =
    z.infer<typeof joinLeagueSchema>;