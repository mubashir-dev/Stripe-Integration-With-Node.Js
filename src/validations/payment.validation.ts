
import * as Joi from "joi";

export const paymentDTO = Joi.object({
    courseId: Joi.string().required()
});
