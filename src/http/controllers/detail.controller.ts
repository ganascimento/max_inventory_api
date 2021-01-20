import { httpGet, BaseHttpController, interfaces, controller, request, response, queryParam } from "inversify-express-utils";
import { Request, Response } from 'express';
import { inject } from "inversify";
import TYPES from '../../shared/types';
import { IDetailService } from "../../domain/services/detail.service.interface";
import AuthenticationMiddleware from "../middlewares/authentication.handler";
import ResponseType from "../response/response.type";
import { findByInventoryValid } from '../validations/detail.validation';
import ValidErrorMiddleware from "../middlewares/validError.handler";

@controller('/detail')
export class DetailController extends BaseHttpController implements interfaces.Controller {
    @inject(TYPES.IDetailService) private _detailService: IDetailService;

    @httpGet('/', AuthenticationMiddleware, ...findByInventoryValid, ValidErrorMiddleware)
    public async findByInventory(@queryParam('inventoryId') inventoryId: string, @request() req: Request, @response() res: Response) {
        const result = await this._detailService.findByInventory(inventoryId);

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }
}