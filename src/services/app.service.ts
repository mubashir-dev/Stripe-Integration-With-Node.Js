import { Request, Response, NextFunction } from "express";

export async function status(req: Request, resp: Response, next: NextFunction) {
    return { message: "Server is Running" };
}
