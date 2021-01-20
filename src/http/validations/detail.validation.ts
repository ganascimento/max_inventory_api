import { query } from 'express-validator';

export const findByInventoryValid = [
    query('inventoryId')
        .exists().withMessage('Required')
];