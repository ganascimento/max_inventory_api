import { CreateProductDto } from "../dtos/product/create.product.dto";
import { RemoveProductDto } from "../dtos/product/remove.product.dto";
import { ResultProductDto } from "../dtos/product/result.product.dto";
import { UpdateProductDto } from "../dtos/product/update.product.dto";

export interface IProductService {
    findByUser(userId: string): Promise<ResultProductDto[] | null>;
    create(product: CreateProductDto): Promise<string | null>;
    update(product: UpdateProductDto): Promise<boolean>;
    remove(product: RemoveProductDto): Promise<boolean>;
}