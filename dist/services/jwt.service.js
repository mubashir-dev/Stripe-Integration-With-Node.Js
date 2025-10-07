"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var JWT = __importStar(require("jsonwebtoken"));
var config_1 = require("../config");
var generateAccessToken = function (user) {
    return new Promise(function (resolve, reject) {
        // const jwtPayload: any = user;
        // console.log("🚀 ~ file: jwt.service.ts:8 ~ returnnewPromise ~ jwtPayload:", jwtPayload)
        var options = {
            expiresIn: config_1.jwtConfig.timeout,
            issuer: "test.com",
        };
        JWT.sign(user, config_1.jwtConfig.secret, options, function (error, token) {
            if (error) {
                reject("JWT access token has not been issued");
                return;
            }
            resolve(token);
        });
    });
};
exports.generateAccessToken = generateAccessToken;
var generateRefreshToken = function (user) {
    return new Promise(function (resolve, reject) {
        var options = {
            expiresIn: config_1.jwtConfig.timeout,
            issuer: "test.com",
        };
        JWT.sign(user, config_1.jwtConfig.secret, options, function (error, token) {
            if (error) {
                console.log(error.message);
                reject("JWT refresh token has not been issued");
                return;
            }
            resolve(token);
        });
    });
};
exports.generateRefreshToken = generateRefreshToken;
var verifyAccessToken = function (token) {
    return new Promise(function (resolve, reject) {
        JWT.verify(token, config_1.jwtConfig.secret, function (err, payload) {
            if (err)
                return reject(err);
            resolve(payload);
        });
    });
};
exports.verifyAccessToken = verifyAccessToken;
var verifyRefreshToken = function (refreshToken) {
    return new Promise(function (resolve, reject) {
        JWT.verify(refreshToken, config_1.jwtConfig.secret, function (error, payload) {
            if (error)
                return reject(error);
            resolve(payload);
        });
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
