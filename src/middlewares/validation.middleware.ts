import { Request, Response, NextFunction } from "express";
import { logger, apiResponse } from "../utils";


export const validator = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const data = schema.validate(req.body, { abortEarly: false });
    if (data.error) {

        let errorsData: any = [];
        data.error.details.forEach((element: any) => {
            errorsData.push(element.message);
        });

        return apiResponse({
            response: res,
            code: 422,
            message: "Validation errors",
            errors: errorsData
        });
    }
    next();
};
