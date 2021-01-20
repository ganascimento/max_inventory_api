import { injectable } from "inversify";
import mongoose from 'mongoose';
import { IProductRepository } from "../../domain/repositories/product.repository.interface";
import ProductModel, { IProductModel } from "../models/product.model";

@injectable()
export class ProductRepository implements IProductRepository {

    async findByUser(userId: string): Promise<IProductModel[] | null> {
        try {
            const result = await ProductModel.find()
                .where('userId').equals(userId);

            if (result)
                return result.map(item => {
                    var x: IProductModel = {
                        id: item.id,
                        brand: item.brand,
                        description: item.description,
                        identCode: item.identCode,
                        name: item.name,
                        unitType: item.unitType,
                        value: item.value
                    };

                    return x
                });
            
            return null;
        }
        catch (e) {
            return null;
        }
    }

    async create(product: IProductModel): Promise<string | null> {
        try {
            const result = await ProductModel.create(product);

            if (result)
                return result.id;
            
            return null;
        }
        catch (e) {
            return null;
        }
    }

    async update(product: IProductModel): Promise<boolean> {
        try {
            await ProductModel.updateOne({
                _id: new mongoose.mongo.ObjectId(product.id),
                userId: product.userId
            }, {
                $set: {
                    name: product.name,
                    value: product.value,
                    identCode: product.identCode,
                    description: product.description,
                    unitType: product.unitType,
                    brand: product.brand
                }
            });
            
            return true;
        }
        catch (e) {
            return false;
        }
    }

    async remove(product: IProductModel): Promise<boolean> {
        try {
            await ProductModel.deleteOne()
                .where('_id').equals(product.id)
                .where('userId').equals(product.userId)

            return true;
        }
        catch (e) {
            return false;
        }
    }

}