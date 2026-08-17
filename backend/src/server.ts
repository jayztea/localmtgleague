import express from "express";
import cors from "cors";

import { env } from "./config/env";

import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";
import healthRoutes from "./routes/health";
import leagueRoutes from "./routes/leagues";
import leaguePlayerRoutes from "./routes/leaguePlayers";
import deckRoutes from "./routes/deck";
import matchRoutes from "./routes/match";
import statisticsRoutes from "./statistics/statisticsRoutes";
import leagueStatisticsRoutes from "./statistics/league/leagueStatisticsRoutes";
import dashboardRoutes from "./routes/dashboard";
import commanderRoutes from "./routes/commander";
import adminRoutes from "./routes/admin";
import matchDetailsRoutes from "./routes/matchDetails";
import feedbackRoutes from "./routes/feedback";

import { errorHandler } from "./middleware/errorHandler";



const app = express();



const PORT =
    Number(env.PORT) || 3000;



const allowedOrigins =
    env.NODE_ENV === "production"
        ? [
            "https://localmtgleague.vercel.app",
            "https://localmagicleague.com",
            "https://www.localmagicleague.com",
        ]
        : [
            "http://localhost:5173",
        ];



app.use(
    cors({

        origin: (
            origin,
            callback
        ) => {

            console.log(
                "Incoming CORS Origin:",
                origin
            );


            if (!origin) {

                return callback(
                    null,
                    true
                );

            }



            if (
                allowedOrigins.includes(origin)
            ) {

                return callback(
                    null,
                    true
                );

            }



            console.error(
                "Blocked CORS Origin:",
                origin
            );


            return callback(
                new Error(
                    "Not allowed by CORS"
                )
            );

        },


        credentials: true,


        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],


        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]

    })
);



app.use(
    express.json()
);



app.use(
    "/auth",
    authRoutes
);



app.use(
    "/test",
    testRoutes
);



app.use(
    "/health",
    healthRoutes
);



app.use(
    "/leagues",
    leagueRoutes
);



app.use(
    "/leagues",
    leaguePlayerRoutes
);



app.use(
    "/decks",
    deckRoutes
);



app.use(
    "/matches",
    matchRoutes
);



app.use(
    statisticsRoutes
);



app.use(
    dashboardRoutes
);



app.use(
    leagueStatisticsRoutes
);



app.use(
    "/commanders",
    commanderRoutes
);



app.use(
    "/admin",
    adminRoutes
);



app.use(
    "/feedback",
    feedbackRoutes
);



app.use(
    matchDetailsRoutes
);



app.use(
    errorHandler
);



app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "========================================"
        );

        console.log(
            " MTG League API"
        );

        console.log(
            "========================================"
        );

        console.log(
            `Environment : ${env.NODE_ENV}`
        );

        console.log(
            `Port        : ${PORT}`
        );

        console.log(
            `CORS Origins: ${allowedOrigins.join(", ")}`
        );

        console.log(
            "========================================"
        );

    }
);