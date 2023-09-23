// EXPRESS
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";


import authRouter from "./routes/AuthRoute.js";
import orderRouter from "./routes/OrderRoute.js";

import path from 'path';
import * as url from 'url';

dotenv.config();

const app: Express = express();

// CONFIGURATIONS
app.use(express.json());
const port = process.env.PORT || 3000;

// CORS
app.use(cors({
    origin: true
}));


// ENDPOINT
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "API is working",
        success: true
    })
})

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// app.get("/uploads/:file", (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../uploads', req.params.file));
// });

app.use("/uploads", express.static(path.join(__dirname, '../uploads')))


app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);


app.listen(port, () => {
    try {
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})