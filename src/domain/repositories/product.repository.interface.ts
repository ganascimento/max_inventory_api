import { IProductModel } from "../../infra/models/product.model";

export interface IProductRepository {
    findByUser(userId: string): Promise<IProductModel[] | null>;
    create(product: IProductModel): Promise<string | null>;
    update(product: IProductModel): Promise<boolean>;
    remove(product: IProductModel): Promise<boolean>;
}