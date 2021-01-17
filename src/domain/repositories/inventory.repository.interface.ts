import { IInventoryModel } from "../../infra/models/inventory.model";

export interface IInventoryRepository {
    findByProduct(productId: string): Promise<IInventoryModel | null>;
    create(inventory: IInventoryModel): Promise<string | null>;
    changeAmount(inventory: IInventoryModel): Promise<boolean>;
    remove(inventory: IInventoryModel): Promise<boolean>;
}