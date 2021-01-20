import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "../types";
import { IUserService } from '../../domain/services/user.service.interface';
import { UserService } from '../../services/user.service';
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { UserRepository } from "../../infra/repositories/user.repository";
import AuthenticationMiddleware from "../../http/middlewares/authentication.handler";
import ValidErrorMiddleware from "../../http/middlewares/validError.handler";
import { IDetailService } from "../../domain/services/detail.service.interface";
import { DetailService } from "../../services/detail.service";
import { IInventoryService } from "../../domain/services/inventory.service.interface";
import { InventoryService } from "../../services/inventory.service";
import { IProductService } from "../../domain/services/product.service.interface";
import { ProductService } from "../../services/product.service";
import { IDetailRepository } from "../../domain/repositories/detail.repository.interface";
import { DetailRepository } from "../../infra/repositories/detail.repository";
import { IInventoryRepository } from "../../domain/repositories/inventory.repository.interface";
import { InventoryRepository } from "../../infra/repositories/inventory.repository";
import { IProductRepository } from "../../domain/repositories/product.repository.interface";
import { ProductRepository } from "../../infra/repositories/product.repository";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IDetailService>(TYPES.IDetailService).to(DetailService);
container.bind<IInventoryService>(TYPES.IInventoryService).to(InventoryService);
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IDetailRepository>(TYPES.IDetailRepository).to(DetailRepository);
container.bind<IInventoryRepository>(TYPES.IInventoryRepository).to(InventoryRepository);
container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
container.bind<AuthenticationMiddleware>(AuthenticationMiddleware).toSelf();
container.bind<ValidErrorMiddleware>(ValidErrorMiddleware).toSelf();

export default container;
