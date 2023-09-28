import express from "express";
import cors from 'cors';
import { appConfig } from './config';
import { logger } from "./utils";
import { Request, Response, NextFunction } from 'express';
import { errorHandler, requestLogger } from "./middlewares";
import mainRouter from "./routes/api.routes";
import { connectDatabase } from "./database/connection";


const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => requestLogger(req, res, next))
app.use(cors());
app.set("trust proxy", true);
app.use(mainRouter);

//404 
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.json({
        message: "404 Not Found"
    })
});

//error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => errorHandler(error, req, res))


//establish database connection
connectDatabase();

app.listen(appConfig.nodeServicePort, () => {
    logger.info(
        `🚀 Started server on => http://localhost:${appConfig.nodeServicePort}`,
    );
});