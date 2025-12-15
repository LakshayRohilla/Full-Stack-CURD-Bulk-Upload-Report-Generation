import express from 'express';
import {
  generateProductReport,       
  downloadProductReport        
} from '../controllers/reportController.js'; 

const router = express.Router();


router.get('/products', generateProductReport);
router.get('/products/download', downloadProductReport);

export default router;