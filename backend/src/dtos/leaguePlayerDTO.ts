import { z } from "zod";

export const addPlayerSchema = z.object({

    email_address:
        z.string().email()

});

export type AddPlayerDto =
    z.infer<typeof addPlayerSchema>;