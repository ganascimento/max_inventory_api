import { injectable } from "inversify";
import mongoose from 'mongoose';
import { IInventoryRepository } from "../../domain/repositories/inventory.repository.interface";
import InventoryModel, { IInventoryModel } from '../models/inventory.model';

@injectable()
export class InventoryRepository implements IInventoryRepository {

    async findById(id: string): Promise<IInventoryModel | null> {
        try {
            const result = await InventoryModel.findOne()
                .where('_id').equals(id);

            if (result)
                return {
                    id: result.id,
                    amount: result.amount,
                    minAmount: result.minAmount,
                    productId: result.productId
                };
            
            return null;
        }
        catch (e) {
            return null;
        }
    }    

    async findByProduct(productId: string): Promise<IInventoryModel | null> {
        try {
            const result = await InventoryModel.findOne()
                .where('productId').equals(productId);

            if (result) {
                return {
                    id: result.id,
                    amount: result.amount,
                    minAmount: result.minAmount,
                    productId: result.productId
                };
            }
            
            return null;
        }
        catch (e) {
            return null;
        }
    }

    async create(inventory: IInventoryModel): Promise<string | null> {
        try {
            const result = await InventoryModel.create(inventory);

            if (result)
                return result.id;

            return null;
        }
        catch (e) {
            return null;
        }
    }
    
    async changeAmount(inventory: IInventoryModel): Promise<boolean> {
        try {
            await InventoryModel.updateOne({
                _id: new mongoose.mongo.ObjectId(inventory.id),
                userId: inventory.userId
            }, {
                $set: {
                    amount: inventory.amount
                }
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async changeMinAmount(inventory: IInventoryModel): Promise<boolean> {
        try {
            await InventoryModel.updateOne({
                productId: inventory.productId,
                userId: inventory.userId
            }, {
                $set: {
                    minAmount: inventory.minAmount
                }
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async remove(inventory: IInventoryModel): Promise<boolean> {
        try {
            await InventoryModel.deleteOne()
                .where('_id').equals(inventory.id)
                .where('userId').equals(inventory.userId);

            return true;
        }
        catch (e) {
            return false;
        }
    }

}