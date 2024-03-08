import Joi from "joi";
import {iconTypes, backgroundTypes} from "../constants.js"

export const updateBoardSchema = Joi.object({
    title: Joi.string().required().messages({
      "any.required": "missing required title field",
    }),
    icon: Joi.string()
      .required()
      .valid(...iconTypes)
      .messages({
        "any.required": "missing required icon field",
      }),
    background: Joi.string()
      .required()
      .valid(...backgroundTypes)
      .messages({
        "any.required": "missing required background field",
      }),
  });