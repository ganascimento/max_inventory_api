import { injectable } from "inversify";
import { IDetailRepository } from "../../domain/repositories/detail.repository.interface";
import DetailModel, { IDetailModel } from "../models/detail.model";

@injectable()
export class DetailRepository implements IDetailRepository {

    async findByInventory(inventoryId: string): Promise<IDetailModel[] | null> {
        try {
            const result = await DetailModel.find()
                .where('inventoryId').equals(inventoryId);

            if (result)
                return result.map(item => {
                    return {
                        id: item.id,
                        date: item.date,
                        value: item.value,
                        inventoryId: item.inventoryId,
                        isAdd: item.isAdd
                    };
                });
            
            return null;
        }
        catch (e) {
            return null;
        }
    }

    async create(detail: IDetailModel): Promise<string | null> {
        try {
            const result = await DetailModel.create(detail);

            if (result.id)
                return result.id;
            
            return null;
        }
        catch (e) {
            return null;
        }
    }

    async removeByInventory(detail: IDetailModel): Promise<boolean> {
        try {
            await DetailModel.deleteMany()
                .where('inventoryId').equals(detail.inventoryId)
                .where('userId').equals(detail.userId);

            return true;
        }
        catch (e) {
            return false;
        }
    }

}