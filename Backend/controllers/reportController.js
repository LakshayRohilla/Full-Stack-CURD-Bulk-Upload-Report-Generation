import { queryProductsWithSummary, buildCsvStream, buildXlsxWorkbook } from '../services/reportService.js';

export async function generateProductReport(req, res, next) {
  try {
    const data = await queryProductsWithSummary(req.query);
    res.json(data);
  } catch (err) { next(err); }
}

export async function downloadProductReport(req, res, next) {
  try {
    const { format='csv' } = req.query;
    const data = await queryProductsWithSummary(req.query);

    if (format === 'csv') {
      res.setHeader('Content-Type','text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="products_${Date.now()}.csv"`);
      const csvStream = buildCsvStream(data);
      csvStream.pipe(res);
      return;
    }

    if (format === 'xlsx') {
      const workbook = await buildXlsxWorkbook(data);
      res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="products_${Date.now()}.xlsx"`);
      await workbook.xlsx.write(res);
      res.end();
      return;
    }

    res.status(400).json({ message: 'Invalid format' });
  } catch (err) { next(err); }
}