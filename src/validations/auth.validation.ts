
import * as Joi from "joi";

export const signUpDTO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } })
});

export const signInDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
