import { z } from "zod";


export const createDeckSchema =
    z.object({

        deck_name:
            z.string()
            .min(1)
            .max(100),


        commander_id:
            z.number()
            .int()
            .positive(),


        power_level:
            z.number()
            .int()
            .min(1)
            .max(10),


        bracket_level:
            z.number()
            .int()
            .min(1)
            .max(5)

    });



export type CreateDeckDto =
    z.infer<
        typeof createDeckSchema
    >;