// EXPRESS
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const fileUpload = require('express-fileupload');

import authRouter from "./routes/AuthRoute.js";
import orderRouter from "./routes/OrderRoute.js";

dotenv.config();

const app: Express = express();

// CONFIGURATIONS
app.use(express.json());
const port = process.env.PORT || 3000;

// CORS
app.use(cors({
    origin: true
}));

app.use(fileUpload());

app.use(express.static('public'));


// ENDPOINT
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "API is working",
        success: true
    })
})

app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);


app.listen(port, () => {
    try {
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})