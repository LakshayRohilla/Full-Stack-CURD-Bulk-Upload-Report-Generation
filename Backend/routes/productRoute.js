import express from 'express';
import * as productController from '../controllers/productController.js';
import upload from '../middleware/uploadFileMiddleware.js';

const router = express.Router();

router.route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

// bulk upload endpoint
router.post('/bulk-upload', upload.single('file'), productController.bulkUploadProducts);

export default router;