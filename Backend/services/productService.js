import Product from '../models/productModel.js';
import AppError from '../models/errorModel.js';
import Category from '../models/Category.js'; 
import XLSX from 'xlsx';
import { Sequelize } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

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
  return Product.findAll({ order: [['id', 'DESC']] });
};

export const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new AppError(404, 'Product not found.');
  return product;
};

export const updateProduct = async (id, payload) => {
  const { name, price, categoryId } = payload;
  const product = await Product.findByPk(id);
  if (!product) throw new AppError(404, 'Product not found.');

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  if (categoryId !== undefined) {
    const cat = await Category.findByPk(categoryId);
    if (!cat) throw new AppError(400, 'Invalid categoryId.');
    product.categoryId = categoryId;
    product.category   = cat.name;       
  }

  await product.save();
  return product;
};

export const deleteProduct = async (id) => {
  const count = await Product.destroy({ where: { id } });
  if (count === 0) throw new AppError(404, 'Product not found.');
  return;
};

// bulk upload
const parseExcelBuffer = (buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false, range: 0 });
};

export const bulkCreateFromExcel = async (buffer) => {
  const rows = parseExcelBuffer(buffer);

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new AppError(400, 'Excel file contains no rows');
  }

  const results = {
    total: rows.length,
    successCount: 0,
    failedCount: 0,
    errors: [] // {row: i, reason: '...'}
  };

  const first = rows[0];
  const requiredKeys = ['name', 'categoryId', 'price'];
  const actualKeys = Object.keys(first).map(k => k.trim());
  const missing = requiredKeys.filter(k => !actualKeys.some(a => a.toLowerCase() === k.toLowerCase()));
  if (missing.length) {
    throw new AppError(400, `Missing required columns: ${missing.join(', ')}`);
  }

  const normalizeRow = (r) => {
    const nr = {};
    for (const key of Object.keys(r)) {
      nr[key.trim().toLowerCase()] = r[key];
    }
    return nr;
  };

  const validEntries = [];
  rows.forEach((rawRow, idx) => {
    const rowNum = idx + 2; // Excel header row
    const r = normalizeRow(rawRow);
    const name = r['name'] ? String(r['name']).trim() : null;
    const categoryId = r['categoryid'] !== null && r['categoryid'] !== undefined && r['categoryid'] !== '' ? Number(r['categoryid']) : null;
    const price = r['price'] !== null && r['price'] !== undefined && r['price'] !== '' ? Number(r['price']) : null;

    if (!name) {
      results.failedCount++;
      results.errors.push({ row: rowNum, reason: 'Missing name' });
      return;
    }
    if (categoryId == null || Number.isNaN(categoryId)) {
      results.failedCount++;
      results.errors.push({ row: rowNum, reason: 'Invalid or missing categoryId' });
      return;
    }
    if (price == null || Number.isNaN(price)) {
      results.failedCount++;
      results.errors.push({ row: rowNum, reason: 'Invalid or missing price' });
      return;
    }

    validEntries.push({ rowNum, name, categoryId, price });
  });

  if (validEntries.length === 0) {
    return results;
  }

  // Validate category existence
  const uniqueCategoryIds = [...new Set(validEntries.map(e => e.categoryId))];
  const categories = await Category.findAll({ where: { id: uniqueCategoryIds } });
  const foundCategoryIds = new Set(categories.map(c => c.id));
  const catMap = new Map(categories.map(c => [c.id, c.name]));

  // Filter out rows with invalid category and mark errors
  let filteredEntries = [];
  validEntries.forEach(e => {
    if (!foundCategoryIds.has(e.categoryId)) {
      results.failedCount++;
      results.errors.push({ row: e.rowNum, reason: `CategoryId ${e.categoryId} not found` });
    } else {
      filteredEntries.push(e);
    }
  });

  if (filteredEntries.length === 0) return results;

  // Check for duplicates: find all existing products with (name, categoryId) pairs in filteredEntries
  const duplicateCheckWhere = filteredEntries.map(({ name, categoryId }) => ({
    name,
    categoryId
  }));

  // Sequelize OR condition
  // If too many conditions, batch this query if necessary
  const duplicates = await Product.findAll({
    where: {
      [Sequelize.Op.or]: duplicateCheckWhere
    }
  });

  // Create a set for fast lookup of duplicate keys "name|categoryId"
  const duplicateSet = new Set(duplicates.map(p => `${p.name}|${p.categoryId}`));

  // Separate entries into duplicates and unique inserts
  const entriesToInsert = filteredEntries.filter(e => {
    if (duplicateSet.has(`${e.name}|${e.categoryId}`)) {
      results.failedCount++;
      results.errors.push({ row: e.rowNum, reason: `Duplicate product with name '${e.name}' for categoryId ${e.categoryId}` });
      return false; // skip duplicates
    }
    return true;
  });

  if (entriesToInsert.length === 0) {
    // all entries were duplicates or invalid
    return results;
  }

  // Bulk create in transaction
  const transaction = await sequelize.transaction();
  try {
    const created = await Product.bulkCreate(
      entriesToInsert.map(e => ({
        name: e.name,
        price: e.price,
        categoryId: e.categoryId,
        category: catMap.get(e.categoryId) || ''
      })),
      { transaction, returning: true }
    );
    await transaction.commit();
    results.successCount = created.length;
  } catch (err) {
    await transaction.rollback();
    throw new AppError(500, `Database insert failed: ${err.message}`);
  }

  results.failedCount = results.total - results.successCount;
  return results;
};