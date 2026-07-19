import {
    Router
}
from "express";

import {
    authenticateToken
}
from "../middleware/authMiddleware";

import {
    getDashboard,
    getLeagueDashboard
}
from "../controllers/dashboardController";

const router =
    Router();



router.get(
    "/dashboard",
    authenticateToken,
    getDashboard
);



router.get(
    "/dashboard/league/:leagueId",
    authenticateToken,
    getLeagueDashboard
);

export default router;