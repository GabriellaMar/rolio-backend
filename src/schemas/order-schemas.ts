
import Joi from "joi";

const phoneRegexp = /^\+\d{1,3}\d{9}$/

export const orderJoiSchema = Joi.object({
    // _id: Joi.string() 
    // .required()
    // .messages({
    //     'any.required': 'Missing required order id',
    // }),
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
      deliveryAddress: Joi.string()
      .required()
      .messages({
        'any.required': 'missing required delivery address field',
      }),
    //   totalPrice: Joi.number()
    //   .messages({
    //     'any.required': 'total price must be  greater than or equal to 0',
    //   }),

  })