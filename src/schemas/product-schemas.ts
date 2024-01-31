import Joi, { Schema } from 'joi';

export const productJoiSchema: Schema = Joi.object({
    title: Joi.string()
    .required()
    .messages({
        'any.required': 'missing required name field',
      }),

    description: Joi.string()
    .required()
    .messages({
        'any.required': 'missing required name field',
      }),
    details: Joi.string()
    .allow('')
    .optional(),
    img: Joi.string()
    .required(),
    price: Joi.number()
    .min(0)
    .required()
    .messages({
        'any.required': 'The price must be provided',
        'number.min': 'The price must be greater than or equal to 0',
    }),
});