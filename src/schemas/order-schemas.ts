
import Joi from "joi";

const phoneRegexp = /^\+\d{1,3}\d{9}$/

export const orderJoiSchema = Joi.object({
  
    userName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'any.required': 'missing required user name field',
      }),
  
      phone: Joi.string()
      .pattern(phoneRegexp) 
      .required()
      .messages({
        'any.required': 'missing required phone field',
        'string.pattern.base': 'phone field must have the format +123123456789',
      }),
  
      deliveryMethod: Joi.string()
      .required()
      .messages({
        'any.required': 'missing required delivery method field',
      }),
      deliveryAddress: Joi.object()
      .required()
      .messages({
        'any.required': 'missing required delivery address field',
      }),
      products: Joi.array()
    //   totalPrice: Joi.number()
    //   .messages({
    //     'any.required': 'total price must be  greater than or equal to 0',
    //   }),

  })