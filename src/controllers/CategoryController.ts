import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany()

        res.json({
            message: "Categories fetched",
            success: true,
            data: categories
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}