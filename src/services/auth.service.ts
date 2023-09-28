import { Request, Response, NextFunction } from "express";
import { shareService, jwtService } from '../services';
import { userModel } from "../models";
import { logger, apiResponse, passwordUtil } from "../utils";


export async function register(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body;

    const emailExists = await shareService.checkIfExists(userModel, { param: "email", value: email });
    if (emailExists) {
        return apiResponse({
            response: res,
            message: `Email ${email} has already taken`,
            code: 409
        });
    }

    //save user
    const user = new userModel({ name, email, password });
    const salt = await passwordUtil.randomSalt();
    const hashedPassword = await passwordUtil.encrypt(password, salt);
    user.salt = salt;
    user.password = hashedPassword;
    const userSave = await user.save();    
    //serialize the user
    const serializedUser = await serializeUser(userSave);
    return {
        result: serializedUser,
        message: "successfully registered"
    };
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return apiResponse({ response: res, message: "Account not found" });

    const comparePassword = await passwordUtil.compare(
        password,
        user.password,
    );

    if (!comparePassword) return apiResponse({
        response: res,
        message: "email or password may be incorrect"
    });

    //generate jwt tokens
    const [accessToken, refreshToken]: string | any = await Promise.all([
        jwtService.generateAccessToken(user._id),
        jwtService.generateRefreshToken(user._id),
    ]);

    //serialize user
    const serializedUser = await serializeUser(user);

    return { user: serializedUser, accessToken, refreshToken };
}

export async function getUser(id: string) {
    return userModel.findOne({ id });
}

export async function serializeUser(user: unknown) {
    const userData = user as any;
    return {
        _id: userData._id as string,
        name: userData.name as string,
        email: userData.email as string,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
    };
}