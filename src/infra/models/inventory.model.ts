import { Document, Schema, model } from 'mongoose';

interface IInventoryBase {
    userId: string;
    productId: string;
    amount: number;
    minAmount: number;
}

export interface IInventoryModel extends Partial<IInventoryBase> {
    id?: string;
}

interface IInventoryDocument extends IInventoryBase, Document {}

const InventorySchema = new Schema<IInventoryDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    minAmount: {
        type: Number,
        required: true
    }
});

export default model('Inventory', InventorySchema);