'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    }).catch(() => {}); // ignore if already exists (use proper migrations in production)

    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    }).catch(() => {});

    // Ensure the FK column exists (if not already)
    await queryInterface.addColumn('Products', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }).catch(() => {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'price').catch(() => {});
    await queryInterface.removeColumn('Products', 'category').catch(() => {});
    await queryInterface.removeColumn('Products', 'categoryId').catch(() => {});
  }
};
