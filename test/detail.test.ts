import 'jest';
import request from 'supertest';
import mongoose from 'mongoose';
import InventoryModel from '../src/infra/models/inventory.model';
import UserModel from '../src/infra/models/user.model';
import { initializeDb, closeDb } from './utils/db.ultil';

let address: string = (<any>global).address;
const auth: string = process.env.TOKEN_TEST || '';
let inventoryId: string;

beforeAll(async () => {
    await initializeDb();

    const user = await UserModel.findOne();
    const inventory = await InventoryModel.create({
        userId: user ? user.id : '',
        productId: new mongoose.mongo.ObjectId(),
        amount: 0,
        minAmount: 10
    });

    inventoryId = inventory.id;
});

afterAll(async () => {
    await closeDb();
});

test('find detail by inventory', async () => {
    return await request(address)
        .get(`/detail?inventoryId=${inventoryId}`)
        .set('Authorization', auth)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBeInstanceOf(Array);
        });
});