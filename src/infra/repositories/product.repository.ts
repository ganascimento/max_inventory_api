import { IProductRepository } from "../../domain/repositories/product.repository.interface";
import { IProductModel } from "../models/product.model";

export class ProductRepository implements IProductRepository {
    findByUser(userId: string): Promise<IProductModel | null> {
        throw new Error("Method not implemented.");
    }
    create(product: IProductModel): Promise<string> {
        throw new Error("Method not implemented.");
    }
    update(product: IProductModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}