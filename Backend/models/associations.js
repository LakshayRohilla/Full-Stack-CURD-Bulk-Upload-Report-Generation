import Category from './Category.js';
import Product from './productModel.js';

export const setupAssociations = () => {
  Category.hasMany(Product, { foreignKey: 'categoryId' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });
};