import { Router } from 'express';
export const paymentRouter: Router = Router();
import { paymentController } from '../controllers';
import { authenticate, validator } from '../middlewares';
import { paymentSchema } from '../validations'

// Payment routes
paymentRouter.post(`/checkout`, [authenticate, validator(paymentSchema.paymentDTO)], paymentController.stripePaymentLink);
paymentRouter.get(`/checkout/details/:id`, authenticate, paymentController.retrievePaymentLink);
