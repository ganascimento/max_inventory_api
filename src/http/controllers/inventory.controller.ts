import { httpPut, BaseHttpController, interfaces, controller, request, response } from "inversify-express-utils";
import { Request, Response } from 'express';
import { inject } from "inversify";
import TYPES from '../../shared/types';
import { IInventoryService } from "../../domain/services/inventory.service.interface";
import AuthenticationMiddleware from "../middlewares/authentication.handler";
import ValidErrorMiddleware from "../middlewares/validError.handler";
import { updateValid } from '../validations/inventory.validation';
import { ChangeAmountInventoryDto } from "../../domain/dtos/inventory/change.amount.inventory.dto";
import ResponseType from "../response/response.type";

@controller('/inventory')
export class InventoryController extends BaseHttpController implements interfaces.Controller {
    @inject(TYPES.IInventoryService) private _inventoryService: IInventoryService;

    @httpPut('/', AuthenticationMiddleware, ...updateValid, ValidErrorMiddleware)
    public async changeAmount(@request() req: Request<any, any, ChangeAmountInventoryDto>, @response() res: Response) {
        const result = await this._inventoryService.changeAmount({
            ...req.body,
            userId: req.userId
        });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }
}