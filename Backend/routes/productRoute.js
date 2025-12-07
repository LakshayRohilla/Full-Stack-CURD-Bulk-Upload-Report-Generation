import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;