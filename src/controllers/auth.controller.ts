import { Request, Response, NextFunction } from "express";
import { authService, shareService } from '../services';
import { logger, apiResponse } from "../utils";

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const { result, message } = await authService.register(req, res, next);
        return apiResponse({
            response: res,
            result,
            message,
        });
    } catch (error: any) {
        next(error);
    }
};

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const { user, accessToken, refreshToken } = await authService.signIn(req, res, next);
        return apiResponse({ response: res, message: "login successfully", result: { user, accessToken, refreshToken } });
    } catch (error: any) {
        next(error);
    }
};


export async function currentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { _id } = res.locals.USER_DATA as any;
        const user = await authService.getUser(_id);
        //serialized user data
        const serializedUserData = await authService.serializeUser(user);
        return apiResponse({ response: res, message: 'current logged user', result: serializedUserData });
    }
    catch (error: any) {
        next(error)
    }
}