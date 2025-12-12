import * as productService from '../services/productService.js';
import AppError from '../models/errorModel.js';

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, categoryId } = req.body;
    const product = await productService.createProduct(name, price, categoryId);
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to create product: ${error.message}`);
    }
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to fetch products: ${error.message}`);
    }
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to retrieve product: ${error.message}`);
    }
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: 'Product updated successfully.', product: updated });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to update product: ${error.message}`);
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully.'});
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to delete product: ${error.message}`);
    }
    next(error);
  }
};

// POST /products/bulk-upload
export const bulkUploadProducts = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      throw new AppError(400, 'No file uploaded');
    }
    // req.file.buffer passed to service
    const result = await productService.bulkCreateFromExcel(req.file.buffer);
    res.status(200).json(result);
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Bulk upload failed: ${error.message}`);
    }
    next(error);
  }
};