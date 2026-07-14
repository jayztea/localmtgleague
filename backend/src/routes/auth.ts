import { Router } from "express";

import * as authController from "../controllers/authController";

import { validateRequest } from "../middleware/validateRequest";

import {
    registerSchema,
    loginSchema
} from "../schemas/authSchemas";

import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    authController.register
);

router.post(
    "/login",
    validateRequest(loginSchema),
    authController.login
);

router.get(
    "/me",
    authenticateToken,
    authController.me
);

export default router;