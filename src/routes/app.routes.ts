import { Router } from 'express';
export const appRouter: Router = Router();
import { appController } from '../controllers';
import { authenticate } from '../middlewares';

//to ping the server
appRouter.get(`/status`, appController.systemCheck);
