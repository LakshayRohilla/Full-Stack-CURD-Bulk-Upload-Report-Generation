import express from 'express';
import { dummyTask } from '../controllers/dummyContoller.js'

const router = express.Router();

router.route('/').get(dummyTask);

export default router;