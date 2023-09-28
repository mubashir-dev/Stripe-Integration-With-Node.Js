import { Router } from 'express';
export const courseRouter: Router = Router();
import { courseController } from '../controllers';
import { authenticate, validator } from '../middlewares';
import { courseValidationSchema } from '../validations'

// Course routes
courseRouter.get(`/`, authenticate, courseController.findAll);
courseRouter.get(`/:id`, authenticate, courseController.findOne);
courseRouter.post(`/`, [authenticate, validator(courseValidationSchema.storeCourseDTO)], courseController.store);
