// src/controllers/productController.js
const Product = require('../models/productModel');
const { fetchRandomImageUrl } = require('../utils/externalImage');

module.exports = {
  // GET /api/products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:id
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
      return res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/products
  async createProduct(req, res, next) {
    try {
      // Los datos validados por Joi están en req.validatedBody
      const { name, description, price, stock } = req.validatedBody;

      // Obtener imagen externa
      const imageUrl = await fetchRandomImageUrl();

      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        image_url: imageUrl,
      });

      return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/products/:id
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.validatedBody;

      // Verificar si existe
      const existing = await Product.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }

      // Si quieres permitir actualizar imagen con body, tendrías que agregarlo a Joi
      // Pero aquí mantenemos la imagen existente a menos que explícitamente la cambies.
      // Asumiremos que no se actualiza image_url con PUT en este ejemplo.
      const updated = await Product.update(id, {
        name,
        description,
        price,
        stock,
        image_url: existing.image_url,
      });

      return res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/products/:id
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Product.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
      await Product.delete(id);
      return res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  },
};
