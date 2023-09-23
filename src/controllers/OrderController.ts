import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { orderSchema } from "../utils/validation.js";
import fs from 'fs';
import path from "path";
import { google } from 'googleapis'
import { oauth2Client } from "../utils/google-drive-service.js";

const prisma = new PrismaClient();

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

const uploadFile = async (imgName: any, image: any) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: imgName,
                mimeType: "image/png",
                parents: ['14LBPbWmuhPZqAltyHszgDH1MjAh1iQPR']
            },

            media: {
                mimeType: "image/png",
                body: fs.createReadStream(image),
            },
        });
        // report the response from the request
        return response;
    } catch (error: any) {
        //report the error message
        return error.message;
    }
};

export const createOrder = async (req: Request, res: Response) => {
    console.log(req.file)

    if (req.file === undefined) {
        return res.status(400).json({
            message: "File is required",
            success: false,
        })
    }

    //Validate
    if (!req.body.customer_name || !req.body.customer_email || !req.body.customer_phone || !req.body.category || !req.body.deadline || !req.body.payment_method || !req.body.quantity || !req.body.width || !req.body.height || !req.body.length || !req.body.description || !req.body.deadline) {
        return res.status(400).json({
            message: "Bad Request",
        })
    }

    try {
        let invoice = "INV-" + Math.floor(Math.random() * 1000000000);

        if (!req.file) {
            res.status(400)
        } else {
            const tmp_path = req.file.path
            const file_name = req.file.filename + path.extname(req.file.originalname);
            const target_path = 'uploads/' + file_name


            const src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async function () {

                const driveInfo = await uploadFile(
                    file_name,
                    target_path
                )

                console.log(driveInfo);

                if (!driveInfo) {
                    return res.status(500).json({
                        status: false,
                        message: "Something is Wrong, please contact developer team"
                    })
                }

                const imageLink = `https://drive.google.com/uc?export=view&id=${driveInfo.data.id}`;

                const order = await prisma.order.create({
                    data: {
                        invoice: invoice,
                        quantity: parseInt(req.body.quantity),
                        width: parseInt(req.body.width),
                        height: parseInt(req.body.height),
                        length: parseInt(req.body.length),
                        description: req.body.description,
                        design_url: imageLink,
                        category: req.body.category,
                        deadline: req.body.deadline,
                        asset_url: req.body?.asset_url,
                        payment_method: req.body.payment_method,
                    }
                })

                // Set ordrr customer data
                const order_customer = await prisma.orderCustomerDetail.create({
                    data: {
                        order_id: order.id,
                        customer_name: req.body.customer_name,
                        customer_email: req.body.customer_email,
                        customer_phone: req.body.customer_phone,
                        organization_name: req.body?.organization_name,
                        organization_website: req.body?.organization_website,
                    }
                })

                res.status(201).json({
                    message: "Order created",
                    success: true,
                    data: {
                        invoice: order.invoice,
                    }
                })
            });
            src.on('error', function (err) { res.render('error'); });
        }

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

        const mapped_orders = orders.map((order: any) => {
            return {
                id: order.id,
                no_pemesanan: order.invoice,
                customer: order.OrderCustomerDetail,
                category: order.category,
                status: order.status,
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

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                OrderCustomerDetail: true
            },
        })

        if (!order) {
            res.status(404).json({
                message: "Order not found",
                success: false,
            })
        }

        res.json({
            message: "Order fetched",
            success: true,
            data: order
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getOrderByInvoice = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                invoice: req.params.invoice
            },
            include: {
                OrderCustomerDetail: true
            },
        })

        if (!order) {
            res.status(404).json({
                message: "Order not found",
                success: false,
            })
        }

        res.json({
            message: "Order fetched",
            success: true,
            data: order
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.update({
            where: {
                id: req.params.id
            },
            data: {
                status: req.body.status
            }
        })

        res.json({
            message: "Order updated",
            success: true,
            data: order
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        })
    }
}

