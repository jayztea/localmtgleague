import { Router } from "express";
import bcrypt from "bcrypt";

import { db } from "../db";


const router = Router();



router.post("/register", async (req, res) => {

    try {

        const {
            email_address,
            password,
            display_name
        } = req.body;

        if(!email_address || !password || !display_name)
        {
            return res.status(400).json({
                message:"Email, password, and display name are required."
            });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);



        // Create user
        const [userResult]: any = await db.query(
            `
            INSERT INTO users
            (
                email_address,
                password_hash,
                account_type_id
            )
            VALUES (?, ?, ?)
            `,
            [
                email_address,
                password_hash,
                2
            ]
        );


        const user_id = userResult.insertId;



        // Create player profile
        await db.query(
            `
            INSERT INTO players
            (
                user_id,
                display_name
            )
            VALUES (?, ?)
            `,
            [
                user_id,
                display_name
            ]
        );



        res.status(201).json({
            message:"User created",
            user_id
        });


    } catch(error:any) {

        console.error(error);


        if(error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                message:"An account with this information already exists."
            });

        }


        res.status(500).json({
            message:"Registration failed. Please try again later."
        });

    }

});


export default router;