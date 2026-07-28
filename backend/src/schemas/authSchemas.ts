import { z } from "zod";



export const registerSchema = z.object({

    email_address: z.email({

        message:
            "A valid email address is required."

    }),


    password: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters."
        ),


    display_name: z
        .string()
        .trim()
        .min(
            3,
            "Display name must be at least 3 characters."
        )
        .max(
            100,
            "Display name cannot exceed 100 characters."
        )

});







export const loginSchema = z.object({

    email_address: z.email({

        message:
            "A valid email address is required."

    }),


    password: z
        .string()
        .min(
            1,
            "Password is required."
        )

});









export const forgotPasswordSchema = z.object({

    email_address: z.email({

        message:
            "A valid email address is required."

    })

});









export const resetPasswordSchema = z.object({

    token: z

        .string()

        .min(

            1,

            "Reset token is required."

        ),



    password: z

        .string()

        .min(

            8,

            "Password must be at least 8 characters."

        )

});









export type RegisterRequest =

    z.infer<typeof registerSchema>;



export type LoginRequest =

    z.infer<typeof loginSchema>;



export type ForgotPasswordRequest =

    z.infer<typeof forgotPasswordSchema>;



export type ResetPasswordRequest =

    z.infer<typeof resetPasswordSchema>;