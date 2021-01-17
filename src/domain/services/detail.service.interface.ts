import { ResultDetailDto } from '../dtos/detail/result.detail.dto';

export interface IDetailService {
    findByInventory(inventoryId: string): Promise<ResultDetailDto[] | null>;
}