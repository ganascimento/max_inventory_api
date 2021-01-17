import { IProductModel } from "../../infra/models/product.model";

export interface IProductRepository {
    findByUser(userId: string): Promise<IProductModel | null>;
    create(product: IProductModel): Promise<string>;
    update(product: IProductModel): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}