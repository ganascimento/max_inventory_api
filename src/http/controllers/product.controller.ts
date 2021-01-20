import { httpGet, httpPost, httpPut, httpDelete, BaseHttpController, interfaces, controller, request, response, queryParam } from "inversify-express-utils";
import { Request, Response } from 'express';
import { inject } from "inversify";
import TYPES from '../../shared/types';
import { IProductService } from "../../domain/services/product.service.interface";
import ResponseType from "../response/response.type";
import AuthenticationMiddleware from "../middlewares/authentication.handler";
import ValidErrorMiddleware from "../middlewares/validError.handler";
import { createValid, updateValid, removeValid } from '../validations/product.validation';
import { CreateProductDto } from "../../domain/dtos/product/create.product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update.product.dto";
import { param } from "express-validator";

@controller('/product')
export class ProductController extends BaseHttpController implements interfaces.Controller {
    @inject(TYPES.IProductService) private _productService: IProductService;

    @httpGet('/', AuthenticationMiddleware)
    public async findByUser(@request() req: Request, @response() res: Response) {
        const result = await this._productService.findByUser(req.userId);

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }

    @httpPost('/', AuthenticationMiddleware, ...createValid, ValidErrorMiddleware)
    public async create(@request() req: Request<any, any, CreateProductDto>, @response() res: Response) {
        const result = await this._productService.create({
            ...req.body,
            userId: req.userId
        });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }

    @httpPut('/', AuthenticationMiddleware, ...updateValid, ValidErrorMiddleware)
    public async update(@request() req: Request<any, any, UpdateProductDto>, @response() res: Response) {
        const result = await this._productService.update({
            ...req.body,
            userId: req.userId
        });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }

    @httpDelete('/', AuthenticationMiddleware, ...removeValid, ValidErrorMiddleware)
    public async remove(@queryParam('id') id: string, @request() req: Request, @response() res: Response) {
        const result = await this._productService.remove({
            id: id,
            userId: req.userId
        });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }
}