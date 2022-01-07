import { Router } from 'express';

import getProductByBarcode from '../controllers/getProductByBarcode.js';
import getQualityByDescription from '../controllers/getQualityByDescription.js';

const router = Router();

router.route('/:barcode')
  .get(getProductByBarcode);

router.route('/')
  .post(getQualityByDescription);

export default router;
