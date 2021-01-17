import { ChangeAmountInventoryDto } from "../dtos/inventory/change.amount.inventory.dto";

export interface IInventoryService {
    changeAmount(data: ChangeAmountInventoryDto): Promise<boolean>;
}