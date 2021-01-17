import { IDetailModel } from '../../infra/models/detail.model';

export interface IDetailRepository {
    findByInventory(inventoryId: string): Promise<IDetailModel[] | null>;
    create(detail: IDetailModel): Promise<string | null>;
    removeByInventory(detail: IDetailModel): Promise<boolean>;
}