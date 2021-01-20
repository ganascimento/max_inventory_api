import { Document, Schema, model } from 'mongoose';

interface IDetailBase {
    userId: string;
    inventoryId: string;
    value: number;
    date: Date;
    isAdd: boolean;
}

export interface IDetailModel extends Partial<IDetailBase> {
    id?: string;
}

interface IDetailDocument extends IDetailBase, Document {}

const DetailSchema = new Schema<IDetailDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inventoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isAdd: {
        type: Boolean,
        required: true
    }
});

export default model('Detail', DetailSchema)