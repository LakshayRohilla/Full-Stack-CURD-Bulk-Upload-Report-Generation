import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Categories',
  timestamps: true
});

export default Category;