import {
    Router
}
from "express";


import * as authController
from "../controllers/authController";


import {
    validateRequest
}
from "../middleware/validateRequest";


import {
    registerSchema,

    loginSchema,

    forgotPasswordSchema,

    resetPasswordSchema

}
from "../schemas/authSchemas";


import {
    authenticateToken
}
from "../middleware/authMiddleware";



const router =
    Router();





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







router.post(

    "/forgot-password",

    validateRequest(forgotPasswordSchema),

    authController.forgotPassword

);







router.post(

    "/reset-password",

    validateRequest(resetPasswordSchema),

    authController.resetPassword

);







router.get(

    "/me",

    authenticateToken,

    authController.me

);





export default router;