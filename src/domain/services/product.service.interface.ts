import { CreateProductDto } from "../dtos/product/create.product.dto";
import { ResultProductDto } from "../dtos/product/result.product.dto";
import { UpdateProductDto } from "../dtos/product/update.product.dto";

export interface IProductService {
    findByUser(): Promise<ResultProductDto>;
    create(product: CreateProductDto): Promise<string>;
    update(product: UpdateProductDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}