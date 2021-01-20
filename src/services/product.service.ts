import { injectable, inject } from "inversify";
import { CreateProductDto } from "../domain/dtos/product/create.product.dto";
import { RemoveProductDto } from "../domain/dtos/product/remove.product.dto";
import { ResultProductDto } from "../domain/dtos/product/result.product.dto";
import { UpdateProductDto } from "../domain/dtos/product/update.product.dto";
import { IDetailRepository } from "../domain/repositories/detail.repository.interface";
import { IInventoryRepository } from "../domain/repositories/inventory.repository.interface";
import { IProductRepository } from "../domain/repositories/product.repository.interface";
import { IProductService } from "../domain/services/product.service.interface";
import TYPES from "../shared/types";

@injectable()
export class ProductService implements IProductService {
    @inject(TYPES.IProductRepository) private _productRepository: IProductRepository;
    @inject(TYPES.IInventoryRepository) private _inventoryRepository: IInventoryRepository;
    @inject(TYPES.IDetailRepository) private _detailRepository: IDetailRepository;

    async findByUser(userId: string): Promise<ResultProductDto[] | null> {
        const result = await this._productRepository.findByUser(userId);

        if (result) {
            const resultProductDto: ResultProductDto[] = [];

            result.forEach(async (item) => {
                const inventoryResult = await this._inventoryRepository.findByProduct(item.id as string);

                resultProductDto.push({
                    id: item.id as string,
                    brand: item.brand,
                    description: item.description,
                    identCode: item.identCode as string,
                    name: item.name as string,
                    unitType: item.unitType as string,
                    value: item.value as number,
                    amount: inventoryResult ? inventoryResult.amount as number : 0
                });
            });

            return resultProductDto;
        }            
        
        return null;
    }

    async create(product: CreateProductDto): Promise<string | null> {
        const { minAmount, ...productDto } = product;

        const result = await this._productRepository.create(productDto);

        if (result) {
            await this._inventoryRepository.create({
                amount: 0,
                minAmount,
                productId: result,
                userId: product.userId
            });
        }

        return result;
    }

    async update(product: UpdateProductDto): Promise<boolean> {
        const result = await this._productRepository.update(product);

        if (result && product.minAmount) {
            await this._inventoryRepository.changeMinAmount({
                productId: product.id,
                userId: product.userId,
                minAmount: product.minAmount
            });
        }

        return result;
    }

    async remove(product: RemoveProductDto): Promise<boolean> {
        const inventory = await this._inventoryRepository.findByProduct(product.id);
        const result = await this._productRepository.remove(product);

        if (result && inventory) {
            await this._inventoryRepository.remove({
                id: inventory.id,
                userId: product.userId
            });

            await this._detailRepository.removeByInventory({
                inventoryId: inventory.id,
                userId: product.userId
            });
        }

        return result;
    }

}