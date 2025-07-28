import express from 'express';
import { createCompany , getAllCompanies} from '../controller/companyController.js';
import {upload} from '../middleware/uploads.js';
import { check } from 'express-validator';

const router = express.Router();
const companyValidationRules = [
  check('name').notEmpty().withMessage('Company name is required'),
  check('location').notEmpty().withMessage('Location is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('foundedOn')
    .notEmpty().withMessage('FoundedOn date is required')
    .isISO8601().withMessage('FoundedOn must be a valid date'),
  check('description').notEmpty().withMessage('Description is required')
];
router.post('/create', upload.single('logo'), companyValidationRules, createCompany);  // Route to create a new company
router.get('/getall',getAllCompanies);

export default router;