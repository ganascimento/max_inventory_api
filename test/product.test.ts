import 'jest';
import request from 'supertest';
import ProductModel from '../src/infra/models/product.model';
import UserModel from '../src/infra/models/user.model';
import { initializeDb, closeDb } from './utils/db.ultil';

let address: string = (<any>global).address;
const auth: string = process.env.TOKEN_TEST || '';
let productId: string;

beforeAll(async () => {
    await initializeDb();

    const user = await UserModel.findOne();
    const product = await ProductModel.create({
        userId: user ? user.id : '',
        name: 'Test',
        value: 10,
        identCode: '15974',
        description: 'Test',
        unitType: 'unit',
        brand: 'brand'
    });

    productId = product.id;
});

afterAll(async () => {
    await closeDb();
});

test('create product', async () => {
    return await request(address)
        .post('/product')
        .set('Authorization', auth)
        .send({
            name: "product test",
            value: 20.5,
            identCode: "1235",
            unitType: "unit",
            description: "Product test 01",
            brand: "Test",
            minAmount: 15
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
});

test('find all products by user', async () => {
    return await request(address)
        .get('/product')
        .set('Authorization', auth)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBeInstanceOf(Array);
        });
});

test('update product', async () => {
    return await request(address)
        .put('/product')
        .set('Authorization', auth)
        .send({
            id: productId,
            name: "product test update",
            value: 20.5,
            identCode: "1235",
            unitType: "unit",
            description: "Product test 02",
            brand: "Test",
            minAmount: 10
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBe(true);
        });
});

test('remove product', async () => {
    return await request(address)
        .delete(`/product?id=${productId}`)
        .set('Authorization', auth)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
});
