import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { orderSchema } from "../utils/validation.js";

const prisma = new PrismaClient();

interface FilesRequest extends Request {
    files?: any;
}

export const createOrder = async (req: FilesRequest, res: Response) => {
    try {
        orderSchema.validateAsync(req.body);
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        })
    }

    try {
        let invoice = "INV-" + Math.floor(Math.random() * 1000000000);

        const { design_img } = req.files;

        if (!design_img) res.status(400)

        if (/^image/.test(design_img.mimetype)) return res.sendStatus(400);

        const path = `${__dirname}/public/designs/${invoice}.png`

        design_img.mv(path)

        const order = await prisma.order.create({
            data: {
                invoice: invoice,
                quantity: req.body.quantity,
                width: req.body.width,
                height: req.body.height,
                length: req.body.length,
                description: req.body?.description,
                design_url: path,
            }
        })

        // Set ordrr customer data
        const order_customer = await prisma.orderCustomerDetail.create({
            data: {
                order_id: order.id,
                customer_name: req.body.customer_name,
                customer_email: req.body.customer_email,
                customer_phone: req.body.customer_phone,
                organization_name: req.body.organization_name,
                organization_website: req.body.organization_website,
            }
        })

        res.status(201).json({
            message: "Order created",
            success: true,
            data: {
                invoice: order.invoice,
            }
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                OrderCustomerDetail: {
                    select: {
                        customer_name: true,
                        customer_email: true,
                        customer_phone: true,
                    }
                }
            },
        })

        const mapped_orders = orders.map((order) => {
            return {
                id: order.id,
                no_pemesanan: order.invoice,
                customer: order.OrderCustomerDetail,
                categoty: "Boneka"
            }
        })

        res.json({
            message: "Orders fetched",
            success: true,
            data: mapped_orders
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}