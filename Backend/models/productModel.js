import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {  // Foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  tableName: 'Products',
  timestamps: true
});

export default Product;