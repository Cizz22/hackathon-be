import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.token as string;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        if (process.env.JWT_PASS) {
            jwt.verify(token, process.env.JWT_PASS as Secret, (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: "Token not Valid",
                    });
                }
                req.user = user;
                next();
            });
        } else {
            res.status(500).json({
                message: "JWT_PASS not defined",
            });
        }
    } else {
        res.status(401).json({
            message: "unAuthorization",
        });
    }
};
