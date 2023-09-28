import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services";
import { apiResponse } from "../utils";
import { TokenExpiredError } from "jsonwebtoken";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return apiResponse({ response: res, message: "unauthorized access", code: 401 });
        }
        const authToken = authHeader.replace(/^\s+|\s+$/g, "").split(' ');
        const payload = await jwtService.verifyAccessToken(authToken[1]);
        res.locals.USER_DATA = payload;
        next();
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            return apiResponse({ response: res, message: "expired access token", code: 401 });
        }
        return apiResponse({ response: res, message: "authentication failed", code: 401 });
    }
};