
import { Request, Response, NextFunction } from "express";
import { appService } from '../services';
import { apiResponse } from '../utils/response.util';

export async function systemCheck(req: Request, res: Response, next: NextFunction) {
    try {
        const { message } = await appService.status(req, res, next);
        return apiResponse({
            response: res,
            message,
            isSuccess: true,
        });
    } catch (error: any) {
        next(error);
    }
}
