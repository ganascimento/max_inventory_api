import { body, param } from 'express-validator';

export const updateValid = [
    body('id')
        .exists().withMessage('Required'),
    body('value')
        .exists().withMessage('Required')
        .isNumeric()
];