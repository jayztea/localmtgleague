import { z } from "zod";

export const addOfflinePlayerSchema = z.object({

    body: z.object({

        display_name: z
            .string()
            .trim()
            .min(1, "Player name is required.")
            .max(100, "Player name must be 100 characters or less.")

    })

});