import { Request, Response, NextFunction } from "express";
import { apiResponse } from "../utils";
import { purchaseService } from "../services";

export async function purchaseCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await purchaseService.purchaseCourse(req, res, next);
        return apiResponse({
            response: res,
            result: data,
            message:"Course has been successfully purchased"
        });
    } catch (error) {
        next(error);
    }
}


export async function purchaseList(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await purchaseService.purchaseList(req, res, next);
        return apiResponse({
            response: res,
            result: data,
        });
    } catch (error) {
        next(error);
    }
}

export async function purchaseDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await purchaseService.purchaseDetails(req, res, next);
        if (data.at(0) == undefined) {
            apiResponse({ response: res, message: "Course purchase details not found" });
            return;
        }
        return apiResponse({
            response: res,
            result: data.at(0),
        });
    } catch (error) {
        next(error);
    }
}