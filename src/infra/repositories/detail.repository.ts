import { IDetailRepository } from "../../domain/repositories/detail.repository.interface";
import DetailModel, { IDetailModel } from "../models/detail.model";

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
                        description: item.description,
                        inventoryId: item.inventoryId,
                        isAdd: item.isAdd
                    };
                });
            else
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
            else
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