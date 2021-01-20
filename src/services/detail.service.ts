import { injectable, inject } from "inversify";
import { ResultDetailDto } from "../domain/dtos/detail/result.detail.dto";
import { IDetailRepository } from "../domain/repositories/detail.repository.interface";
import { IDetailService } from "../domain/services/detail.service.interface";
import TYPES from "../shared/types";

@injectable()
export class DetailService implements IDetailService {
    @inject(TYPES.IDetailRepository) private _detailRepository: IDetailRepository;

    async findByInventory(inventoryId: string): Promise<ResultDetailDto[] | null> {
        const result = await this._detailRepository.findByInventory(inventoryId);

        if (result)
            return result.map(item => {
                return {
                    date: item.date as Date,
                    value: item.value as number,
                    inventoryId: item.inventoryId as string,
                    isAdd: item.isAdd as boolean
                };
            });
        
        return null;
    }

}