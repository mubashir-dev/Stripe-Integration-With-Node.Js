
import * as Joi from "joi";

export const storeCourseDTO = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    image: Joi.string().required(),
    meta: Joi.object({
        currency: Joi.string().valid('USD','PKR').required(),
        price: Joi.number().required(),
    }).required()
});
