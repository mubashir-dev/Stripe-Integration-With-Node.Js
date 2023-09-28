import { Request, Response } from "express";
import type { ErrorRequestHandler } from "express";
import { logger, apiResponse } from "../utils";

export const errorHandler = (err: any, request: Request, response: Response) => {
    const originalError = err as any;
    logger.error(`URL: ${request.url}`, {
        meta: { error: originalError.stack, body: request },
    });
    return apiResponse({
        response,
        code: 500,
        message: err.message,
    });
};
