import { Request, Response, NextFunction } from "express";
import { paymentService } from "../services";
import { apiResponse } from "../utils";


export async function stripePaymentLink(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await paymentService.stripePaymentLink(req, res, next);
        return apiResponse({
            response: res,
            result: { checkout: data.url, sessionId: data.id },
        });
    } catch (error) {
        next(error);
    }
}


export async function retrievePaymentLink(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await paymentService.retrievePaymentLink(req, res, next);
        return apiResponse({
            response: res,
            result: data,
        });
    } catch (error) {
        next(error);
    }
}