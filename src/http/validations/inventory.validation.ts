import { body, param } from 'express-validator';

export const updateValid = [
    body('id')
        .exists().withMessage('Required'),
    body('amount')
        .exists().withMessage('Required')
        .isNumeric(),
    body('minAmount')
        .exists().withMessage('Required')
        .isNumeric()
];

export const removeValid = [
    param('id')
        .exists().withMessage('Required')
];