import { injectable, inject } from "inversify";
import { ChangeAmountInventoryDto } from "../domain/dtos/inventory/change.amount.inventory.dto";
import { IDetailRepository } from "../domain/repositories/detail.repository.interface";
import { IInventoryRepository } from "../domain/repositories/inventory.repository.interface";
import { IInventoryService } from "../domain/services/inventory.service.interface";
import TYPES from "../shared/types";

@injectable()
export class InventoryService implements IInventoryService {
    @inject(TYPES.IInventoryRepository) private _inventoryRepository: IInventoryRepository;
    @inject(TYPES.IDetailRepository) private _detailRepository: IDetailRepository;

    async changeAmount(data: ChangeAmountInventoryDto): Promise<boolean> {
        const inventory = await this._inventoryRepository.findById(data.id);
        const result = await this._inventoryRepository.changeAmount({
            id: data.id,
            amount: data.value
        });

        if (result && inventory && inventory.amount) {
            const isAdd: boolean = data.value > inventory.amount;
            const value: number = Math.abs(data.value - inventory.amount);

            await this._detailRepository.create({
                inventoryId: data.id,
                userId: data.userId,
                isAdd,
                value,
                date: new Date()
            });
        }

        return result;
    }

}