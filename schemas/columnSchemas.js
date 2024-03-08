import Joi from "joi";
3
export const columnSchema = Joi.object({
    title: Joi.string().required().messages({
      "any.required": "missing required title field",
    }),
    board: Joi.string().required().messages({
      "any.required": "missing required board field",
    }),
  });