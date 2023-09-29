import { Router } from 'express';
import { appRouter, authRouter, courseRouter,purchaseRouter,paymentRouter } from './index';

const mainRouter: Router = Router();
const versionRouter: Router = Router();

mainRouter.use(`/api/v1`, versionRouter);

//versionRouter
versionRouter.use('/auth', authRouter);
versionRouter.use('/course', courseRouter);
versionRouter.use('/purchase', purchaseRouter);
versionRouter.use('/stripe', paymentRouter);
mainRouter.use('/app', appRouter);

export  default mainRouter;