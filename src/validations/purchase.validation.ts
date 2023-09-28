
import * as Joi from "joi";

export const purchaseDTO = Joi.object({
    courseId: Joi.string().required(),
    sessionId: Joi.string().required(),
});
