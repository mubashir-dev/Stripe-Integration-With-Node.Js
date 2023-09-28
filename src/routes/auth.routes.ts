import { Router } from 'express';
export const authRouter: Router = Router();
import { authController } from '../controllers';
import { authenticate, validator } from '../middlewares';
import { authValidationSchema } from '../validations'

// Auth routes
authRouter.post(`/sign-up`, validator(authValidationSchema.signUpDTO), authController.signUp);
authRouter.post(`/sign-in`, validator(authValidationSchema.signInDTO), authController.signIn);
authRouter.get(`/current-user`, authenticate, authController.currentUser);
