import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils";
import { courseService } from "../services";

export async function store(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await courseService.store(req, res, next);
        return apiResponse({
            response: res,
            result: data,
        });
    }
    catch (error) {
        next(error);
    }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await courseService.find(req, res, next);
        return apiResponse({
            response: res,
            result: data,
        });
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await courseService.findOne(req, res, next);
        if (data.at(0) == undefined) return apiResponse({
            response: res,
            message: "Course not found",
            code: 404,
        });
        return apiResponse({
            response: res,
            result: data.at(0),
        });
    } catch (error) {
        next(error);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {

}