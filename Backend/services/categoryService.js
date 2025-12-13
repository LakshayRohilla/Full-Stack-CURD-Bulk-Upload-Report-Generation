import Category from '../models/Category.js';
import AppError from '../models/errorModel.js';

export const createCategory = async (name) => {
  if (!name) {
    throw new AppError(400, 'Category name is required.');
  }

  const existing = await Category.findOne({ where: { name } });
  if (existing) {
    throw new AppError(400, 'Category name already exists.');
  }

  return Category.create({ name });
};

export const getAllCategories = async () => {
  return Category.findAll({ order: [['id', 'DESC']] });
};

export const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new AppError(404, 'Category not found.');
  }
  return category;
};

export const updateCategory = async (id, name) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new AppError(404, 'Category not found.');
  }

  if (!name) {
    throw new AppError(400, 'Category name is required.');
  }

  // Check for name conflict
  if (category.name !== name) {
    const conflict = await Category.findOne({ where: { name } });
    if (conflict) {
      throw new AppError(400, 'Category name already exists.');
    }
  }

  category.name = name;
  await category.save();
  return category;
};

export const deleteCategory = async (id) => {
  const deletedCount = await Category.destroy({ where: { id } });
  if (deletedCount === 0) {
    throw new AppError(404, 'Category not found.');
  }
  return deletedCount;
};