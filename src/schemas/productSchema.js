// src/schemas/productSchema.js
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().min(0).required(),
  // image_url no se recibe desde el cliente (se genera automáticamente)
});

module.exports = {
  productSchema,
};
