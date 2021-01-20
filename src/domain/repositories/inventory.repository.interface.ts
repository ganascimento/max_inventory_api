import { IInventoryModel } from "../../infra/models/inventory.model";

export interface IInventoryRepository {
    findById(id: string): Promise<IInventoryModel | null>;
    findByProduct(productId: string): Promise<IInventoryModel | null>;
    create(inventory: IInventoryModel): Promise<string | null>;
    changeAmount(inventory: IInventoryModel): Promise<boolean>;
    changeMinAmount(inventory: IInventoryModel): Promise<boolean>;
    remove(inventory: IInventoryModel): Promise<boolean>;
}