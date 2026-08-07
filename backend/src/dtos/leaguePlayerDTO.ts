import { z } from "zod";



export const addPlayerSchema =
z.object({

    email_address:
        z.string()
        .email()

});



export type AddPlayerDto =
    z.infer<typeof addPlayerSchema>;





export const addOfflinePlayerSchema =
z.object({

    display_name:
        z.string()
        .min(1)
        .max(100)

});


export type AddOfflinePlayerDto =
    z.infer<typeof addOfflinePlayerSchema>;