import Product from '../models/productModel.js';
import AppError from '../models/errorModel.js';
import Category from '../models/Category.js'; // If you want to validate categoryId exists

export const createProduct = async (name, price, categoryId) => {
  if (!name) throw new AppError(400, 'Product name is required.');
  if (price == null) throw new AppError(400, 'Price is required.');
  if (categoryId == null) throw new AppError(400, 'CategoryId is required.');

  const category = await Category.findByPk(categoryId);
  if (!category) throw new AppError(400, 'Invalid categoryId.');

  const product = await Product.create({ name, price, category: category.name || '', categoryId });
  return product;
};

export const getAllProducts = async () => {
  return Product.findAll({ order: [['id', 'ASC']] });
};

export const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new AppError(404, 'Product not found.');
  return product;
};

export const updateProduct = async (id, payload) => {
  const { name, price, categoryId, category } = payload;
  const product = await Product.findByPk(id);
  if (!product) throw new AppError(404, 'Product not found.');

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (categoryId !== undefined) {
    const cat = await Category.findByPk(categoryId);
    if (!cat) throw new AppError(400, 'Invalid categoryId.');
    product.categoryId = categoryId;
  }
  if (category !== undefined) product.category = category;

  await product.save();
  return product;
};

export const deleteProduct = async (id) => {
  const count = await Product.destroy({ where: { id } });
  if (count === 0) throw new AppError(404, 'Product not found.');
  return;
};