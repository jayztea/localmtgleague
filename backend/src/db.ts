import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    charset: "utf8mb4"
});

// Optional startup validation
(async () => {
    try {
        const connection = await db.getConnection();

        console.log("✅ Database connection established.");

        connection.release();
    }
    catch (error) {
        console.error("❌ Failed to connect to database.");
        console.error(error);

        process.exit(1);
    }
})();