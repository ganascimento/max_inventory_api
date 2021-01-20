import { body, query } from 'express-validator';

export const createValid = [
    body('name')
        .exists().withMessage('Required')
        .isLength({ min: 3, max: 50 }).withMessage('This field must contain between 3 and 50 characters'),
    body('value')
        .exists().withMessage('Required')
        .isNumeric(),
    body('identCode')
        .exists().withMessage('Required')
        .isLength({ min: 3, max: 50 }).withMessage('This field must contain between 3 and 50 characters'),
    body('unitType')
        .exists().withMessage('Required'),
    body('minAmount')
        .exists().withMessage('Required')
        .isNumeric()
];

export const updateValid = [
    body('id')
        .exists().withMessage('Required'),
    body('name')
        .exists().withMessage('Required')
        .isString()
        .isLength({ min: 3, max: 50 }).withMessage('This field must contain between 3 and 50 characters'),
    body('value')
        .exists().withMessage('Required')
        .isNumeric(),
    body('identCode')
        .exists().withMessage('Required')
        .isLength({ min: 3, max: 50 }).withMessage('This field must contain between 3 and 50 characters'),
    body('unitType')
        .exists().withMessage('Required')
];

export const removeValid = [
    query('id')
        .exists().withMessage('Required')
];