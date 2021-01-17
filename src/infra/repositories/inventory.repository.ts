import { ChangeAmountInventoryDto } from "../../domain/dtos/inventory/change.amount.inventory.dto";
import { IInventoryRepository } from "../../domain/repositories/inventory.repository.interface";
import InventoryModel, { IInventoryModel } from '../models/inventory.model';
import mongoose from 'mongoose';

export class InventoryRepository implements IInventoryRepository {

    async findByProduct(productId: string): Promise<IInventoryModel | null> {
        try {
            const result = await InventoryModel.findOne()
                .where('_id').equals(productId);

            if (result) {
                return {
                    id: result.id,
                    amount: result.amount,
                    minAmount: result.minAmount,
                    productId: result.productId
                };
            }
            else
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
            else
                return null;
        }
        catch (e) {
            return null;
        }
    }
    
    async changeAmount(data: ChangeAmountInventoryDto): Promise<boolean> {
        try {
            await InventoryModel.updateOne({
                _id: new mongoose.mongo.ObjectId(data.id)
            }, {
                $set: {
                    amount: data.value
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