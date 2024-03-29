import Joi from "joi";

export const reviewJoiSchema = Joi.object({
   
    userName: Joi.string()
      .required()
      .min(2)
      .max(10)
      .messages({ "any.required": "missing required user name field" }),
    
    comment: Joi.string()
      .required()
      .messages({ "any.required": "missing required comment field, *(any string)", }),
  });