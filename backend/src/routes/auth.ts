import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../db";


const router = Router();


router.post("/register", async (req, res) => {

    const {
        email_address,
        password
    } = req.body;


    const password_hash = await bcrypt.hash(password, 10);


    await db.query(
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


    res.json({
        message: "User created"
    });

});


router.post("/login", async (req,res)=>{

    const {
        email_address,
        password
    } = req.body;


    const [rows]: any = await db.query(
        `
        SELECT *
        FROM users
        WHERE email_address = ?
        `,
        [
            email_address
        ]
    );


    if(rows.length === 0)
    {
        return res.status(401).json({
            message:"Invalid login"
        });
    }


    const user = rows[0];


    const valid = await bcrypt.compare(
        password,
        user.password_hash
    );


    if(!valid)
    {
        return res.status(401).json({
            message:"Invalid login"
        });
    }


    const token = jwt.sign(
        {
            user_id:user.user_id
        },
        process.env.JWT_SECRET!,
        {
            expiresIn:"1d"
        }
    );


    res.json({
        token
    });

});


export default router;