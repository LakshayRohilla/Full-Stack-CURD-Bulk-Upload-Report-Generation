import * as categoryService from '../services/categoryService.js';
import AppError from '../models/errorModel.js';

export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body.name);
    res.status(201).json({ message: 'Category created successfully.', category });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to create category: ${error.message}`);
    }
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to fetch categories: ${error.message}`);
    }
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to retrieve category: ${error.message}`);
    }
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body.name);
    res.status(200).json({ message: 'Category updated successfully.', category: updatedCategory });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to update category: ${error.message}`);
    }
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to delete category: ${error.message}`);
    }
    next(error);
  }
};