import Joi, { Schema } from 'joi';

export const basketJoiSchema: Schema = Joi.object({
    _id: Joi.string() 
    .required()
    .messages({
        'any.required': 'Missing required product id',
    }),
  
    quantity: Joi.number()
    .required()
    .messages({
        'number.min': 'The quantity must be greater than or equal to 0',
      }),
   
});



