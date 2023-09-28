import { Request, Response, NextFunction } from "express";
import * as JWT from "jsonwebtoken";
import { jwtConfig } from "../config";
import { token } from "morgan";

export const generateAccessToken = (user: any): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        const jwtPayload: any = user;
        const options = {
            expiresIn: jwtConfig.timeout,
            issuer: "test.com",
        };
        JWT.sign({ jwtPayload }, jwtConfig.secret as string, options, (error, token) => {
            if (error) {
                reject("JWT access token has not been issued");
                return;
            }
            resolve(token);
        });
    });
};

export const generateRefreshToken = (user: any): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        const jwtPayload = user;
        const options = {
            expiresIn: jwtConfig.timeout,
            issuer: "test.com",
        };
        JWT.sign(
            { jwtPayload },
            jwtConfig.secret!,
            options,
            (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject("JWT refresh token has not been issued");
                    return;
                }
                resolve(token);
            }
        );
    });
};

export const verifyAccessToken = (token: string) => {
    return new Promise((resolve, reject) => {
        JWT.verify(
            token, jwtConfig.secret as string, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            }
        );
    });
};

export const verifyRefreshToken = (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        JWT.verify(
            refreshToken,
            jwtConfig.secret!,
            (error, payload) => {
                if (error) return reject(error);
                resolve(payload);
            }
        );
    });
};