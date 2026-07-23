import dotenv from "dotenv";


dotenv.config();


function required(
    value: string | undefined,
    name: string
): string {

    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}`
        );
    }

    return value;
}



export const env = {

    NODE_ENV:
        process.env.NODE_ENV ?? "development",


    PORT:
        Number(process.env.PORT ?? 3000),


    DB_HOST:
        required(
            process.env.DB_HOST,
            "DB_HOST"
        ),


    DB_USER:
        required(
            process.env.DB_USER,
            "DB_USER"
        ),


    DB_PASSWORD:
        required(
            process.env.DB_PASSWORD,
            "DB_PASSWORD"
        ),


    DB_NAME:
        required(
            process.env.DB_NAME,
            "DB_NAME"
        ),


    JWT_SECRET:
        required(
            process.env.JWT_SECRET,
            "JWT_SECRET"
        )

};