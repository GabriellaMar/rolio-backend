import Joi, { Schema } from 'joi';

export const basketJoiSchema: Schema = Joi.object({
    productId: Joi.string()
    .required()
    .messages({
        'any.required': 'missing required file id',
      }),

    quantity: Joi.number()
    .required()
    .messages({
        'number.min': 'The quantity must be greater than or equal to 0',
      }),
      totalPrice: Joi.number()
      // .required()
      .messages({
          'number.min': 'The totalPrice must be greater than or equal to 0',
        }),
});