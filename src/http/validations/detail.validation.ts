import { param } from 'express-validator';

export const findByInventoryValid = [
    param('inventoryId')
        .exists().withMessage('Required')
];