import { Router } from 'express';
export const purchaseRouter: Router = Router();
import { purchaseController } from '../controllers';
import { authenticate, validator } from '../middlewares';
import { coursePurchase } from '../validations';

// Purchase Course routes
purchaseRouter.get(`/list`, authenticate, purchaseController.purchaseList);
purchaseRouter.get(`/list/:id`, authenticate, purchaseController.purchaseDetails);
purchaseRouter.post(`/`, [authenticate, validator(coursePurchase.purchaseDTO)], purchaseController.purchaseCourse);
