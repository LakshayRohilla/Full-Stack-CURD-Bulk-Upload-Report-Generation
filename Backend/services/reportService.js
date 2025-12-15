import Product from '../models/productModel.js';
import Category from '../models/Category.js'; 
import sequelize from '../config/sequelizeConfig.js';
import { Op } from 'sequelize';
import { format as csvFormat } from '@fast-csv/format';
import ExcelJS from 'exceljs';

export async function queryProductsWithSummary(filters) {
  const { startDate, endDate, categoryId, sortField='id', sortDir='DESC' } = filters;
  const where = {};
  if (startDate) where.createdAt = { [Op.gte]: new Date(startDate) };
  if (endDate) where.createdAt = { ...(where.createdAt||{}), [Op.lte]: new Date(endDate) };
  if (categoryId) where.categoryId = Number(categoryId);

  // Products
  const products = await Product.findAll({
    where,
    include: [{ model: Category, attributes: ['id','name'] }],
    order: [[sortField, sortDir]],
  });

  // Category summary
  const categorySummary = await Category.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount']
    ],
    include: [{ model: Product, attributes: [] }],
    group: ['Category.id'],
    order: [['name','ASC']]
  });

  return {
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      categoryId: p.categoryId,
      categoryName: p.Category?.name || '',
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    })),
    categorySummary: categorySummary.map(c => ({
      id: c.id,
      name: c.name,
      productCount: Number(c.dataValues.productCount)
    }))
  };
}


export function buildCsvStream({ products, categorySummary }) {
  const csvStream = csvFormat({ headers: true });
  products.forEach(p => {
    csvStream.write({
      ID: p.id,
      Name: p.name,
      Price: p.price,
      CategoryId: p.categoryId,
      Category: p.categoryName,
      CreatedAt: p.createdAt.toISOString(),
      UpdatedAt: p.updatedAt.toISOString()
    });
  });
  // Extra blank line and summary header
  csvStream.write({});
  csvStream.write({ ID: 'Category Summary' });
  categorySummary.forEach(cs => {
    csvStream.write({ Name: cs.name, Price: `${cs.productCount} products` });
  });
  csvStream.end();
  return csvStream;
}

export async function buildXlsxWorkbook({ products, categorySummary }) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Products');
  sheet.columns = [
    { header:'ID', key:'id', width:10 },
    { header:'Name', key:'name', width:30 },
    { header:'Price', key:'price', width:12 },
    { header:'CategoryId', key:'categoryId', width:12 },
    { header:'Category', key:'categoryName', width:25 },
    { header:'CreatedAt', key:'createdAt', width:22 },
    { header:'UpdatedAt', key:'updatedAt', width:22 }
  ];
  products.forEach(p => sheet.addRow(p));

  const summarySheet = workbook.addWorksheet('Category Summary');
  summarySheet.columns = [
    { header:'Category', key:'name', width:30 },
    { header:'ProductCount', key:'productCount', width:15 }
  ];
  categorySummary.forEach(cs => summarySheet.addRow(cs));

  return workbook;
}