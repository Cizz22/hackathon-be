import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { userSchema } from "../utils/validation.js";
import { hashPassword, comparePassword } from "../utils/password-encryption.js";

const prisma = new PrismaClient();



export const verifyAccess = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Token is valid",
        success: true
    })
}

export const register = async (req: Request, res: Response) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        await userSchema.validateAsync({
            name,
            email,
            password
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await hashPassword(password)
            }
        })
        res.json({
            message: "User created",
            success: true,
            data: user
        })
    } catch (error: any) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const {
        email,
        password: pass
    } = req.body;

    if (!pass || !email) {
        return res.status(400).json({
            message: "Email and password are required",
            success: false
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            })
        }

        const isValid = await comparePassword(pass, user.password);

        if (!user || !isValid) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            })
        }

        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_PASS as string,
            {
                expiresIn: "1d"
            }
        )


        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            password,
            ...data
        } = user;

        res.status(200).json({
            message: "Login success",
            success: true,
            data: {
                ...data,
                accessToken
            }
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
