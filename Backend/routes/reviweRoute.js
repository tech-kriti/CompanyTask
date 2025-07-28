import express from 'express';
import { createReview, getReviewsByCompanyId } from '../controller/reviewController.js';

const router = express.Router();

router.post('/postreview', createReview);          
router.get('/:companyId', getReviewsByCompanyId);  

export default router;