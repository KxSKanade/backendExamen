// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const validateBody = require('../middlewares/validateBody');
const { productSchema } = require('../schemas/productSchema');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateBody(productSchema), productController.createProduct);
router.put('/:id', validateBody(productSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
