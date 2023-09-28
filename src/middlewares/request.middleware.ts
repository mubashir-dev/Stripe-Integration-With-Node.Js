import { logger } from '../utils';
import os from 'os';
import { Request, Response, NextFunction } from 'express';


export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
    response.on('finish', () => {
        const { ip, method, url } = request;
        const { statusCode } = response;
        const hostname = os.hostname();
        const userAgent = request.get('user-agent') || '';
        logger.info(
            `[hostname: ${hostname}] [method : ${method}] [url: ${url}] [status : ${statusCode}] [userAgent:[${userAgent}] Ip:[${ip}]]`,
        );
    });
    next();
};
